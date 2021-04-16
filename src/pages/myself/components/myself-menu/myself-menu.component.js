import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/auth_context';
import './myself-menu.component.css';

const MyselfMenu = () => {
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
                    <li><Link to="/myself">Bài đăng</Link></li>
                    <li><Link to="/">Hoạt động</Link></li>
                </ul>
                <div className="option-logout"><Link to="/logout">Đăng xuất</Link></div>
            </div>
        </div>
    )
}

export default MyselfMenu;