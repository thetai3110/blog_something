import "./comment.component.css";
import { Picker } from 'emoji-mart';
import avatar from '../../assests/avatar.jpg';
import { useRef } from "react";
import { CommentService } from "../../services/comment.service";
import { useAuth } from "../../contexts/auth_context";

const Comments = (props) => {
    const TAG = 'Comments';
    const commentRef = useRef(null)
    const emojiRef = useRef(null);
    const { currentUser } = useAuth();
    const handleShowEmoji = (e) => {
        let status = emojiRef.current.style.display === 'none' ? false : true;
        if (status) emojiRef.current.style.display = 'none'
        else emojiRef.current.style.display = 'block'
    }
    const handleComment = async (typeComment, e) => {
        try {
            let comment = commentRef.current.value;
            if (typeComment) {
                if (comment !== '') {
                    await CommentService.newComment(props.id, currentUser.displayName, comment, currentUser.photoURL);
                    commentRef.current.value = '';
                }
            } else {
                if (comment !== '') {
                    await CommentService.newFeedback(props.keyComment, currentUser.displayName, comment, currentUser.photoURL);
                    commentRef.current.value = '';
                    e.target.closest('.feedback').previousSibling.checked = false
                }
            }
        } catch (error) {
            console.log(TAG + ": " + error)
        }
    }
    const handleCancel = (e) => {
        e.target.closest('.feedback').previousSibling.checked = false
    }
    return (
        <>
            <div className="comment">
                <div className="comment-avatar">
                    <img src={currentUser !== null ? currentUser.photoURL : avatar} alt={currentUser !== null ? currentUser.photoURL : ''}></img>
                </div>
                <div className="comment-type">
                    <textarea ref={commentRef} placeholder="Thêm bình luận" id="comment-input" onInput={() => {
                        commentRef.current.style.height = 'auto';
                        commentRef.current.style.height = commentRef.current.scrollHeight + "px";
                    }} name="nowrap" rows="2" wrap="soft"></textarea>
                    <div className="comment-option">
                        <span onClick={handleShowEmoji}><i className="fa fa-smile-o" aria-hidden="true"></i></span>
                    </div>
                    <div className="emoji-picker" ref={emojiRef} >
                        <Picker onSelect={(emoji, e) => {
                            commentRef.current.value = commentRef.current.value + emoji.native;
                        }} />
                    </div>
                </div>
            </div>
            <div className="send">
                {!props.typeComment ? <button onClick={handleCancel} className="btn btn-primary">Hủy</button> : ''}
                <button className="btn btn-primary" onClick={(e) => handleComment(props.typeComment, e)}>Bình luận</button>
            </div>
        </>
    )
}

export default Comments;