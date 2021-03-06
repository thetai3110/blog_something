import { useEffect, useRef, useState } from "react"
import { BlogService } from "../../../services/blog.service";
import './blog_detail.css';
import 'emoji-mart/css/emoji-mart.css';
import app from "../../../firebase";
import Comments from '../../../components/comment/comment.component';

const BlogDetailPage = (props) => {
    const TAG = "BlogDetail";
    const ref = useRef(null);
    const [tagsFound, setTagsFound] = useState([]);
    const [comments, setComments] = useState([])
    useEffect(() => {
        const db = app.database().ref('Comments');
        db.on('value', (snap) => {
            setComments(snap.val());
        });
        findBlogDetail();
    }, [])
    const findBlogDetail = async () => {
        try {
            const res = await BlogService.findById(props.match.params.id);
            const rs = await res.json();
            if (rs.result === "ok") {
                setTagsFound(rs.data.tags);
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
                {tagsFound.map((el, i) => {
                    return <li key={i}>{el}</li>
                })}
            </ul>
            <Comments typeComment={true} id={props.match.params.id} />
            <div className="list-comments">
                {Object.keys(comments).map((el, i) => {
                    return <div key={i} className="cmt">
                        <div className="comments-user">
                            <img src={comments[el].avatar} alt={comments[el].avatar}></img>
                            <div className="comments-content">
                                <h6>{comments[el].user}</h6>
                                <p>{comments[el].content}</p>
                                <div className="comments-action">
                                    <span className="action">Thích</span>
                                    <label className="action" htmlFor={el}>Phản hồi</label>
                                    <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                </div>
                            </div>
                        </div>
                        <div className="cmt-feedback">
                            {
                                typeof comments[el].feedback !== 'undefined' ?
                                    Object.keys(comments[el].feedback).map((elm, i) => {
                                        return <div key={i} className="cmt">
                                            <div className="comments-user">
                                                <img src={comments[el].feedback[elm].avatar} alt={comments[el].feedback[elm].avatar}></img>
                                                <div className="comments-content">
                                                    <h6>{comments[el].feedback[elm].user}</h6>
                                                    <p>{comments[el].feedback[elm].content}</p>
                                                    <div className="comments-action">
                                                        <span className="action">Thích</span>
                                                        <label className="action" htmlFor={el}>Phản hồi</label>
                                                        <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <input type="checkbox" name="feedback" className="feedbackCK" id={elm}></input>
                                            <div className="feedback">
                                                <Comments typeComment={false} keyComment={el} />
                                            </div> */}
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

export default BlogDetailPage;