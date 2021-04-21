import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from '../../../../components/toast/toast.component';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';
import './tags-input.component.css';

const TagsInput = ({ blogInfo, setBlogInfo, location }) => {
    const inputRef = useRef(null);
    const tagsRef = useRef(null);
    useEffect(() => {
        if (blogInfo.tags && location.pathname !== '/blog/create') {
            blogInfo.tags.forEach(el => {
                let item = document.createElement('span');
                item.innerHTML = `${el} <i class="fa fa-close close-tag"></i>`;
                tagsRef.current.appendChild(item);
                inputRef.current.value = '';
            });
        }
    }, [])
    // Tags
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            let val = event.target.value;
            if (val !== '' && !blogInfo.tags.includes(val)) {
                if (blogInfo.tags.length < 5) {
                    let currentTags = blogInfo.tags;
                    let item = document.createElement('span');
                    item.innerHTML = `${val} <i class="fa fa-close close-tag"></i>`;
                    tagsRef.current.appendChild(item);
                    inputRef.current.value = '';

                    currentTags.push(val);
                    setBlogInfo({ ...blogInfo, tag: currentTags });
                } else {
                    toast({ title: "Warning!", message: 'Cannot create too 5 tags', type: "warning", duration: 3000 });
                }
            }
        }
        if (event.keyCode === 8 || event.keyCode === 46) {
            let val = event.target.value;
            if (val === '' && tagsRef.current.children.length > 0) {
                tagsRef.current.removeChild(tagsRef.current.children[tagsRef.current.children.length - 1]);
                let currentTags = blogInfo.tags;
                currentTags.pop();
                setBlogInfo({ ...blogInfo, tag: currentTags });
            }
        }
    }
    const handleRemoveTag = (event) => {
        if (event.target.closest('.close-tag')) {
            const val = event.target.closest('span').innerText.trim();
            blogInfo.tags.forEach((el, i) => {
                if (val === el) {
                    tagsRef.current.removeChild(tagsRef.current.children[i]);
                    let currentTags = blogInfo.tags;
                    currentTags.splice(i, 1);
                    setBlogInfo({ ...blogInfo, tag: currentTags });
                }
            })
        }
    }
    return (
        <div className="tags-input">
            <div ref={tagsRef} className="tags" onClick={handleRemoveTag}></div>
            <div className="input">
                <input ref={inputRef} placeholder="Tạo không quá 5 tag" type="text" onKeyDown={handleKeyDown} onChange={() => { }}></input>
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsInput));