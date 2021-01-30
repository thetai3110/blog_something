import './footer.component.css';
import logo from '../../../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlus, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
const FooterComponent = () => {
    return (
        <div>
            <footer>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 col-12">
                        <div className="footer-left">
                            <a href=""><img src={logo}></img></a>
                            <p>Đây là một trang web mà ở đó mọi người có tự học rất nhiều ngôn ngữ khác nhau và trao đổi kiến thức với nhau về lập trình.</p>
                            <ul>
                                <li className="fb"><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
                                <li className="tw"><a href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                                <li className="gl"><a href=""><FontAwesomeIcon icon={faGooglePlus} /></a></li>
                                <li className="ytb"><a href=""><FontAwesomeIcon icon={faYoutube} /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4">
                        <div className="footer-center">
                            <div className="heading"><h2>Liên kết</h2></div>
                            <div className="content">
                                <ul>
                                    <li><Link to="/" className="link">Học tập</Link></li>
                                    <li className=""><Link to="/" className="link">Luyện tập</Link></li>
                                    <li className=""><Link to="/" className="link">Thử thách</Link></li>
                                    <li className=""><Link to="/" className="link">Đánh giá</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-4 col-4">
                        <div className="footer-center">
                            <div className="heading"><h2>Thông tin</h2></div>
                            <div className="content">
                                <ul>
                                    <li><Link to="/" className="link">Chia sẻ</Link></li>
                                    <li className=""><Link to="/" className="link">Về chúng tôi</Link></li>
                                    <li className=""><Link to="/" className="link">Điều khoản sử dụng</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="ccol-xl-2 col-lg-2 ol-md-4 col-sm-4 col-xs-4 col-4">
                        <div className="footer-center">
                            <div className="heading"><h2>Trợ giúp</h2></div>
                            <div className="content">
                                <ul>
                                    <li><Link to="/" className="link">Hỗ trợ</Link></li>
                                    <li className=""><Link to="/" className="link">Thảo luận</Link></li>
                                    <li className=""><Link to="/" className="link">Liên hệ</Link></li>
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