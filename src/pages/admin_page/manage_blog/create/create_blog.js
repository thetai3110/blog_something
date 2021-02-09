import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './create_blog.css';
import { useState } from 'react';
import { TagsService } from '../../../../services/tag.service';
import { Link } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
};
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: 'flex',
        marginTop: '25px',
        height: '80%'
    },
}));
export const CreateBlog = () => {
    const classes = useStyles();
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tagsFounded, setTagsFounded] = useState([]);
    useEffect(() => {
        (async function () {
            let rs = await TagsService.find();
            if (typeof rs.msg === 'undefined') {
                setTagsFounded(rs.data);
            } else {
                console.log(rs.msg);
            }
        })();
    }, [])
    const handleChange = (event) => {
        setTags(event.target.value);
        console.log(event.target.value)
    };
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleSubmit = () => {
        (async function () {
            let arr = [];
            tags.forEach(el => {
                arr.push(el._id);
            })
            const data = {
                athourId: '601f7928c0bb930b9cee5a9b',
                title: title,
                summary: 'a',
                content: content,
                publishedBy: '601f7928c0bb930b9cee5a9b',
                tag: arr
            }
            let rs = await TagsService.create(data);
            if (typeof rs.msg === 'undefined') {
                if (rs.result === 'ok') {
                    console.log(`${rs.message} and new tag is: ${JSON.stringify(rs.data)}`);
                } else {
                    console.log(`${rs.message}`);
                }
            } else {
                console.log(rs.msg);
            }
        })();
    }
    return (
        <div style={{ height: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>Create blog</h1>
            <div className={classes.root}>
                <div style={{ flexGrow: 2, height: '100%' }}>
                    <TextField style={{ marginBottom: '25px', width: '100%' }} id="standard-basic" label="Typing title..." onChange={handleChangeTitle} /><br></br>
                    <CKEditor
                        editor={Editor}
                        config={{
                            toolbar: {
                                items: [
                                    'heading', '|', 'bold', 'underline', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                                    'indent', 'outdent', 'alignment', '|', 'imageUpload', 'blockQuote', 'insertTable',
                                    'mediaEmbed', 'undo', 'redo', 'highlight', 'CKFinder', 'MathType', 'ChemType'
                                ]
                            },
                            language: 'en',
                            image: {
                                styles: ['full', 'side']
                            },
                            table: {
                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                            },
                            licenseKey: '',
                            ckfinder: {
                                uploadUrl: 'http://localhost:3030/uploads'
                            }
                        }}
                        // onReady={editor => {
                        //     console.log('Editor is ready to use!', editor);
                        // }}
                        onChange={(event, editor) => {
                            setContent(editor.getData());
                        }}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}
                    />
                </div>
                <div style={{ width: "200px" }}>
                    <form noValidate autoComplete="off">
                        {tagsFounded.length > 0 ?
                            <FormControl className={classes.formControl} style={{ width: "100%" }}>
                                <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                                <Select style={{ padding: "0px 10px" }}
                                    multiple
                                    value={tags}
                                    onChange={handleChange}
                                    renderValue={(selected) => {
                                        let arr = [];
                                        selected.forEach(el => {
                                            arr.push(el.tagName);
                                        })
                                        return arr.join(',')
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {tagsFounded.map((elm) => (
                                        <MenuItem key={elm._id} value={elm}>
                                            <Checkbox checked={tags.indexOf(elm) > -1} />
                                            <ListItemText primary={elm.tagName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl> :
                            <div>Not fonund any tag. You can create more at <Link to="/">Create tag</Link>.</div>
                        }
                        <br></br>
                        <Button style={{ marginTop: "25px" }} variant="outlined" onClick={handleSubmit}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}