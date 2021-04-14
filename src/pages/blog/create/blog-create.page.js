import React from 'react';
import './blog-create.page.css';
import { connect } from 'react-redux';
import { toggleSaveBox } from '../../../redux/blog/blog_actions';
import TagsInput from '../components/tags-input/tags-input.component';
import ActionsBlog from '../components/actions/actions.component';
import ModelPreview from '../components/model/model.component';
import SummaryBlog from '../components/summary/summary.component';
import UploadImage from '../components/upload-image/upload-image.component';
import CustomEditor from '../components/editor/custom-editor.component';

const BlogCreate = ({ hiddenSave, toggleSaveBox, history }) => {
    return (
        <>
            <div className="create-blog">
                <div id="toast-custom"></div>
                {hiddenSave ? null : <div className="overload" onClick={toggleSaveBox}></div>}
                <ActionsBlog />
                <TagsInput />
                <div className="summary row">
                    <div className="col l-9 md-8 c-12">
                        <SummaryBlog />
                    </div>
                    <div className="col l-3 md-4 c-12">
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