import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor  from 'ckeditor5-build-custom';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { storage } from '../../../../firebase';
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
            </div>
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
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            // var progress =
                            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            // console.log("Upload is " + progress + "% done");
                            // switch (snapshot.state) {
                            //     case storage.TaskState.PAUSED: // or 'paused'
                            //         console.log("Upload is paused");
                            //         break;
                            //     case storage.TaskState.RUNNING: // or 'running'
                            //         console.log("Upload is running");
                            //         break;
                            // }
                        },
                        function (error) {
                            // switch (error.code) {
                            //     case "storage/unauthorized":
                            //         reject(" User doesn't have permission to access the object");
                            //         break;

                            //     case "storage/canceled":
                            //         reject("User canceled the upload");
                            //         break;

                            //     case "storage/unknown":
                            //         reject(
                            //             "Unknown error occurred, inspect error.serverResponse"
                            //         );
                            //         break;
                            // }
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