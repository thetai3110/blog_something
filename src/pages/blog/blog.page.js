import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/pagination/pagination.component";
import { setCountBlogs, setLstBlogs } from "../../redux/blog/blog_actions";
import "./blog.page.css";
import placeholder_img from '../../assests/placeholder_img.png'
import app from "../../firebase";
import { setLoading } from "../../redux/common/common.actions";
import Loading from "../../components/loading/loading";

const BlogPage = ({ lstBlogs, countBlogs, setLstBlogs, setCountBlogs, match, isLoading, setLoading }) => {
    const TAG = "BlogComponent";
    const currentPage = typeof match.params.page === 'undefined' ? 1 : match.params.page;
    const imgRef = useRef(null);
    useEffect(() => {
        setLoading(true);
        (async function () {
            try {
                setLstBlogs([]);
                setCountBlogs(0);
                const db = app.database().ref('Blogs');
                db.on('value', (snap) => {
                    if (snap.val() !== null) {
                        let rs = Object.keys(snap.val()).map(val => {
                            return { id: val, value: snap.val()[val] }
                        })
                        let lst = rs.filter(el => { return el.value.published === 1 })
                        setCountBlogs(lst.length);
                        setLstBlogs(lst.slice((currentPage - 1) * 3, (currentPage - 1) * 3 + 3));
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.log(TAG + ': ' + error);
            }
        })()
    }, [match])
    if (isLoading) {
        return <Loading></Loading>
    } else
        return (
            <div className="blog-page">
                {lstBlogs.length > 0 ?
                    lstBlogs.map(blog => {
                        return (
                            <div className="row blog-list" key={blog.id}>
                                <div className="col l-2 md-3 c-12 blog-img">
                                    <Link to={`/blog/detail/${blog.id}`}><img ref={imgRef} onError={(e) => e.target.src = placeholder_img} src={blog.value.image} alt=""></img></Link>
                                </div>
                                <div className="col l-10 md-9 c-12 blog-content">
                                    <h4><Link to={`/blog/detail/${blog.id}`}>{blog.value.title}</Link></h4>
                                    <p>{blog.value.summary}</p>
                                    <p>Tác giả: {blog.value.author.email}</p>
                                </div>
                            </div>);
                    }) :
                    <div>Không tìm thấy bất kỳ bài viết nào</div>
                }
                <Pagination {...{ total: countBlogs % 3 === 0 ? parseInt(countBlogs / 3) : parseInt(countBlogs / 3) + 1, link: '/blogs', currentPage: currentPage }} />
            </div>
        )
}

const mapStateToProps = ({ blog, common }) => ({
    lstBlogs: blog.lstBlogs,
    countBlogs: blog.countBlogs,
    isLoading: common.isLoading
})

const mapDispatchToProps = dispatch => ({
    setLstBlogs: blogs => dispatch(setLstBlogs(blogs)),
    setCountBlogs: count => dispatch(setCountBlogs(count)),
    setLoading: (isLoading) => dispatch(setLoading(isLoading))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);