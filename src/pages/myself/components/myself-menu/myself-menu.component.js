import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useAuth } from '../../../../contexts/auth_context';
import { setHideMyselfButton } from '../../../../redux/common/common.actions';
import './myself-menu.component.css';

const MyselfMenu = ({ history, dispatch }) => {
    const { currentUser } = useAuth();
    return (
        <div className="myself-wrap">
            <div className="myself-menu">
                <div className="avatar">
                    <div><img src={currentUser.photoURL} alt=""></img></div>
                    <div className="action">
                        <Link to='/'>{currentUser.displayName}</Link>
                        <Link to='/'>
                            <button>Sửa</button>
                        </Link>
                    </div>
                </div>
                <ul className="options">
                    <li><Link to="/">Hồ sơ</Link></li>
                    <li><a href="#" onClick={()=> {
                        history.push('/myself/draft');
                        dispatch(setHideMyselfButton(true))
                    }} >Bài đăng</a></li>
                    <li><Link to="/">Hoạt động</Link></li>
                </ul>
                <div className="option-logout"><Link to="/logout">Đăng xuất</Link></div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ common }) => ({
    hiddenMyselfButton: common.hiddenMyselfButton
})

export default withRouter(connect(mapStateToProps)(MyselfMenu));