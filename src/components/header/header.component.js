import './hearder.component.css';
import logo from '../../logo.svg';
import { Link, withRouter } from "react-router-dom";
import { useAuth } from '../../contexts/auth_context';
import { connect } from 'react-redux';
import { changeTheme } from '../../redux/themes/themes.action';
import { themes, ThemesToggler } from '../../themes/themes';
import BtnMyself from '../../pages/myself/components/btn-myself/btn-myself';

const HeaderComponent = ({ changeTheme, theme }) => {
    const { currentUser } = useAuth();
    const menus = [
        // { id: '1', title: 'học tập', title_en: 'learn' },
        // { id: '2', title: 'thảo luận', title_en: 'discuss' },
        { id: '3', title: 'blog', title_en: 'blogs' },
        // { id: '5', title: 'admin', title_en: 'admin' },
        { id: '6', title: 'đăng nhập', title_en: 'login' },
    ]
    return (
        <div className="navbar" style={themes[theme].nav}>
            <nav className="grid wide">
                <div className="nav-content">
                    <label htmlFor="navbar-checked" className="navbar-btn-menu"><i className="fa fa-bars"></i></label>
                    <div className="navbar-pc">
                        <div className="navbar-logo">
                            <Link to="/"><img src={logo} alt="log"></img></Link>
                            <Link to="/" style={themes[theme].link}>Blog</Link>
                        </div>
                        <ul className="navbar-list">
                            {menus.map((item) => {
                                if (item.id === '6') {
                                    return !currentUser ? <li key={item.id}><Link style={themes[theme].link} to={"/" + item.title_en} className="navbar-link">{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                                        : null
                                } else
                                    return <li key={item.id}><Link style={themes[theme].link} to={"/" + item.title_en} className="navbar-link">{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                            })}
                        </ul>
                        <div className="navbar-items">
                            <span className="edit">
                                <Link to="/blog/create" style={themes[theme].link}>{currentUser ? <i style={{ fontSize: '22px' }} className="fa fa-pencil" aria-hidden="true"></i> : ''}</Link>
                                <ThemesToggler
                                    theme={theme}
                                    onClick={(nextTheme) => changeTheme(nextTheme)} />
                            </span>
                            <form className="navbar-search">
                                <input value="" onChange={() => { }} placeholder="Nhập nội dung tìm kiếm"></input>
                                <button><i className="fa fa-search"></i></button>
                            </form>
                            <span className="social">
                                {/* <div><i className="fa fa-facebook-square"></i></div>
                        <div><i className="fa fa-twitter-square"></i></div> */}
                                <BtnMyself />
                            </span>
                        </div>
                    </div>
                    <input className="navbar-checked" type="checkbox" hidden id="navbar-checked" name="navbar-checked"></input>
                    <label className="navbar-overlap" htmlFor="navbar-checked"></label>
                    <div className="navbar-mb" style={themes[theme].nav}>
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
                                if (item.id === '6') {
                                    return !currentUser ? <li key={item.id}><Link style={themes[theme].link} to={"/" + item.title_en} className="navbar-link">{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                                        : null
                                } else
                                    return <li key={item.id}><Link style={themes[theme].link} to={"/" + item.title_en} className="navbar-link">{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                            })}
                        </ul>
                        <div className="navbar-mb-items">
                            <div><i className="fa fa-facebook-square"></i></div>
                            <div><i className="fa fa-twitter-square"></i></div>
                        </div>
                    </div>
                </div>
            </nav >
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    changeTheme: (theme) => dispatch(changeTheme(theme))
})
export default withRouter(connect(null, mapDispatchToProps)(HeaderComponent));