import { useEffect, useRef } from "react"
import { BlogService } from "../../../services/blog.service";
import './blog_detail.css';
import 'emoji-mart/css/emoji-mart.css';
import app from "../../../firebase";
import Comments from '../../../components/comment/comment.component';
import { connect } from "react-redux";
import { setTagsBlog } from "../../../redux/blog/blog_actions";
import { setLstComments } from '../../../redux/comment/comment.actions';
const BlogDetailPage = ({ tagsBlog, setTagsBlog, lstComments, setLstComments, match }) => {
    const TAG = "BlogDetail";
    const ref = useRef(null);
    useEffect(() => {
        const db = app.database().ref('Comments').limitToFirst(5)
        db.on('value', (snap) => {
            setLstComments(snap.val());
        });
        findBlogDetail();
    }, [])
    const findBlogDetail = async () => {
        try {
            const res = await BlogService.findById(match.params.id);
            const rs = await res.json();
            if (rs.result === "ok") {
                setTagsBlog(rs.data.tags);
                let content = rs.data.content;
                ref.current.innerHTML = content;
            }
            else console.log(TAG + ': ' + rs.message);
        } catch (error) {
            console.log(TAG + ': ' + error);
        }
    }
    return (
        <div className="blog-detail-page">
            <div className="ck-content">
                <div ref={ref}></div>
            </div>
            <ul className="blog-tags-list">
                {tagsBlog.map((el, i) => {
                    return <li key={i}>{el}</li>
                })}
            </ul>
            <Comments typeComment={true} id={match.params.id} />
            <div className="list-comments">
                {Object.keys(lstComments).map((el, i) => {
                    return <div key={i} className="cmt">
                        <div className="comments-user">
                            <img src={lstComments[el].avatar} alt={lstComments[el].avatar}></img>
                            <div className="comments-content">
                                <h6>{lstComments[el].user}</h6>
                                <p>{lstComments[el].content}</p>
                                <div className="comments-action">
                                    <span className="action">Thích</span>
                                    <label className="action" htmlFor={el}>Phản hồi</label>
                                    <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                </div>
                            </div>
                        </div>
                        <div className="cmt-feedback">
                            {
                                typeof lstComments[el].feedback !== 'undefined' ?
                                    Object.keys(lstComments[el].feedback).map((elm, i) => {
                                        return <div key={i} className="cmt">
                                            <div className="comments-user">
                                                <img src={lstComments[el].feedback[elm].avatar} alt={lstComments[el].feedback[elm].avatar}></img>
                                                <div className="comments-content">
                                                    <h6>{lstComments[el].feedback[elm].user}</h6>
                                                    <p>{lstComments[el].feedback[elm].content}</p>
                                                    <div className="comments-action">
                                                        <span className="action">Thích</span>
                                                        <label className="action" htmlFor={el}>Phản hồi</label>
                                                        <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }) : <div></div>
                            }
                        </div>
                        <input type="checkbox" name="feedback" className="feedbackCK" id={el}></input>
                        <div className="feedback">
                            <Comments typeComment={false} keyComment={el} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog, comment }) => ({
    tagsBlog: blog.tagsBlog,
    lstComments: comment.lstComments
})

const mapDispatchToProps = dispatch => ({
    setTagsBlog: tags => dispatch(setTagsBlog(tags)),
    setLstComments: comments => dispatch(setLstComments(comments))
})
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailPage);