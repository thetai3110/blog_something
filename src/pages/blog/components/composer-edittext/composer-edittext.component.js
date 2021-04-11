import "./composer-edittext.component.css";
import { Picker } from 'emoji-mart';
import avatar from '../../../../assests/avatar.jpg';
import { useEffect, useRef } from "react";
import { CommentService } from "../../../../services/comment.service";
import { useAuth } from "../../../../contexts/auth_context";
import { setHiddenEmoji } from "../../../../redux/comment/comment.actions";
import { connect } from "react-redux";
import $ from 'jquery';

const ComposerEditText = (props) => {
    const TAG = 'Comments';
    const commentRef = useRef(null)
    const emojiRef = useRef(null);
    const { currentUser } = useAuth();
    const handleComment = async (typeComment) => {
        try {
            let comment = commentRef.current.value;
            if (typeComment) {
                if (comment !== '') {
                    await CommentService.newComment(currentUser.displayName, comment, currentUser.photoURL, props.idBlog);
                    commentRef.current.value = '';
                }
            } else {
                if (comment !== '') {
                    await CommentService.newFeedback(props.idBlog, props.idComment, currentUser.displayName, comment, currentUser.photoURL);
                    commentRef.current.value = '';
                }
            }
        } catch (error) {
            console.log(TAG + ": " + error)
        }
    }
    const handleShowEmoji = (e) => {
        const id = "#emoji" + props.showWithId;
        if ($(id).css("display") === "none") {
            $('.emoji-picker').css("display", "none");
            $(id).css("display", "block");
        }
        else
            $(id).css("display", "none");
        // if ($(id)[0].getBoundingClientRect().top < 0) {
        //     $(id).css('top', '100%');
        // } else if ($(id)[0].getBoundingClientRect().top >= $(id)[0].offsetHeight) {
        //     $(id).css('bottom', '100%');
        // }
    }
    const handleCancel = (e) => {
        $('.feedback-feedback').css("display", "none");
    }
    useEffect(() => {
        // window.addEventListener('scroll', handleScroll);
        // // $('#list-comments').on("scroll", handleScroll1)
        // return function clean() {
        //     window.removeEventListener('scroll', handleScroll);
        // }
    })
    // const handleScroll = () => {
    //     const id = "#emoji" + props.showWithId;
    //     console.log(($(id)[0].getBoundingClientRect().top + $(id)[0].offsetHeight) + " - " + window.innerHeight)
    //     if ($(id)[0].getBoundingClientRect().top < 0) {
    //         $(id).css('top', '100%');
    //     } else if (($(id)[0].getBoundingClientRect().top + $(id)[0].offsetHeight) > window.innerHeight) {
    //         $(id).css('bottom', '100%');
    //     }
    // }
    // const handleScroll1 = () => {
    //     const id = "#emoji" + props.showWithId;
    //     if (($(id)[0].offsetTop - $("#list-comments")[0].offsetTop) < 0) {
    //         $(id).css('top', '100%');
    //     } else if (($(id)[0].offsetTop - $("#list-comments")[0].offsetTop) >= $("#list-comments")[0].scrollHeight) {
    //         $(id).css('bottom', '100%');
    //     }
    // }
    return (
        <>
            <div className="composer-edittext">
                <div className="composer-edittext-avatar">
                    <img src={currentUser !== null ? currentUser.photoURL : avatar} alt={currentUser !== null ? currentUser.photoURL : ''}></img>
                </div>
                <div className="composer-edittext-type">
                    <textarea ref={commentRef} placeholder="Thêm bình luận" id="composer-edittext-input" onInput={() => {
                        commentRef.current.style.height = 'auto';
                        commentRef.current.style.height = commentRef.current.scrollHeight + "px";
                    }} name="nowrap" rows="2" wrap="soft"></textarea>
                    <div className="composer-edittext-option">
                        <span onClick={handleShowEmoji}><i className="fa fa-smile-o" aria-hidden="true"></i></span>
                        <div className="emoji-picker" ref={emojiRef} id={`emoji${props.showWithId}`}>
                            <Picker onSelect={(emoji) => {
                                commentRef.current.value = commentRef.current.value + emoji.native;
                            }} />
                        </div>
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

const mapStateToProps = ({ comment }) => ({
    hiddenEmoji: comment.hiddenEmoji
})

const mapDispatchToProps = (dispatch) => ({
    setHiddenEmoji: () => dispatch(setHiddenEmoji())
})
export default connect(mapStateToProps, mapDispatchToProps)(ComposerEditText);