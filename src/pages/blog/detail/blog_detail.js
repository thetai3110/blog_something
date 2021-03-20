import { useEffect, useRef } from "react"
import { BlogService } from "../../../services/blog.service";
import './blog_detail.css';
import 'emoji-mart/css/emoji-mart.css';
import Comments from '../../../components/comment/comment.component';
import { connect } from "react-redux";
import { setTagsBlog } from "../../../redux/blog/blog_actions";
import { setLstComments } from '../../../redux/comment/comment.actions';
import LstComments from "../components/lst-comments/lst-comment.component";
import app from "../../../firebase";
const BlogDetailPage = ({ tagsBlog, setTagsBlog, match }) => {
    const TAG = "BlogDetail";
    const ref = useRef(null);
    useEffect(() => {
        (async function () {
            try {
                const db = app.database().ref(`Blogs/${match.params.id}`);
                db.on('value', (snap) => {
                    if (snap.val() !== null) {
                        setTagsBlog(snap.val().tags);
                        ref.current.innerHTML = snap.val().content;
                    }
                });
            } catch (error) {
                console.log(TAG + ': ' + error);
            }
        }())
    }, [])
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
            <LstComments idBlog={match.params.id}/>
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