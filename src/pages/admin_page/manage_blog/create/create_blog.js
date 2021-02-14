import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './create_blog.css';
import { useState } from 'react';
import { TagsService } from '../../../../services/tag.service';
import { Link } from 'react-router-dom';
import { BlogService } from '../../../../services/blog.service';
import { CommonConstants } from '../../../../common/constants';

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
export const CreateBlog = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [fileName, setFileName] = useState('..................')
    const [state, setState] = useState({
        tags: [],
        title: '',
        summary: '',
        content: '',
        image: '',
        tagsFounded: [],
    })
    const { tags, title, summary, content, image, tagsFounded } = state;

    // Fetch full tags
    useEffect(() => {
        // Set file name
        document.getElementById('my-files').onchange = function () {
            setFileName(this.value.split('\\').pop());
        };
        (async function () {
            let rs = await TagsService.find();
            if (typeof rs.msg === 'undefined') {
                if (rs.result === 'ok')
                    setState({
                        ...state,
                        tagsFounded: rs.data
                    });
                else console.log(rs.message);
            } else {
                console.log(rs.msg);
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
    // Change title
    const handleChangeTitle = (event) => {
        setState({
            ...state,
            title: event.target.value
        })
    }
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
        let photo = document.getElementById("my-files").files[0];
        if (typeof photo !== 'undefined') {
            formData.append("myFiles", photo);
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
                    console.log(err)
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
                        console.log(`${rs.message} and new tag is: ${JSON.stringify(rs.data)}`);
                    } else {
                        console.log(rs.message);
                    }
                } else {
                    console.log(rs.msg);
                }
            })();
        } else {
            console.log('image: ' + image + 'title: ' + title + "content:" + content + 'summary:' + summary)
        }
    }

    const validate = () => {
        if (title !== '' && content !== '' && summary !== '' && image !== '') return true;
        return false;
    }

    return (
        <div style={{ height: '100%' }}>
            <h5 style={{ padding: '15px 0px', fontWeight: '500', color: '#333' }}>{'>> Create a new blog'}</h5>
            <div style={{ height: '100%', width: '100%' }}>
                <div className="row" style={{ height: '100%' }}>
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 col-12" style={{ pading: 0 }}>
                        <div className="editor-blog">
                            <TextField style={{ marginBottom: '25px', width: '100%' }} id="standard-basic" label="Typing title..." onChange={handleChangeTitle} /><br></br>
                            <CKEditor
                                editor={Editor}
                                config={{
                                    toolbar: {
                                        items: [
                                            'heading', '|', 'bold', 'underline', 'italic', 'strikethrough', 'specialCharacters', 'fontBackgroundColor', 'fontColor',
                                            'fontSize', 'fontFamily', 'highlight', 'link', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|',
                                            'imageUpload', 'imageInsert', 'mediaEmbed', 'CKFinder', '|', 'codeBlock', 'insertTable', '|', 'MathType', 'ChemType', 'blockQuote',
                                            'undo', 'redo'
                                        ]
                                    },
                                    language: 'en',
                                    image: {
                                        toolbar: [
                                            'imageTextAlternative',
                                            'imageStyle:full',
                                            'imageStyle:side',
                                            'linkImage'
                                        ]
                                    },
                                    table: {
                                        contentToolbar: [
                                            'tableColumn',
                                            'tableRow',
                                            'mergeTableCells',
                                            'tableCellProperties',
                                            'tableProperties'
                                        ]
                                    },
                                    licenseKey: '',
                                    ckfinder: {
                                        uploadUrl: 'http://localhost:3030/uploads/multi'
                                    }
                                }}
                                // onReady={editor => {
                                //     console.log('Editor is ready to use!', editor);
                                // }}
                                onChange={(event, editor) => {
                                    console.log(editor.getData())
                                    setState({
                                        ...state,
                                        content: editor.getData()
                                    })
                                }}
                            // onBlur={(event, editor) => {
                            //     console.log('Blur.', editor);
                            // }}
                            // onFocus={(event, editor) => {
                            //     console.log('Focus.', editor);
                            // }}
                            />
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 col-12">
                        {tagsFounded.length > 0 ?
                            <FormControl className={classes.formControl} style={{ marginBottom: "25px" }}>
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
                            <div style={{ marginBottom: "25px" }}>Not found any tags. You can create new tag at <Link to="/">Thêm tag</Link>.</div>
                        }
                        <TextField
                            style={{ width: '100%', marginBottom: '25px' }}
                            id="outlined-multiline-static"
                            label="Summary"
                            multiline
                            rows={7}
                            defaultValue=""
                            variant="outlined"
                            onChange={handleChangeSummary}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <form onSubmit={handleUploadImage}
                                style={{ marginBottom: "50px", display: 'flex', justifyContent: 'space-between' }}
                                encType="multipart/form-data" method="POST" className="custom-file">
                                <input type="file" id="my-files" name="myFiles" style={{ display: 'none' }}></input>
                                <div>
                                    <label className="btn btn-outline-secondary" htmlFor="my-files" style={{ margin: 0 }}>Choose image</label>
                                    <p style={{ padding: '5px', flexGrow: 1, maxWidth: "150px", color: fileName === 'no have any image!' ? 'red' : '#333' }}><i>{fileName}</i></p>
                                </div>
                                <div><i className="fa fa-angle-double-right"></i></div>
                                <input type="submit" className="btn btn-outline-secondary" value="Upload"></input>
                            </form>
                            <img style={{ display: image !== '' ? 'block' : 'none', maxWidth: '100%', maxHeight: '300px', marginBottom: '25px' }} src={image} alt={fileName}></img>
                            <div style={{ textAlign: 'right' }}><input type="submit" onClick={handleCreate} className="btn btn-outline-info" value="Create new blog" ></input></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}