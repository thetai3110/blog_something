import './comment.css';
import $ from 'jquery';

const Comment = ({ comment, showWithId }) => {
    const handleFeedback = (e) => {
        // Scroll body
        $(window).scrollTop($("#list-comments")[0].offsetTop);

        // Scroll comment
        const id = "#" + showWithId;
        $('.feedback-feedback').css("display", "none");
        $(id).css("display", "block");
        $('#list-comments').animate({
            scrollTop: $(id)[0].offsetTop - $("#list-comments")[0].offsetTop - $(id).height()
        }, 1000);
        // Select textarea
        let composer = $(id).children()[0];
        let containEdit = $(composer).children()[1];
        $(containEdit).children()[0].focus();
    }
    return (
        <div className="comment">
            <img src={comment.avatar} alt={comment.avatar}></img>
            <div className="comment-content">
                <h6>{comment.user}</h6>
                <p>{comment.content}</p>
                <div className="comment-action">
                    <span className="action">Thích</span>
                    <label className="action" onClick={handleFeedback}>Phản hồi</label>
                    <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                </div>
            </div>
        </div>
    )
}

export default Comment;