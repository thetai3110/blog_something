import { useAuth } from '../../../../contexts/auth_context';
import MyselfMenu from '../myself-menu/myself-menu.component';
import './btn-myself.css';
import { setHideMyselfButton } from '../../../../redux/common/common.actions';
import { connect } from 'react-redux';
const BtnMyself = ({hiddenMyselfButton, setHiddenMyselfButton}) => {
    const { currentUser } = useAuth();
    return (
        <>
            {!hiddenMyselfButton ? <div id="overlap-when-show-myselfmenu" onClick={() => setHiddenMyselfButton(!hiddenMyselfButton)}></div> : null}
            {currentUser ?
                <div className="myself-actions">
                    <button className="btn-myself" onClick={() => setHiddenMyselfButton(!hiddenMyselfButton)}>
                        <img src={currentUser.photoURL} alt="avatar"></img>
                    </button>
                    {!hiddenMyselfButton ? <MyselfMenu /> : null}
                </div>
                : null}
        </>
    )
}

const mapStateToProps = ({ common }) => ({
    hiddenMyselfButton: common.hiddenMyselfButton
})

const mapDispatchToProps = (dispatch) => ({
    setHiddenMyselfButton: (hidden) => dispatch(setHideMyselfButton(hidden))
})
export default connect(mapStateToProps, mapDispatchToProps)(BtnMyself);