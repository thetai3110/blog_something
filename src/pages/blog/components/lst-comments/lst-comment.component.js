import { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import app from '../../../../firebase';
import { setLstComments } from '../../../../redux/comment/comment.actions';
import './lst-comment.component.css';
import ComposerEditText from '../composer-edittext/composer-edittext.component';
import Comment from '../comment/comment';
import $ from 'jquery';

const Loading = () => (
    <div style={{ textAlign: 'center', width: '100%' }}>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

const LstComments = ({ lstComments, setLstComments, idBlog }) => {
    useEffect(() => {
        // Find comments
        setLstComments([]);
        const db = app.database().ref(`Blogs/${idBlog}/comments`);
        db.on('value', (snap) => {
            if (snap.val() !== null) {
                let lstCmt = Object.keys(snap.val()).map(val => {
                    return { idCmt: val, value: snap.val()[val] }
                })
                setLstComments(lstCmt);
            }
        });
    }, [])
    return (
        <div id="list-comments">
            <div className="cmt-content">
                {lstComments ? lstComments.map((el, i) => {
                    return <LazyLoad key={i} className="cmt" placeholder={<Loading />}>
                        <Comment comment={el.value} showWithId={el.idCmt}/>
                        <div className="feedback">
                            {typeof el.value.feedback !== 'undefined' ?
                                Object.keys(el.value.feedback).map((elm, i) => {
                                    return <div key={i} className="cmt">
                                        <Comment comment={el.value.feedback[elm]} showWithId={elm}/>
                                        <div id={elm} className="feedback-feedback">
                                            <ComposerEditText typeComment={false} idComment={el.idCmt} idBlog={idBlog} />
                                        </div>
                                    </div>
                                }) : <div></div>
                            }
                        </div>
                        <div id={el.idCmt} className="feedback-feedback">
                            <ComposerEditText typeComment={false} idComment={el.idCmt} idBlog={idBlog} />
                        </div>
                    </LazyLoad>
                }) : null}
            </div>
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