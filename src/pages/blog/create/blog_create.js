import React from 'react';
import './blog_create.css';
import { connect } from 'react-redux';
import { toggleSaveBox } from '../../../redux/blog/blog_actions';
import TagsInput from '../components/tags-input/tags-input.component';
import ActionsBlog from '../components/actions/actions.component';
import ModelPreview from '../components/model/model.component';
import SummaryBlog from '../components/summary/summary.component';
import UploadImage from '../components/upload-image/upload-image.component';
import CustomEditor from '../components/editor/custom-editor.component';

const BlogCreate = ({ hiddenSave, toggleSaveBox }) => {
    return (
        <>
            <div className="create-blog">
                <div id="toast-custom"></div>
                {hiddenSave ? null : <div className="overload" onClick={toggleSaveBox}></div>}
                <ActionsBlog />
                <TagsInput />
                <div className="summary row">
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 col-12">
                        <SummaryBlog />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 col-12">
                        <UploadImage />
                    </div>
                </div>
                <CustomEditor />
                <ModelPreview />
            </div>
        </>
    );
}

const mapStateToProps = ({ blog }) => ({
    hiddenSave: blog.hiddenSave
})

const mapDispatchToProps = dispatch => ({
    toggleSaveBox: () => dispatch(toggleSaveBox())
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate);