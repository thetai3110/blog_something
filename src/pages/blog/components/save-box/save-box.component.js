import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toast } from '../../../../components/toast/toast.component';
import { useAuth } from '../../../../contexts/auth_context';
import { setBlogInfo, setFilename, toggleSaveBox } from '../../../../redux/blog/blog_actions';
import { BlogService } from '../../../../services/blog.service';
import './save-box.component.css';

const SaveBlogBox = ({ blogInfo, setBlogInfo, setFileName, toggleSaveBox, history, location, id }) => {
    const TAG = 'SaveBlogBox';
    const { currentUser } = useAuth();
    const { title, summary, image, content, tags } = blogInfo;
    // Validate
    const validate = () => {
        if (title !== '&nbsp;' && content !== '' && summary !== '' && image !== '') return true;
        return false;
    }
    // Clear
    const clearAll = () => {
        setBlogInfo({ summary: '', content: '', image: '', title: '', tags: [] });
        setFileName('');
        toggleSaveBox(true);
    }
    // Submit all
    const handleCreate = (publish) => {
        if (validate()) {
            (async function () {
                try {
                    if (location.pathname === "/create-blog") {
                        const now = new Date();
                        const data = {
                            author: {
                                name: currentUser.displayName,
                                email: currentUser.email,
                                uid: currentUser.uid
                            },
                            title: title,
                            summary: summary,
                            content: content,
                            image: image,
                            tags: tags,
                            published: publish,
                            lastModify: now.toLocaleDateString() + ", " + now.toLocaleTimeString(),
                            comments: [],
                        }
                        await BlogService.create(data)
                    } else {
                        const now = new Date();
                        const data = {
                            title: title,
                            summary: summary,
                            content: content,
                            image: image,
                            tags: tags,
                            published: publish,
                            lastModify: now.toLocaleDateString() + ", " + now.toLocaleTimeString(),
                        }
                        await BlogService.modify(data, id);
                    }
                    clearAll();
                    toast({ title: "Success!", message: "A new blog added.", type: "success", duration: 2000 });
                    setTimeout(() => {
                        history.replace('/blog');
                    }, 2000)
                } catch (err) {
                    toast({ title: "Failed!", message: `Failed at: ${err}`, type: "error", duration: 3000 });
                    console.log(TAG + ': ' + err);
                }
            })();
        } else {
            toast({
                title: "Warning!",
                message: `Please fill all fields (${image === '' ? 'image, ' : ''} ${title === '&nbsp;' ? 'title, ' : ''} ${content === '' ? 'content, ' : ''} ${summary === '' ? 'summary' : ''}).`,
                type: "warning",
                duration: 3000
            });
        }
    }
    return (
        <div className="save-box" id="save-box">
            <h6>Công khai bài viết</h6>
            <p>Lựa chọn:</p>
            <div className="save-option">
                <input type="radio" name="save" id="public" defaultChecked={false}></input><label htmlFor="public">Công khai</label><br></br>
                <input type="radio" name="save" id="private" defaultChecked={false}></input><label htmlFor="private">Riêng tư</label><br></br>
                <input type="radio" name="save" id="draft" defaultChecked={true}></input><label htmlFor="draft">Draft</label>
                <hr></hr>
                <div className="option-description" id="public-description">
                    <p>Tất cả mọi người đều có thể nhìn thấy bài viết này.</p>
                    <button className="btn btn-primary" onClick={() => handleCreate(1)}>Công khai</button>
                </div>
                <div className="option-description" id="private-description">
                    <p>Chỉ có bạn mới có thể nhìn thấy bài viết này. Bạn có thể công khai nó bất cứ khi nào.</p>
                    <button className="btn btn-primary" onClick={() => handleCreate(2)}>Riêng tư</button>
                </div>
                <div className="option-description" id="draft-description">
                    <p>Lưu nháp nếu bạn chưa hoàn thành bài viết này và muốn chỉnh sửa tiếp.</p>
                    <button className="btn btn-primary" onClick={() => handleCreate(0)}>Lưu nháp</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
    setFileName: name => dispatch(setFilename(name)),
    toggleSaveBox: () => dispatch(toggleSaveBox())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveBlogBox));