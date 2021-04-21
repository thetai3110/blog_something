import { useEffect, useRef, useState } from "react"
import './blog-detail.page.css';
import 'emoji-mart/css/emoji-mart.css';
import { connect } from "react-redux";
import { setTagsBlog } from "../../../redux/blog/blog_actions";
import { setLstComments } from '../../../redux/comment/comment.actions';
import LstComments from "../components/lst-comments/lst-comment.component";
import app from "../../../firebase";
import ComposerEditText from "../components/composer-edittext/composer-edittext.component";
import Loading from "../../../components/loading/loading";
const BlogDetailPage = ({ tagsBlog, setTagsBlog, match }) => {
    const TAG = "BlogDetail";
    const [loading, setLoading] = useState(true);
    const ref = useRef();
    useEffect(() => {
        setTagsBlog([]);
        (async function () {
            try {
                const db = app.database().ref(`Blogs/${match.params.id}`);
                db.on('value', (snap) => {
                    if (snap.val() !== null) {
                        setTagsBlog(snap.val().tags);
                        if (ref.current !== null) {
                            setLoading(false);
                            ref.current.innerHTML = snap.val().content;
                        }
                    }
                });
            } catch (error) {
                console.log(TAG + ': ' + error);
            }
        }())
    }, [])
    if (loading) {
        return <Loading></Loading>
    } else
        return (
            <div className="blog-detail-page">
                <div className="ck-content">
                    <div ref={ref}></div>
                </div>
                <ul className="blog-tags-list">
                    {tagsBlog ? tagsBlog.map((el, i) => {
                        return <li key={i}>{el}</li>
                    }) : null}
                </ul>
                <ComposerEditText typeComment={true} idBlog={match.params.id} showWithId="default" />
                <LstComments idBlog={match.params.id} />
            </div>
        )
}

const mapStateToProps = ({ blog, comment }) => ({
    tagsBlog: blog.tagsBlog,
    lstComments: comment.lstComments,
})

const mapDispatchToProps = dispatch => ({
    setTagsBlog: tags => dispatch(setTagsBlog(tags)),
    setLstComments: comments => dispatch(setLstComments(comments))
})
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailPage);