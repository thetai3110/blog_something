import { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import Comments from '../../../../components/comment/comment.component';
import app from '../../../../firebase';
import { setLstComments } from '../../../../redux/comment/comment.actions';
import './lst-comment.component.css';

const Loading = () => (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

const LstComments = ({ lstComments, setLstComments, idBlog }) => {
    useEffect(() => {
        const db = app.database().ref('Comments');
        db.on('value', (snap) => {
            if (snap.val() !== null) {
                // setLstComments(snap.val());
                let arr = Object.keys(snap.val()).filter((val) => {
                    return snap.val()[val].id === idBlog
                })
                let lstCmt = arr.map(val => {
                    return { idCmt: val, value: snap.val()[val] }
                })
                setLstComments(lstCmt);
            }
        });
    }, [])
    if (lstComments.length > 0)
        return (
            <div className="list-comments">
                <div className="cmt-content">
                    {lstComments ? lstComments.map((el, i) => {
                        return <LazyLoad key={i} className="cmt" placeholder={<Loading />}>
                            <div className="comments-user">
                                <img src={el.value.avatar} alt={el.value.avatar}></img>
                                <div className="comments-content">
                                    <h6>{el.value.user}</h6>
                                    <p>{el.value.content}</p>
                                    <div className="comments-action">
                                        <span className="action">Thích</span>
                                        <label className="action" htmlFor={el.idCmt}>Phản hồi</label>
                                        <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cmt-feedback">
                                {
                                    typeof el.value.feedback !== 'undefined' ?
                                        Object.keys(el.value.feedback).map((elm, i) => {
                                            return <div key={i} className="cmt">
                                                <div className="comments-user">
                                                    <img src={el.value.feedback[elm].avatar} alt={el.value.feedback[elm].avatar}></img>
                                                    <div className="comments-content">
                                                        <h6>{el.value.feedback[elm].user}</h6>
                                                        <p>{el.value.feedback[elm].content}</p>
                                                        <div className="comments-action">
                                                            <span className="action">Thích</span>
                                                            <label className="action" htmlFor={el.idCmt}>Phản hồi</label>
                                                            <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> 2</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }) : <div></div>
                                }
                            </div>
                            <input type="checkbox" name="feedback" className="feedbackCK" id={el.idCmt}></input>
                            <div className="feedback">
                                <Comments typeComment={false} keyComment={el.idCmt} />
                            </div>
                        </LazyLoad>
                    }) : null}
                </div>
            </div>
        )
    else return null
}

const mapStateToProps = ({ comment }) => ({
    lstComments: comment.lstComments
})

const mapDispatchToProps = dispatch => ({
    setLstComments: comments => dispatch(setLstComments(comments))
})

export default connect(mapStateToProps, mapDispatchToProps)(LstComments);