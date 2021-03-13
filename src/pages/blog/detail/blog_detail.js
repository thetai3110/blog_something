import { useEffect, useRef } from "react"
import { BlogService } from "../../../services/blog.service";
import './blog_detail.css';
import 'emoji-mart/css/emoji-mart.css';
import Comments from '../../../components/comment/comment.component';
import { connect } from "react-redux";
import { setTagsBlog } from "../../../redux/blog/blog_actions";
import { setLstComments } from '../../../redux/comment/comment.actions';
import LstComments from "../components/lst-comments/lst-comment.component";
const BlogDetailPage = ({ tagsBlog, setTagsBlog, setLstComments, match }) => {
    const TAG = "BlogDetail";
    const ref = useRef(null);
    useEffect(() => {
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
            <LstComments />
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