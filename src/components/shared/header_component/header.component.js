import './hearder.component.css';
import logo from '../../../logo.svg';
import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts/auth_context';

const HeaderComponent = () => {
    const { currentUser } = useAuth()
    const login = currentUser ? { id: '7', title: 'logout', title_en: 'logout' } : { id: '6', title: 'login', title_en: 'login' }
    const menus = [
        { id: '1', title: 'học tập', title_en: 'learn' },
        { id: '2', title: 'thảo luận', title_en: 'discuss' },
        { id: '3', title: 'blog', title_en: 'blog' },
        { id: '4', title: 'code online', title_en: 'code-online' },
        { id: '5', title: 'admin', title_en: 'admin' },
        {...login}
    ]
    return (
        <nav className="navbar">
            <label htmlFor="navbar-checked" className="navbar-btn-menu"><i className="fa fa-bars"></i></label>
            <div className="navbar-pc">
                <div className="navbar-logo">
                    <Link to="/"><img src={logo} alt="log"></img></Link>
                    <Link to="/">Blog</Link>
                </div>
                <ul className="navbar-list">
                    {menus.map((item) => {
                        return <li key={item.id}><Link to={"/" + item.title_en} className="navbar-link">{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                    })}
                </ul>
                <div className="navbar-items">
                    <form className="navbar-search">
                        <input value="" onChange={() => { }} placeholder="Nhập nội dung tìm kiếm"></input>
                        <button><i className="fa fa-search"></i></button>
                    </form>
                    <div><i className="fa fa-facebook-square"></i></div>
                    <div><i className="fa fa-twitter-square"></i></div>
                </div>
            </div>
            <input className="navbar-checked" type="checkbox" hidden id="navbar-checked" name="navbar-checked"></input>
            <label className="navbar-overlap" htmlFor="navbar-checked"></label>
            <div className="navbar-mb">
                <label htmlFor="navbar-checked" className="navbar-mb-btn-close">
                    <i className="fa fa-close"></i>
                </label>
                <div className="navbar-mb-logo">
                    <Link to="/"><img src={logo} alt="log"></img></Link>
                    <Link to="/">Blog</Link>
                </div>
                <form className="navbar-mb-search">
                    <input value="" onChange={() => { }} placeholder="Nhập nội dung tìm kiếm"></input>
                    <button><i className="fa fa-search"></i></button>
                </form>
                <ul className="navbar-mb-list">
                    {menus.map((item) => {
                        return <li key={item.id}><Link to={"/" + item.title_en} className="navbar-link">{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                    })}
                </ul>
                <div className="navbar-mb-items">
                    <div><i className="fa fa-facebook-square"></i></div>
                    <div><i className="fa fa-twitter-square"></i></div>
                </div>
            </div>
        </nav>
    )
}

export default HeaderComponent;