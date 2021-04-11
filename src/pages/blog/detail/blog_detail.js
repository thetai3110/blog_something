import { useEffect, useRef } from "react"
import './blog_detail.css';
import 'emoji-mart/css/emoji-mart.css';
import { connect } from "react-redux";
import { setTagsBlog } from "../../../redux/blog/blog_actions";
import { setLstComments } from '../../../redux/comment/comment.actions';
import LstComments from "../components/lst-comments/lst-comment.component";
import app from "../../../firebase";
import { setLoading } from "../../../redux/common/common.actions";
import ComposerEditText from "../components/composer-edittext/composer-edittext.component";
import Loading from "../../../components/loading/loading";
const BlogDetailPage = ({ tagsBlog, setTagsBlog, match, isLoading, setLoading }) => {
    const TAG = "BlogDetail";
    const ref = useRef();
    useEffect(() => {
        setTagsBlog([]);
        setLoading(true);
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
    if (isLoading) {
        return <Loading></Loading>
    } else
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
                <ComposerEditText typeComment={true} idBlog={match.params.id} showWithId="default" />
                <LstComments idBlog={match.params.id} />
            </div>
        )
}

const mapStateToProps = ({ blog, comment, common }) => ({
    tagsBlog: blog.tagsBlog,
    lstComments: comment.lstComments,
    isLoading: common.isLoading
})

const mapDispatchToProps = dispatch => ({
    setTagsBlog: tags => dispatch(setTagsBlog(tags)),
    setLstComments: comments => dispatch(setLstComments(comments)),
    setLoading: (isLoading) => dispatch(setLoading(isLoading))
})
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailPage);