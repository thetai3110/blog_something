import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pageLayoutDefault } from "../../components/higer_order/page-layout-default";
import { BlogService } from "../../services/blog.service";
import "./blog_page.css";

const BlogComponent = () => {
    const [blogsFound, setBlogsFound] = useState([]);
    const TAG = "BlogComponent";
    useEffect(() => {
        (async function () {
            let rs = await BlogService.findByPublished(true);
            if (typeof rs.msg === "undefined") {
                if (rs.result === "ok") setBlogsFound(rs.data);
                else console.log(TAG + ': ' + rs.message);
            } else {
                console.log(TAG + ': ' + rs.msg);
            }
        })();
    }, [])
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
        </div>
    )
}

const BlogPage = pageLayoutDefault(BlogComponent);
export default BlogPage;