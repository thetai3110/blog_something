import React, { useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './create_or_modify.css';
import { useState } from 'react';
import { TagsService } from '../../../../services/tag.service';
import { Link } from 'react-router-dom';
import { BlogService } from '../../../../services/blog.service';
import { CommonConstants } from '../../../../common/constants';
import { toast } from '../../../../components/shared/toast_component/toast';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '98%',
        marginBottom: '25px'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

function getStyles(name, tag, theme) {
    return {
        fontWeight:
            tag.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export const CreateBlog = (props) => {
    const TAG = "CreateBlog";
    const contentPreviewRef = useRef(null);
    const classes = useStyles();
    const theme = useTheme();
    const [fileName, setFileName] = useState('..................');
    const isCreate = typeof props.location.state === 'undefined' ? true : false;
    const [state, setState] = useState({
        tags: isCreate ? [] : props.location.state.tags,
        title: isCreate ? '' : props.location.state.content.split('</h1>').shift().slice(4),
        summary: isCreate ? '' : props.location.state.summary,
        content: isCreate ? '' : props.location.state.content,
        image: isCreate ? '' : props.location.state.image,
        tagsFounded: []
    })
    const { tags, title, summary, content, image, tagsFounded } = state;

    useEffect(() => {
        // Set file name
        document.getElementById('file-upload-blog').onchange = function () {
            setFileName(this.value.split('\\').pop());
        };
        // Fetch full tags
        (async function () {
            let rs = await TagsService.find();
            if (typeof rs.msg === 'undefined') {
                if (rs.result === 'ok') {
                    setState({ ...state, tagsFounded: rs.data });
                }
                else console.log(TAG + ': ' + rs.message);
            } else {
                console.log(TAG + ': ' + rs.msg);
            }
        })();
    }, [])
    // Change tags
    const handleChange = (event) => {
        setState({
            ...state,
            tags: event.target.value
        })
    };
    // Change summary
    const handleChangeSummary = (event) => {
        setState({
            ...state,
            summary: event.target.value
        })
    }
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
    // Submit all
    const handleCreate = () => {
        if (validate()) {
            (async function () {
                const data = {
                    author: { _id: '601f7928c0bb930b9cee5a9b', username: 'admin', fullname: 'Tran The Tai', email: 'trthetai3110@gmail.com' },
                    title: title,
                    summary: summary,
                    content: content,
                    image: image,
                    tags: tags
                }
                let rs = await BlogService.create(data);
                if (typeof rs.msg === 'undefined') {
                    if (rs.result === 'ok') {
                        toast({ title: "Success!", message: "A new blog added.", type: "success", duration: 2000 });
                        setTimeout(()=>{
                            props.history.replace('/admin/blog');
                        }, 2000)
                    } else {
                        toast({ title: "Failed!", message: `Failed at: ${rs.message}`, type: "error", duration: 3000 });
                        console.log(TAG + ': ' + rs.message);
                    }
                } else {
                    toast({ title: "Failed!", message: `Failed at: ${rs.msg}`, type: "error", duration: 3000 });
                    console.log(TAG + ': ' + rs.msg);
                }
            })();
        } else {
            console.log(TAG + ': ' + '{image: ' + image + ', title: ' + title + ", content: " + content + ', summary: ' + summary + '}')
            toast({
                title: "Warning!",
                message: `Please fill all fields (${image === '' ? 'image' : ''}, ${title === '' ? 'title' : ''}, ${content === '' ? 'content' : ''}, ${summary === '' ? 'summary' : ''}).`,
                type: "warning",
                duration: 3000
            });
        }
    }
    // Modify
    const handleModify = () => {
        if (validate()) {
            (async function () {
                const data = {
                    title: title,
                    summary: summary,
                    content: content,
                    image: image,
                    tags: tags,
                    modifyAt: Date.now
                }
                let rs = await BlogService.modify(props.location.state._id, data);
                if (typeof rs.msg === 'undefined') {
                    if (rs.result === 'ok') {
                        toast({ title: "Success!", message: "This blog was modified.", type: "success", duration: 2000 });
                        setTimeout(()=>{
                            props.history.replace('/admin/blog');
                        }, 2000)
                    } else {
                        toast({ title: "Failed!", message: `Failed at: ${rs.message}`, type: "error", duration: 3000 });
                        console.log(TAG + ': ' + rs.message);
                    }
                } else {
                    toast({ title: "Failed!", message: `Failed at: ${rs.msg}`, type: "error", duration: 3000 });
                    console.log(TAG + ': ' + rs.msg);
                }
            })();
        } else {
            console.log(TAG + ': ' + '{image: ' + image + ', title: ' + title + ", content: " + content + ', summary: ' + summary + '}')
            toast({
                title: "Warning!",
                message: `Please fill all fields (${image === '' ? 'image' : ''}, ${title === '&nbsp;' ? 'title' : ''}, ${content === '' ? 'content' : ''}, ${summary === '' ? 'summary' : ''}).`,
                type: "warning",
                duration: 3000
            });
        }
    }
    // Validate
    const validate = () => {
        if (title !== '&nbsp;' && content !== '' && summary !== '' && image !== '') return true;
        return false;
    }
    // Preview
    const handelPreview = () => {
        contentPreviewRef.current.innerHTML = content;
    }
    return (
        <div className="create-blog">
            {/* Toast */}
            <div id="toast-custom"></div>
            <h5>Create a new blog: <i className="fa fa-eye create-blog-review-btn" data-toggle="modal" data-target=".bd-modal-preview" onClick={handelPreview}></i></h5>
            <div className="create-blog-content">
                <div className="row">
                    {/* CKEditor */}
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 col-12">
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
                    {/* Form */}
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 col-12">
                        {tagsFounded.length > 0 ?
                            <FormControl className={classes.formControl}>
                                <InputLabel id="mutiple-chip-label">Tags</InputLabel>
                                <Select
                                    labelId="mutiple-chip-label"
                                    id="mutiple-chip"
                                    multiple
                                    value={tags}
                                    onChange={handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip key={value._id} label={value.tagName} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {tagsFounded.map((elm) => (
                                        <MenuItem key={elm._id} value={elm} style={getStyles(elm, tags, theme)}>
                                            {elm.tagName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl> :
                            <div className="create-blog-notags">Not found any tags. You can create new tag at <Link to="/">Create a new tag</Link>.</div>
                        }
                        <TextField
                            style={{ marginBottom: '25px', width: '100%' }}
                            id="outlined-multiline-static"
                            label="Summary"
                            multiline
                            rows={7}
                            defaultValue={summary}
                            variant="outlined"
                            onChange={handleChangeSummary}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                            <div style={{ textAlign: 'right', display: isCreate ? 'block' : 'none' }}><input type="submit" onClick={handleCreate} className="btn btn-outline-info" value="Create new blog" ></input></div>
                            <div style={{ textAlign: 'right', display: isCreate ? 'none' : 'block' }}><input type="submit" onClick={handleModify} className="btn btn-outline-info" value="Modify" ></input></div>
                        </div>
                    </div>
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
    );
}