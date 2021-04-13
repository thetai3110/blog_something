import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/auth_context';
import './person-menu.component.css';

const PersonMenu = () => {
    const { currentUser } = useAuth();
    return (
        <div className="person-menu">
            <div className="person-info">
                <div className="person-edit">
                    <div><img src={currentUser.photoURL} alt=""></img></div>
                    <div className="person-edit-action">
                        <Link to='/'>{currentUser.displayName}</Link>
                        <Link to='/'>
                            <button>Sửa</button>
                        </Link>
                    </div>
                </div>
                <ul className="log">
                    <li><Link to="/">Hồ sơ</Link></li>
                    <li><Link to="/">Bài đăng</Link></li>
                    <li><Link to="/">Hoạt động</Link></li>
                </ul>
                <div className="person-logout"><Link to="/">Đăng xuất</Link></div>
            </div>
        </div>
    )
}

export default PersonMenu;