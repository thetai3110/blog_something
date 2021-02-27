import { useEffect, useRef, useState } from "react"
import { pageLayoutDefault } from "../../../components/higer_order/page-layout-default";
import { BlogService } from "../../../services/blog.service";
import './blog_detail.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import avatar from '../../../assests/avatar.jpg';

const BlogDetailPage = (props) => {
    const TAG = "BlogDetail";
    const ref = useRef(null);
    const emojiRef = useRef(null);
    const [tagsFound, setTagsFound] = useState([]);
    useEffect(() => {
        (async function () {
            try {
                const res = await BlogService.findById(props.match.params.id);
                const rs = await res.json();
                if (rs.result === "ok") {
                    setTagsFound(rs.data.tags);
                    let content = rs.data.content;
                    ref.current.innerHTML = content;
                }
                else console.log(TAG + ': ' + rs.message);
            } catch (error) {
                console.log(TAG + ': ' + error);
            }
        })();
    }, [])
    const handleShowEmoji = () => {
        let status = emojiRef.current.style.display === 'none' ? false : true;
        if (status) emojiRef.current.style.display = 'none'
        else emojiRef.current.style.display = 'block'
    }
    return (
        <div className="blog-detail-page">
            <div className="ck-content">
                <div ref={ref}></div>
            </div>
            <ul className="blog-tags-list">
                {tagsFound.map((el, i) => {
                    return <li key={i}>{el}</li>
                })}
            </ul>
            <div className="comment">
                <div className="comment-avatar">
                    <img src={avatar} alt=""></img>
                </div>
                <div className="comment-type">
                    <textarea id="comment-input" name="nowrap" cols="30" rows="5" wrap="soft"></textarea>
                    <div className="comment-option">
                        <span onClick={handleShowEmoji}><i className="fa fa-smile-o" aria-hidden="true"></i></span>
                    </div>
                    <div className="emoji-picker" ref={emojiRef}>
                        <Picker />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetailPage;