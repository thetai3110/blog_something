import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { BlogEditor } from '../blog_editor/blog_editor';
import { Button, Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
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
    const [tags, setTags] = React.useState([]);
    var valueTags = [];
    var valueTitle = "";
    const handleChange = (event) => {
        setTags(event.target.value);
        valueTags.push(event.target.value);
    };
    const handleChangeTitle = (event) => {
        valueTitle = event.target.value;
    }
    const handleSubmit = (event) =>{
        console.log(valueTags)
    }
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    return (
        <div style={{height: '100%'}}>
            <h1 style={{ textAlign: 'center' }}>Create blog</h1>
            <div className={classes.root}>
                <div>
                    <form noValidate autoComplete="off">
                        <FormControl className={classes.formControl} style={{ maxWidth: "250px" }}>
                            <InputLabel id="demo-mutiple-checkbox-label">Tag</InputLabel>
                            <Select style={{ padding: "0px 10px" }}
                                multiple
                                value={tags}
                                onChange={handleChange}
                                renderValue={(selected) => {
                                    let arr = selected.join(',')
                                    return arr
                                }}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={tags.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br></br>
                        <Button style={{ marginTop: "25px" }} variant="outlined" onClick={handleSubmit}>Submit</Button>
                    </form>
                </div>
                <div style={{ flexGrow: 2, height: '100%' }}>
                    <TextField style={{ marginBottom: '25px', width: '100%' }} id="standard-basic" label="Typing title..." onChange={handleChangeTitle} /><br></br>
                    <BlogEditor />
                </div>
            </div>
        </div>
    );
}