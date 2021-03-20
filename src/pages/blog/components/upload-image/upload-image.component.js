import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from '../../../../components/toast/toast.component';
import { storage } from '../../../../firebase';
import { setBlogInfo, setFilename } from '../../../../redux/blog/blog_actions';
import './upload-image.component.css';

const UploadImage = ({ blogInfo, fileName, setBlogInfo, setFileName }) => {
    const TAG = "UploadImage";
    const { image } = blogInfo
    useEffect(() => {
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
            uploadTask.on(
                "state_changed",
                snapshot => {
                    // const progress = Math.round(
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    // );
                    //setProgress(progress);
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
                style={{ marginBottom: "50px", display: 'flex', justifyContent: 'space-between' }}
                encType="multipart/form-data" method="POST" className="custom-file">
                <input type="file" id="file-upload-blog" accept='image/*' name="file-upload-blog" style={{ display: 'none' }}></input>
                <div>
                    <label className="btn btn-secondary" htmlFor="file-upload-blog" style={{ margin: 0 }}>Chọn ảnh</label>
                    <p style={{ padding: '5px', flexGrow: 1, maxWidth: "150px", color: fileName === 'no have any image!' ? 'red' : '#333' }}><i>{fileName}</i></p>
                </div>
                <div><i className="fa fa-angle-double-right"></i></div>
                <input type="submit" className="btn btn-secondary" value="Tải lên"></input>
            </form>
            <img style={{ display: image !== '' ? 'block' : 'none', maxWidth: '100%', maxHeight: '300px', marginBottom: '25px' }} src={image} alt={fileName}></img>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
    fileName: blog.fileName,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
    setFileName: name => dispatch(setFilename(name)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);