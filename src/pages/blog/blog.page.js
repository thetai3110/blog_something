import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/pagination/pagination.component";
import { setCountBlogs, setLstBlogs } from "../../redux/blog/blog_actions";
import "./blog.page.css";
import placeholder_img from '../../assests/placeholder_img.png'
import app from "../../firebase";
import Loading from "../../components/loading/loading";
import $ from 'jquery';
import { themes } from "../../themes/themes";
import { useState } from "react";

const BlogPage = ({ lstBlogs, countBlogs, setLstBlogs, setCountBlogs, match, theme }) => {
    const TAG = "BlogComponent";
    const [loading, setLoading] = useState(true);
    const currentPage = typeof match.params.page === 'undefined' ? 1 : match.params.page;
    const imgRef = useRef(null);
    useEffect(() => {
        $('.navbar-checked').prop('checked', false);
        $('.navbar-overlap').prop('checked', false);
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
    if (loading) {
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
                                    <h4><Link style={themes[theme].item_title} to={`/blog/detail/${blog.id}`}>{blog.value.title}</Link></h4>
                                    <p style={themes[theme].item_info}>{blog.value.summary}</p>
                                    <p style={themes[theme].item_info}>Tác giả: {blog.value.author.email}</p>
                                </div>
                            </div>);
                    }) :
                    <div>Không tìm thấy bất kỳ bài viết nào</div>
                }
                <Pagination {...{ total: countBlogs % 3 === 0 ? parseInt(countBlogs / 3) : parseInt(countBlogs / 3) + 1, link: '/blogs', currentPage: currentPage }} />
            </div>
        )
}

const mapStateToProps = ({ blog }) => ({
    lstBlogs: blog.lstBlogs,
    countBlogs: blog.countBlogs
})

const mapDispatchToProps = dispatch => ({
    setLstBlogs: blogs => dispatch(setLstBlogs(blogs)),
    setCountBlogs: count => dispatch(setCountBlogs(count))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);