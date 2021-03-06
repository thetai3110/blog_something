import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './blog_create.css';
import { useState } from 'react';
import { toast } from '../../../components/toast/toast.component';
import { CommonConstants } from '../../../common/constants';
import { BlogService } from '../../../services/blog.service';
export const BlogCreate = (props) => {
    const TAG = "BlogCreate";
    const contentPreviewRef = useRef(null);
    const inputRef = useRef(null);
    const tagsRef = useRef(null);
    const publishRef = useRef(null);
    const summaryRef = useRef(null);
    const overloadRef = useRef(null);
    const [fileName, setFileName] = useState('..................');
    const [tags, setTags] = useState([]);
    const [state, setState] = useState({
        title: '',
        summary: '',
        content: '',
        image: '',
        tagsFounded: []
    })
    const { title, summary, content, image } = state;
    useEffect(async () => {
        // Set file name
        document.getElementById('file-upload-blog').onchange = function () {
            setFileName(this.value.split('\\').pop());
        };
    }, [])
    useEffect(() => {

    })
    // Upload main image
    const handleUploadImage = (event) => {
        event.preventDefault();
        let formData = new FormData();
        let photo = document.getElementById("file-upload-blog").files[0];
        if (typeof photo !== 'undefined') {
            formData.append("file-upload-blog", photo);
            fetch(`${CommonConstants.server}/uploads/single`, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    setState({
                        ...state,
                        image: data.url
                    })
                })
                .catch(err => {
                    toast({ title: "Failed!", message: `Failed at: ${err}`, type: "error", duration: 3000 });
                    console.log(TAG + ': ' + err)
                })
        } else {
            setFileName('no have any image!')
        }
    }
    // Tags
    const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            let val = event.target.value;
            if (val !== '' && !tags.includes(val)) {
                if (tags.length < 5) {
                    let currentTags = tags;
                    let item = document.createElement('span')
                    item.innerHTML = `${val} <i class="fa fa-close close-tag"></i>`
                    tagsRef.current.appendChild(item)
                    inputRef.current.value = ''

                    currentTags.push(val);
                    setTags(currentTags);
                } else {
                    toast({ title: "Warning!", message: 'Cannot create too 5 tags', type: "warning", duration: 3000 });
                }
            }
        }
        if (event.keyCode === 8 || event.keyCode === 46) {
            let val = event.target.value;
            if (val === '' && tagsRef.current.children.length > 0) {
                tagsRef.current.removeChild(tagsRef.current.children[tagsRef.current.children.length - 1]);
                let currentTags = tags;
                currentTags.pop();
                setTags(currentTags);
            }
        }
    }
    const handleRemoveTag = (event) => {
        if (event.target.closest('.close-tag')) {
            const val = event.target.closest('span').innerText.trim();
            tags.forEach((el, i) => {
                if(val === el){
                    tagsRef.current.removeChild(tagsRef.current.children[i]);
                    let currentTags = tags;
                    currentTags.splice(i,1);
                    console.log(currentTags)
                    setTags(currentTags);
                }
            })
        }
    }
    // Submit all
    const handleCreate = (publish) => {
        console.log()
        if (validate()) {
            (async function () {
                const data = {
                    author: { _id: '601f7928c0bb930b9cee5a9b', username: 'admin', fullname: 'Tran The Tai', email: 'trthetai3110@gmail.com' },
                    title: title,
                    summary: summaryRef.current.value,
                    content: content,
                    image: image,
                    tags: tags,
                    published: publish
                }
                try {
                    const res = await BlogService.create(data);
                    const rs = await res.json();
                    if (rs.result === 'ok') {
                        toast({ title: "Success!", message: "A new blog added.", type: "success", duration: 2000 });
                        setTimeout(() => {
                            props.history.replace('/');
                        }, 2000)
                    } else {
                        toast({ title: "Failed!", message: `Failed at: ${rs.message}`, type: "error", duration: 3000 });
                        console.log(TAG + ': ' + rs.message);
                    }
                } catch (err) {
                    toast({ title: "Failed!", message: `Failed at: ${err}`, type: "error", duration: 3000 });
                    console.log(TAG + ': ' + err);
                }
            })();
        } else {
            console.log(TAG + ': ' + '{image: ' + image + ', title: ' + title + ", content: " + content + ', summary: ' + summary + '}')
            toast({
                title: "Warning!",
                message: `Please fill all fields (${image === '' ? 'image' : ''}, ${title === '' ? 'title' : ''}, ${content === '' ? 'content' : ''}, ${summaryRef.current.value === '' ? 'summary' : ''}).`,
                type: "warning",
                duration: 3000
            });
        }
    }
    // Validate
    const validate = () => {
        if (title !== '&nbsp;' && content !== '' && summaryRef.current.value !== '' && image !== '') return true;
        return false;
    }
    return (
        <>
            <div className="create-blog">
                {/* Toast */}
                <div id="toast-custom"></div>
                {/* Overload */}
                <div className="overload" ref={overloadRef} onClick={() => {
                    publishRef.current.style.display = 'none';
                    overloadRef.current.style.display = 'none';
                }}></div>
                <div className="actions">
                    <button className="btn btn-secondary" onClick={() => contentPreviewRef.current.innerHTML = content} data-toggle="modal" data-target=".bd-modal-preview">Xem trước <i className="fa fa-eye"></i></button>
                    {/* Publish */}
                    <div className="publish">
                        <button className="btn btn-secondary" onClick={() => {
                            publishRef.current.style.display = 'block';
                            overloadRef.current.style.display = 'block';
                        }}>Xong <i className="fa fa-chevron-down" aria-hidden="true"></i></button>
                        <div className="publish-box" ref={publishRef} id="publish-box">
                            <h6>Công khai bài viết</h6>
                            <p>Lựa chọn:</p>
                            <div className="publish-option">
                                <input type="radio" name="publish" id="public" defaultChecked={false}></input><label htmlFor="public">Công khai</label><br></br>
                                <input type="radio" name="publish" id="private" defaultChecked={false}></input><label htmlFor="private">Riêng tư</label><br></br>
                                <input type="radio" name="publish" id="draft" defaultChecked={true}></input><label htmlFor="draft">Draft</label>
                                <hr></hr>
                                <div className="option-description" id="public-description">
                                    <p>Tất cả mọi người đều có thể nhìn thấy bài viết này.</p>
                                    <button className="btn btn-primary" onClick={() => handleCreate(1)}>Công khai</button>
                                </div>
                                <div className="option-description" id="private-description">
                                    <p>Chỉ có bạn mới có thể nhìn thấy bài viết này. Bạn có thể công khai nó bất cứ khi nào.</p>
                                    <button className="btn btn-primary" onClick={() => handleCreate(2)}>Riêng tư</button>
                                </div>
                                <div className="option-description" id="draft-description">
                                    <p>Lưu nháp nếu bạn chưa hoàn thành bài viết này và muốn chỉnh sửa tiếp.</p>
                                    <button className="btn btn-primary" onClick={() => handleCreate(0)}>Lưu nháp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Input tags */}
                <div className="tags-input">
                    <div ref={tagsRef} className="tags" onClick={handleRemoveTag}></div>
                    <div className="input">
                        <input ref={inputRef} placeholder="Tạo không quá 5 tag" type="text" onKeyDown={handleKeyDown} onChange={() => { }}></input>
                    </div>
                </div>
                {/* Summary and upload image */}
                <div className="summary row">
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 col-12">
                        <textarea ref={summaryRef} placeholder="Tóm tắt"></textarea>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 col-12">
                        <div className="upload-image">
                            <form onSubmit={handleUploadImage}
                                style={{ marginBottom: "50px", display: 'flex', justifyContent: 'space-between' }}
                                encType="multipart/form-data" method="POST" className="custom-file">
                                <input type="file" id="file-upload-blog" accept='image/*' name="file-upload-blog" style={{ display: 'none' }}></input>
                                <div>
                                    <label className="btn btn-secondary" htmlFor="file-upload-blog" style={{ margin: 0 }}>Chọn ảnh</label>
                                    <p style={{ padding: '5px', flexGrow: 1, maxWidth: "150px", color: fileName === 'no have any image!' ? 'red' : '#333' }}><i>{fileName}</i></p>
                                </div>
                                <div><i className="fa fa-angle-double-right"></i></div>
                                <input type="submit" className="btn btn-secondary" value="Tải lên"></input>
                            </form>
                            <img style={{ display: image !== '' ? 'block' : 'none', maxWidth: '100%', maxHeight: '300px', marginBottom: '25px' }} src={image} alt={fileName}></img>
                        </div>
                    </div>
                </div>
                {/* Editor */}
                <div className="create-blog-content">
                    {/* CKEditor */}
                    <div className="editor-blog">
                        <CKEditor
                            data={content}
                            editor={Editor}
                            config={{
                                toolbar: {
                                    items: [
                                        'heading', '|', 'bold', 'underline', 'italic', 'strikethrough', 'specialCharacters', 'fontBackgroundColor',
                                        'fontColor', 'fontSize', 'fontFamily', 'highlight', 'link', '|', 'bulletedList', 'numberedList', '|', 'indent',
                                        'outdent', '|', 'imageUpload', 'imageInsert', 'mediaEmbed', 'CKFinder', '|', 'codeBlock', 'insertTable', '|',
                                        'MathType', 'ChemType', 'blockQuote', 'undo', 'redo'
                                    ]
                                },
                                language: 'en',
                                image: {
                                    styles: [
                                        'alignLeft', 'alignCenter', 'alignRight'
                                    ],
                                    toolbar: [
                                        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                                        '|', 'imageResize', '|', 'imageTextAlternative', '|', 'linkImage'
                                    ]
                                },
                                table: {
                                    contentToolbar: [
                                        'tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties'
                                    ]
                                },
                                licenseKey: '',
                                ckfinder: {
                                    uploadUrl: 'http://localhost:3030/uploads/multi'
                                }
                            }}
                            onChange={(event, editor) => {
                                setState({
                                    ...state,
                                    title: editor.getData().split('</h1>').shift().slice(4),
                                    content: editor.getData()
                                })
                            }}
                        />
                    </div>
                </div>
                {/* Model preview */}
                <div className="modal fade bd-modal-preview" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modelPublishedLongTitle"><i className="fa fa-eye"></i> Xem trước</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="ck-content">
                                    <div ref={contentPreviewRef} style={{ padding: '0px 20px' }}></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

