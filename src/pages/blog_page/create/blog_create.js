import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './blog_create.css';
import { useState } from 'react';
import { toast } from '../../../components/shared/toast_component/toast';
import { CommonConstants } from '../../../common/constants';
import { BlogService } from '../../../services/blog.service';
export const BlogCreate = (props) => {
    const TAG = "BlogCreate";
    const contentPreviewRef = useRef(null);
    const inputRef = useRef(null);
    const tagsRef = useRef(null);
    const summaryRef = useRef(null);
    const [fileName, setFileName] = useState('..................');
    const [tags, setTags] = useState([]);
    const [state, setState] = useState({
        title: '',
        summary: '',
        content: '',
        image: '',
        tagsFounded: []
    })
    const { title, summary, content, image, tagsFounded } = state;
    useEffect(() => {
        // Set file name
        document.getElementById('file-upload-blog').onchange = function () {
            setFileName(this.value.split('\\').pop());
        };
    }, [])
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
    const handleAddTag = (event) => {
        if (event.key === 'Enter') {
            let val = event.target.value;
            if (val !== '') {
                if (tags.length < 5) {
                    let currentTags = tags;
                    let item = document.createElement('span')
                    item.innerHTML = `${val} <i class="fa fa-close"></i>`
                    tagsRef.current.appendChild(item)
                    inputRef.current.value = ''

                    currentTags.push(val);
                    setTags(currentTags);
                } else {
                    toast({ title: "Warning!", message: 'Cannot create too 5 tags', type: "warning", duration: 3000 });
                }
            }
        }
    }
    // Submit all
    const handleCreate = () => {
        console.log()
        if (validate()) {
            (async function () {
                const data = {
                    author: { _id: '601f7928c0bb930b9cee5a9b', username: 'admin', fullname: 'Tran The Tai', email: 'trthetai3110@gmail.com' },
                    title: title,
                    summary: summaryRef.current.value,
                    content: content,
                    image: image,
                    tags: tags
                }
                let rs = await BlogService.create(data);
                try {
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
    // Preview
    const handelPreview = () => {
        contentPreviewRef.current.innerHTML = content;
    }
    return (
        <div>
            <div className="create-blog">
                {/* Toast */}
                <div id="toast-custom"></div>
                <div className="action">
                    <button className="btn btn-outline-secondary" onClick={handelPreview} data-toggle="modal" data-target=".bd-modal-preview">Xem <i className="fa fa-eye"></i></button>
                    <button className="btn btn-outline-secondary" onClick={handleCreate}>Tạo</button>
                </div>
                <div className="tags-input">
                    <div ref={tagsRef} className="tags">
                        {tags.map((el, i) => {
                            return <span key={i}>{el} <i className="fa fa-close"></i></span>
                        })}
                    </div>
                    <div className="input">
                        <input ref={inputRef} placeholder="Tạo không quá 5 tag" type="text" onKeyPress={handleAddTag} onChange={() => { }}></input>
                    </div>
                </div>
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
                                    <label className="btn btn-outline-secondary" htmlFor="file-upload-blog" style={{ margin: 0 }}>Choose a image</label>
                                    <p style={{ padding: '5px', flexGrow: 1, maxWidth: "150px", color: fileName === 'no have any image!' ? 'red' : '#333' }}><i>{fileName}</i></p>
                                </div>
                                <div><i className="fa fa-angle-double-right"></i></div>
                                <input type="submit" className="btn btn-outline-secondary" value="Upload"></input>
                            </form>
                            <img style={{ display: image !== '' ? 'block' : 'none', maxWidth: '100%', maxHeight: '300px', marginBottom: '25px' }} src={image} alt={fileName}></img>
                            {/* <div style={{ textAlign: 'right', display: isCreate ? 'block' : 'none' }}><input type="submit" onClick={handleCreate} className="btn btn-outline-info" value="Create new blog" ></input></div>
                            <div style={{ textAlign: 'right', display: isCreate ? 'none' : 'block' }}><input type="submit" onClick={handleModify} className="btn btn-outline-info" value="Modify" ></input></div> */}
                        </div>
                    </div>
                </div>
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
                                <h5 className="modal-title" id="modelPublishedLongTitle"><i className="fa fa-eye"></i> Preview</h5>
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
        </div>
    );
}

