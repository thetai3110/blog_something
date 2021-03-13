import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import { connect } from 'react-redux';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';
import './custom-editor.component.css';

const CustomEditor = ({ blogInfo, setBlogInfo }) => {
    return (
        <div className="create-blog-content">
            <div className="editor-blog">
                <CKEditor
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
                            uploadUrl: `${process.env.REACT_APP_SERVER}/uploads/multi`
                        }
                    }}
                    onChange={(event, editor) => {
                        setBlogInfo({
                            ...blogInfo,
                            title: editor.getData().split('</h1>').shift().slice(4),
                            content: editor.getData()
                        })
                    }}
                />
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomEditor);