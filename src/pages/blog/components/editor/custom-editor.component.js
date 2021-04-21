import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import { connect } from 'react-redux';
import { toast } from '../../../../components/toast/toast.component';
import { storage } from '../../../../firebase';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';
import './custom-editor.component.css';

const CustomEditor = ({ blogInfo, setBlogInfo }) => {
    return (
        <div className="editor-blog">
            <CKEditor
                data={blogInfo.content}
                editor={Editor}
                config={{
                    toolbar: {
                        items: [
                            'code',
                            '|',
                            'heading',
                            '|',
                            'bold',
                            'underline',
                            'italic',
                            'fontFamily',
                            'fontSize',
                            'fontColor',
                            'fontBackgroundColor',
                            'highlight',
                            '|',
                            'bulletedList',
                            'numberedList',
                            '|',
                            'outdent',
                            'indent',
                            '|',
                            'link',
                            'imageUpload',
                            'blockQuote',
                            'insertTable',
                            'mediaEmbed',
                            'imageInsert',
                            'codeBlock',
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
                }}
                onChange={(event, editor) => {
                    if (editor.getData() !== '') {
                        setBlogInfo({
                            ...blogInfo,
                            title: editor.getData().split('</h1>').shift().slice(4),
                            content: editor.getData()
                        })
                    }
                }}
                onReady={editor => {
                    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                        return new UploadAdapter(loader);
                    };
                }}
            />
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
                        'state_changed',
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