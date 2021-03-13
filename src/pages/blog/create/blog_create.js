import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './blog_create.css';
import { toast } from '../../../components/toast/toast.component';
import { CommonConstants } from '../../../common/constants';
import { connect } from 'react-redux';
import { setBlogInfo, setFilename, setTagsCreating, toggleSaveBox } from '../../../redux/blog/blog_actions';
import TagsInput from '../components/tags-input/tags-input.component';
import ActionsBlog from '../components/actions/actions.component';
import ModelPreview from '../components/model/model.component';
import SummaryBlog from '../components/summary/summary.component';
import UploadImage from '../components/upload-image/upload-image.component';
import CustomEditor from '../components/editor/custom-editor.component';
const BlogCreate = ({ blogInfo, setBlogInfo, fileName, setFileName, hiddenSave, toggleSaveBox }) => {
    const TAG = "BlogCreate";
    const { content, image } = blogInfo;
    useEffect(async () => {
        // Set file name
        document.getElementById('file-upload-blog').onchange = function () {
            setFileName(this.value.split('\\').pop());
        };
    }, [])
    return (
        <>
            <div className="create-blog">
                {/* Toast */}
                <div id="toast-custom"></div>
                {/* Overload and Actions */}
                {hiddenSave ? null : <div className="overload" onClick={toggleSaveBox}></div>}
                <ActionsBlog />
                {/* Input tags */}
                <TagsInput />
                {/* Summary and upload image */}
                <div className="summary row">
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 col-12">
                        <SummaryBlog />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 col-12">
                        <UploadImage />
                    </div>
                </div>
                {/* Editor */}
                <CustomEditor />
                {/* Model preview */}
                <ModelPreview />
            </div>
        </>
    );
}

const mapStateToProps = ({ blog }) => ({
    tagsCreating: blog.tagsCreating,
    blogInfo: blog.blogInfo,
    fileName: blog.fileName,
    hiddenSave: blog.hiddenSave
})

const mapDispatchToProps = dispatch => ({
    setTagsCreating: tags => dispatch(setTagsCreating(tags)),
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
    setFileName: name => dispatch(setFilename(name)),
    toggleSaveBox: () => dispatch(toggleSaveBox())
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate);