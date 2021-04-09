import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { toast } from '../../../../components/toast/toast.component';
import { storage } from '../../../../firebase';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';
import './custom-editor.component.css';

const CustomEditor = ({ blogInfo, setBlogInfo }) => {
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false,
        uploader: {
            "insertImageAsBase64URI": true
        }
    }
    return (
        <div className="create-blog-content">
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
            />
            {/* <div className="editor-blog">
                <CKEditor
                    editor={Editor}
                    config={{
                        toolbar: {
                            items: [
                                'heading','|',
                                'bold',
                                'underline',
                                'italic',
                                'strikethrough',
                                'link',
                                'bulletedList',
                                'numberedList',
                                '|',
                                'outdent',
                                'indent',
                                '|',
                                'imageUpload',
                                'mediaEmbed',
                                'insertTable',
                                'blockQuote',
                                '|',
                                'codeBlock',
                                'MathType',
                                'ChemType',
                                '|',
                                'undo',
                                'redo'
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
                        // ckfinder: {
                        //     uploadUrl: `${process.env.REACT_APP_SERVER}/uploads/multi`
                        // }
                    }}
                    onChange={(event, editor) => {
                        setBlogInfo({
                            ...blogInfo,
                            title: editor.getData().split('</h1>').shift().slice(4),
                            content: editor.getData()
                        })
                    }}
                    onReady={editor => {
                        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                            return new UploadAdapter(loader);
                        };
                    }}
                />
            </div> */}
        </div>
    )
}
class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    // Starts the upload process.
    upload() {
        return this.loader.file.then(
            file =>
                new Promise((resolve, reject) => {
                    let uploadName = 'upload' + Date.now() + '.' + file.type.split("/").pop();
                    let uploadTask = storage.ref(`uploads/${uploadName}`).put(file);
                    uploadTask.on(
                        'state_changed', // or 
                        function (snapshot) {

                        },
                        function (error) {
                            toast({ title: "Failed!", message: error, type: "error", duration: 2000 });
                        },
                        function () {
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then(function (downloadURL) {
                                    resolve({
                                        default: downloadURL
                                    });
                                });
                        }
                    );
                })
        );
    }
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomEditor);