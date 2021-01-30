import './topic.component.css';
import user from '../../../assests/user.png';
import { faChevronCircleDown, faChevronCircleUp, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const Topic = () => {
    return (
        <div className="topic">
            <div className="user">
                <Link to="/"><img src={user} alt=""></img></Link><br></br>
                <button><FontAwesomeIcon icon={faChevronCircleUp} /></button> <span>0</span> <br></br>
                <button><FontAwesomeIcon icon={faChevronCircleDown} /></button> <span>0</span>
            </div>
            <div className="content">
                <h5><Link className="title-topic" to="/">Cách tìm bảng mã asciil</Link></h5>
                <p className="question">Mn cho mình hỏi: Làm thế nào để tìm đc bảng mã ascii trong Codeblock ạ. ThanksMn cho mình hỏi: Làm thế nào để tìm đc bảng mã ascii trong Codeblock ạ. ThanksMn cho mình hỏi: Làm thế nào để tìm đc bảng mã ascii trong Codeblock ạ. ThanksMn cho mình hỏi: Làm thế nào để tìm đc bảng mã ascii trong Codeblock ạ. Thanks</p>
                <p className="request">By  
                    <span><Link to="/">nhunguyen421@gmail.com</Link></span>
                    <span>Cập nhật lần cuối: 6 ngày trước</span>
                </p>
                <div className="tag">
                    <div>C++</div>
                    <div>bảng mã ascii</div>
                </div>
            </div>
            <div className="chat">
                <Link className="chat-link" to="/"><FontAwesomeIcon icon={faCommentDots} /></Link>
                <span> 0</span>
            </div>
        </div>
    )
}

export default Topic;