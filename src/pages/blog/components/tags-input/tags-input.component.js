import { useRef } from 'react';
import { connect } from 'react-redux';
import { toast } from '../../../../components/toast/toast.component';
import { setTagsCreating } from '../../../../redux/blog/blog_actions';
import './tags-input.component.css';

const TagsInput = ({ tagsCreating, setTagsCreating }) => {
    const inputRef = useRef(null);
    const tagsRef = useRef(null);
    // Tags
    const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            let val = event.target.value;
            if (val !== '' && !tagsCreating.includes(val)) {
                if (tagsCreating.length < 5) {
                    let currentTags = tagsCreating;
                    let item = document.createElement('span')
                    item.innerHTML = `${val} <i class="fa fa-close close-tag"></i>`
                    tagsRef.current.appendChild(item)
                    inputRef.current.value = ''

                    currentTags.push(val);
                    setTagsCreating(currentTags);
                } else {
                    toast({ title: "Warning!", message: 'Cannot create too 5 tags', type: "warning", duration: 3000 });
                }
            }
        }
        if (event.keyCode === 8 || event.keyCode === 46) {
            let val = event.target.value;
            if (val === '' && tagsRef.current.children.length > 0) {
                tagsRef.current.removeChild(tagsRef.current.children[tagsRef.current.children.length - 1]);
                let currentTags = tagsCreating;
                currentTags.pop();
                setTagsCreating(currentTags);
            }
        }
    }
    const handleRemoveTag = (event) => {
        if (event.target.closest('.close-tag')) {
            const val = event.target.closest('span').innerText.trim();
            tagsCreating.forEach((el, i) => {
                if (val === el) {
                    tagsRef.current.removeChild(tagsRef.current.children[i]);
                    let currentTags = tagsCreating;
                    currentTags.splice(i, 1);
                    setTagsCreating(currentTags);
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
    tagsCreating: blog.tagsCreating
})

const mapDispatchToProps = dispatch => ({
    setTagsCreating: tags => dispatch(setTagsCreating(tags))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagsInput);