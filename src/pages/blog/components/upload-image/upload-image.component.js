import { connect } from 'react-redux';
import { CommonConstants } from '../../../../common/constants';
import { toast } from '../../../../components/toast/toast.component';
import { setBlogInfo, setFilename } from '../../../../redux/blog/blog_actions';
import './upload-image.component.css';

const UploadImage = ({ blogInfo, fileName, setBlogInfo, setFileName }) => {
    const TAG = "UploadImage";
    const { image } = blogInfo
    // Upload main image
    const handleUploadImage = (event) => {
        event.preventDefault();
        let formData = new FormData();
        let photo = document.getElementById("file-upload-blog").files[0];
        if (typeof photo !== 'undefined') {
            formData.append("file-upload-blog", photo);
            fetch(`${CommonConstants.server}/uploads/single`, {
                method: 'POST',
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    setBlogInfo({
                        ...blogInfo,
                        image: data.url
                    })
                })
                .catch(err => {
                    toast({ title: "Failed!", message: `Failed at: ${err}`, type: "error", duration: 3000 });
                    console.log(TAG + ': ' + err)
                })
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