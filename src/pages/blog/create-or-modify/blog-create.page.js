import React from 'react';
import { connect } from 'react-redux';
import { toggleSaveBox } from '../../../redux/blog/blog_actions';
import TagsInput from '../components/tags-input/tags-input.component';
import ActionsBlog from '../components/actions/actions.component';
import ModelPreview from '../components/model/model.component';
import SummaryBlog from '../components/summary/summary.component';
import UploadImage from '../components/upload-image/upload-image.component';
import CustomEditor from '../components/editor/custom-editor.component';
import styled from 'styled-components';

const PageWrap = styled.div`
    height: 100%;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
`
const Content = styled.div`
    flex-grow: 1;
    margin-top: 1rem;
`
const OverLoad = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
`

const BlogCreate = ({ hiddenSave, toggleSaveBox }) => {
    return (
        <PageWrap>
            <div id="toast-custom"></div>
            {hiddenSave ? null : <OverLoad onClick={toggleSaveBox}></OverLoad>}
            <div>
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
            </div>
            <Content>
                <CustomEditor />
            </Content>
            <ModelPreview />
        </PageWrap>
    );
}

const mapStateToProps = ({ blog }) => ({
    hiddenSave: blog.hiddenSave
})

const mapDispatchToProps = dispatch => ({
    toggleSaveBox: () => dispatch(toggleSaveBox())
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreate);