import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/pagination/pagination.component";
import { setCountBlogs, setLstBlogs } from "../../redux/blog/blog_actions";
import { BlogService } from "../../services/blog.service";
import "./blog_page.css";
import placeholder_img from '../../assests/placeholder_img.png'

const BlogPage = ({ lstBlogs, countBlogs, setLstBlogs, setCountBlogs, match }) => {
    const TAG = "BlogComponent";
    const currentPage = typeof match.params.page === 'undefined' ? 1 : match.params.page;
    const imgRef = useRef(null);
    useEffect(() => {
        getTotal();
        getBlogsFound();
    }, [match])
    // Fetch blog by page
    const getBlogsFound = async () => {
        try {
            let res = await BlogService.findByPage(currentPage);
            let rs = await res.json();
            if (rs.result === "ok") setLstBlogs(rs.data);
            else console.log(TAG + ': ' + rs.message);
        } catch (error) {
            console.log(TAG + ': ' + error);
        }
    }
    // Get total item
    const getTotal = async () => {
        try {
            const res = await BlogService.total();
            const rs = await res.json();
            if (rs.result === "ok") {
                setCountBlogs(rs.data);
            }
            else console.log(TAG + ': ' + rs.message);
        } catch (error) {
            console.log(TAG + ': ' + error);
        }
    }

    return (
        <div className="blog-page">
            {lstBlogs.length > 0 ?
                lstBlogs.map(blog => {
                    return (
                        <div className="row blog-list" key={blog._id}>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 col-12 blog-img">
                                <Link to={`/blog/detail/${blog._id}`}><img ref={imgRef} onError={(e) => e.target.src = placeholder_img} src={blog.image} alt=""></img></Link>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-xs-12 col-12 blog-content">
                                <h4><Link to={`/blog/detail/${blog._id}`}>{blog.title}</Link></h4>
                                <p>{blog.summary}</p>
                                <p>Tác giả: {blog.author.email}</p>
                            </div>
                        </div>);
                }) :
                <div>Không tìm thấy bất kỳ bài viết nào</div>
            }
            <Pagination {...{ total: countBlogs % 3 === 0 ? parseInt(countBlogs / 3) : parseInt(countBlogs / 3) + 1, link: '/blog', currentPage: currentPage }} />
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