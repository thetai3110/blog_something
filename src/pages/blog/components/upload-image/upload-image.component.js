import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from '../../../../components/toast/toast.component';
import { storage } from '../../../../firebase';
import { setHiddenProgressUpload, setBlogInfo, setFilename, setProgressUpload } from '../../../../redux/blog/blog_actions';
import './upload-image.component.css';

const UploadImage = ({ blogInfo, fileName, setBlogInfo, setFileName, progress, setProgress, hiddenProgress, setHiddenProgress }) => {
    const { image } = blogInfo;
    useEffect(() => {
        setHiddenProgress(true);
        (async function () {
            document.getElementById('file-upload-blog').onchange = function () {
                setFileName(this.value.split('\\').pop());
            };
        }())
    }, [])
    // Upload main image
    const handleUploadImage = (event) => {
        event.preventDefault();
        let image = document.getElementById("file-upload-blog").files[0];
        if (typeof image !== 'undefined') {
            let uploadName = 'upload' + Date.now() + '.' + image.type.split("/").pop();
            const uploadTask = storage.ref(`uploads/${uploadName}`).put(image);
            setHiddenProgress(false);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    toast({ title: "Failed!", message: error, type: "error", duration: 2000 });
                },
                () => {
                    storage
                        .ref("uploads")
                        .child(uploadName)
                        .getDownloadURL()
                        .then(url => {
                            setBlogInfo({ ...blogInfo, image: url })
                        });
                }
            );
        } else {
            setFileName('no have any image!')
        }
    }
    return (
        <div className="upload-image">
            <form onSubmit={handleUploadImage}
                encType="multipart/form-data" method="POST" className="custom-file form-upload">
                <input type="file" id="file-upload-blog" accept='image/*' name="file-upload-blog" style={{ display: 'none' }}></input>
                <div className="action">
                    <label className="btn btn-secondary" htmlFor="file-upload-blog">Chọn ảnh</label>
                    <p style={{ color: fileName === 'no have any image!' ? 'red' : '#333' }}><i>{fileName}</i></p>
                </div>
                <div><i className="fa fa-angle-double-right"></i></div>
                <input type="submit" className="btn btn-secondary" value="Tải lên"></input>
            </form>
            {!hiddenProgress ? <div className="progress" style={{ width: 'auto', marginBottom: '0.5rem' }}>
                <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{progress}%</div>
            </div> : null}
            <img style={{ display: image !== '' ? 'block' : 'none' }} src={image} alt={fileName}></img>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
    fileName: blog.fileName,
    progress: blog.progress,
    hiddenProgress: blog.hiddenProgress
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
    setFileName: name => dispatch(setFilename(name)),
    setProgress: progress => dispatch(setProgressUpload(progress)),
    setHiddenProgress: (status) => dispatch(setHiddenProgressUpload(status)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);