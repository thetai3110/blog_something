import { Link } from 'react-router-dom';
import java from '../../../../assests/java.png';
import './course-item.component.css';
import { themes } from '../../../../themes/themes';

const CourseItemComponent = ({ theme }) => {

    return (
        <div className="item" style={themes[theme].item_border}>
            <div className="hoverimg"><Link to="/"><img src={java} alt=""></img></Link></div>
            <div className="title"><h2><Link style={themes[theme].item_title} to="/">Lập trình hướng đối tượng trong Java</Link></h2></div>
            <div className="detail"><p style={themes[theme].item_info}>Java là một ngôn ngữ lập trình được lập trình viên (nhà phát triển) sử dụng để viết ứng dụng dành cho máy tính mà chúng ta sử dụng hàng ngày. Nếu chỉ đơn thuần là một ngôn ngữ lập trình thì chúng ta không cần quan tâm tới nó nhưng vấn đề là đôi khi chúng ta tải một ứng dụng, một phần mềm nào đó mà máy tính yêu cầu thực thi Java...</p></div>
        </div>
    )
}

export default CourseItemComponent;