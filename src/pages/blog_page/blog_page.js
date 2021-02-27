import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pageLayoutDefault } from "../../components/higer_order/page-layout-default";
import { Pagination } from "../../components/shared/pagination_component/pagination.component";
import { BlogService } from "../../services/blog.service";
import "./blog_page.css";

const BlogPage = (props) => {
    const TAG = "BlogComponent";
    const [blogsFound, setBlogsFound] = useState([]);
    const [total, setTotal] = useState(0);
    const currentPage = typeof props.match.params.page === 'undefined' ? 1 : props.match.params.page;
    useEffect(() => {
        getTotal();
        getBlogsFound();
    }, [props])
    // Fetch blog by page
    const getBlogsFound = async () => {
        try {
            let res = await BlogService.findByPage(currentPage);
            let rs = await res.json();
            if (rs.result === "ok") setBlogsFound(rs.data);
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
            if (rs.result === "ok") setTotal(rs.data);
            else console.log(TAG + ': ' + rs.message);
        } catch (error) {
            console.log(TAG + ': ' + error);
        }
    }
    return (
        <div className="blog-page">
            {blogsFound.length > 0 ?
                blogsFound.map(blog => {
                    return (
                        <div className="row blog-list" key={blog._id}>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 col-12 blog-img">
                                <Link to={`/blog/detail/${blog._id}`}><img src={blog.image} alt=""></img></Link>
                            </div>
                            <div className="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-xs-12 col-12 blog-content">
                                <h4><Link to={`/blog/detail/${blog._id}`}>{blog.title}</Link></h4>
                                <p>{blog.summary}</p>
                                <p>Tác giả: {blog.author.email}</p>
                            </div>
                        </div>);
                }) :
                <div>Không tìm thấy bất kỳ bài viết nào {blogsFound.length + ""}</div>
            }
            <Pagination {...{ total: total % 3 === 0 ? parseInt(total / 3) : parseInt(total / 3) + 1, link: '/blog', currentPage: currentPage }} />
        </div>
    )
}

export default BlogPage;