import './hearder.component.css';
import logo from '../../../logo.svg';
import flag_vi from '../../../assests/flag_vi.png';
// import flag_en from '../../../assests/flag_en.png'
// import user from '../../../assests/user.png';
import { Link } from "react-router-dom";

const HeaderComponent = () => {
    const menus = [
        { id: '1', title: 'học tập', title_en: 'learn' },
        // { id: '2', title: 'luyện tập', title_en: 'practive' },
        { id: '3', title: 'thảo luận', title_en: 'discuss' },
        // { id: '4', title: 'đánh giá', title_en: 'evaluate' },
        { id: '5', title: 'blog', title_en: 'blog' },
        { id: '6', title: 'code online', title_en: 'code-online' },
        { id: '7', title: 'admin', title_en: 'admin' }
    ]
    return (
        <nav className="navbar navbar-expand-lg navbar-light header">
            <img className="image" src={logo} alt=""></img>
            <Link to="/" className="navbar-brand menu-item">Online learning</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {menus.map((item) => {
                        return <Link to={"/" + item.title_en} className="nav-link" key={item.id}><li>{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</li></Link>
                    })}
                </ul>
                <div className="right">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="navbar-brand menu-item">
                                <img className="image" src={flag_vi} alt=""></img>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/" className="dropdown-item">Tiếng việt</Link>
                                <Link to="/" className="dropdown-item">Tiếng anh</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/">Something else here</Link>
                            </div>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="navbar-brand menu-item">
                                <img className="image" src={user} alt=""></img>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/" className="dropdown-item">Tiếng việt</Link>
                                <Link to="/" className="dropdown-item">Tiếng anh</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/">Something else here</Link>
                            </div>
                        </li> */}
                    </ul>
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default HeaderComponent;