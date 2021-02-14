import { useEffect, useRef, useState } from "react"
import { pageLayoutDefault } from "../../../components/higer_order/page-layout-default";
import { BlogService } from "../../../services/blog.service";
import './blog_detail.css';

const BlogDetail = (props) => {
    const ref = useRef(null);
    const [tagsFound, setTagsFound] = useState([]);
    useEffect(() => {
        (async function () {
            let rs = await BlogService.findById(props.match.params.id);
            if (typeof rs.msg === 'undefined') {
                if (rs.result === 'ok') {
                    setTagsFound(rs.data.tags);
                    let content = rs.data.content;
                    ref.current.insertAdjacentHTML('beforeend', content);
                }
                else console.log(rs.message);
            } else {
                console.log(rs.msg);
            }
        })();
    }, [])
    return (
        <div className="blog-detail-page ck-content">
            <div ref={ref}></div>
            <ul className="blog-tags-list">
                {tagsFound.map(tag => {
                    return <li key={tag._id}>{tag.tagName}</li>
                })}
            </ul>
        </div>
    )
}
const BlogDetailPage = pageLayoutDefault(BlogDetail);
export default BlogDetailPage;