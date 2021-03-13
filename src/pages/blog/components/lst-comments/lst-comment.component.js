import { useEffect } from 'react';
import { connect } from 'react-redux';
import Comments from '../../../../components/comment/comment.component';
import app from '../../../../firebase';
import { setLstComments } from '../../../../redux/comment/comment.actions';
import './lst-comment.component.css';
const LstComments = ({ lstComments, setLstComments }) => {
    useEffect(() => {
        const db = app.database().ref('Comments').limitToFirst(5)
        db.on('value', (snap) => {
            setLstComments(snap.val());
        });
    }, [])
    return (
        <div className="list-comments">
            {lstComments ? Object.keys(lstComments).map((el, i) => {
                return <div key={i} className="cmt">
                    <div className="comments-user">
                        <img src={lstComments[el].avatar} alt={lstComments[el].avatar}></img>
                        <div className="comments-content">
                            <h6>{lstComments[el].user}</h6>
                            <p>{lstComments[el].content}</p>
                            <div className="comments-action">
                                <span className="action">Thích</span>
                                <label className="action" htmlFor={el}>Phản hồi</label>
                                <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                            </div>
                        </div>
                    </div>
                    <div className="cmt-feedback">
                        {
                            typeof lstComments[el].feedback !== 'undefined' ?
                                Object.keys(lstComments[el].feedback).map((elm, i) => {
                                    return <div key={i} className="cmt">
                                        <div className="comments-user">
                                            <img src={lstComments[el].feedback[elm].avatar} alt={lstComments[el].feedback[elm].avatar}></img>
                                            <div className="comments-content">
                                                <h6>{lstComments[el].feedback[elm].user}</h6>
                                                <p>{lstComments[el].feedback[elm].content}</p>
                                                <div className="comments-action">
                                                    <span className="action">Thích</span>
                                                    <label className="action" htmlFor={el}>Phản hồi</label>
                                                    <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }) : <div></div>
                        }
                    </div>
                    <input type="checkbox" name="feedback" className="feedbackCK" id={el}></input>
                    <div className="feedback">
                        <Comments typeComment={false} keyComment={el} />
                    </div>
                </div>
            }) : null}
        </div>
    )
}

const mapStateToProps = ({ comment }) => ({
    lstComments: comment.lstComments
})

const mapDispatchToProps = dispatch => ({
    setLstComments: comments => dispatch(setLstComments(comments))
})

export default connect(mapStateToProps, mapDispatchToProps)(LstComments);