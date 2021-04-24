import './footer.component.css';
import logo from '../../logo.svg';
import { Link } from "react-router-dom";
import { themes } from '../../themes/themes';
const FooterComponent = ({ theme }) => {
    return (
        <div style={themes[theme].footer}>
            <footer className="grid wide">
                <div className="row">
                    <div className="col l-6 md-12 c-12">
                        <div className="footer-left">
                            <Link to="/"><img src={logo} alt=""></img></Link>
                            <p style={themes[theme].link_navbar}>Đây là một trang web mà ở đó mọi người có tự học rất nhiều ngôn ngữ khác nhau và trao đổi kiến thức với nhau về lập trình.</p>
                            <ul>
                                <li className="fb"><Link style={themes[theme].link_navbar} to="/"><i className="fa fa-facebook-square"></i></Link></li>
                                <li className="tw"><Link style={themes[theme].link_navbar} to="/"><i className="fa fa-twitter-square"></i></Link></li>
                                <li className="gl"><Link style={themes[theme].link_navbar} to="/"><i className="fa fa-google"></i></Link></li>
                                <li className="ytb"><Link style={themes[theme].link_navbar} to="/"><i className="fa fa-youtube-square"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col l-2 md-4 c-4">
                        <div className="footer-center">
                            <div className="heading"><h2>Liên kết</h2></div>
                            <div className="content">
                                <ul>
                                    <li><Link style={themes[theme].link_navbar} to="/" className="link">Học tập</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Luyện tập</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Thử thách</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Đánh giá</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2 md-4 c-4">
                        <div className="footer-center">
                            <div className="heading"><h2>Thông tin</h2></div>
                            <div className="content">
                                <ul>
                                    <li><Link style={themes[theme].link_navbar} to="/" className="link">Chia sẻ</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Về chúng tôi</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Điều khoản sử dụng</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col l-2 md-4 c-4">
                        <div className="footer-center">
                            <div className="heading"><h2>Trợ giúp</h2></div>
                            <div className="content">
                                <ul>
                                    <li><Link style={themes[theme].link_navbar} to="/" className="link">Hỗ trợ</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Thảo luận</Link></li>
                                    <li className=""><Link style={themes[theme].link_navbar} to="/" className="link">Liên hệ</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default FooterComponent;