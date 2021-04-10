import { connect } from 'react-redux';
import { toggleSaveBox } from '../../../../redux/blog/blog_actions';
import './actions.component.css';
import SaveBlogBox from '../save-box/save-box.component';
const ActionsBlog = ({ hiddenSave, toggleSaveBox }) => {
    return (
        <div className="actions">
            <button className="btn btn-secondary" data-toggle="modal" data-target=".bd-modal-preview">Xem trước <i className="fa fa-eye"></i></button>
            <div className="save-blog">
                <button className="btn btn-secondary" onClick={toggleSaveBox}>Xong <i className="fa fa-chevron-down" aria-hidden="true"></i></button>
                {hiddenSave ? null : <SaveBlogBox />}
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    hiddenSave: blog.hiddenSave
})

const mapDispatchToProps = dispatch => ({
    toggleSaveBox: () => dispatch(toggleSaveBox())
})
export default connect(mapStateToProps, mapDispatchToProps)(ActionsBlog);