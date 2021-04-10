import './comment.css';

const Comment = ({ comment }) => {
    const handleFeedback = (e) => {
        console.log(e)
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