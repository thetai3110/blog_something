import { Link } from 'react-router-dom';
import java from '../../../../assests/java.png';
import './courseitem.component.css';

const CourseItemComponent = () => {

    return (
        <div className="item">
            <div className="hoverimg"><Link to="/"><img src={java} alt=""></img></Link></div>
            <div className="title"><h2><Link to=",">Lập trình hướng đối tượng trong Java</Link></h2></div>
            <div className="detail"><p>Java là một ngôn ngữ lập trình được lập trình viên (nhà phát triển) sử dụng để viết ứng dụng dành cho máy tính mà chúng ta sử dụng hàng ngày. Nếu chỉ đơn thuần là một ngôn ngữ lập trình thì chúng ta không cần quan tâm tới nó nhưng vấn đề là đôi khi chúng ta tải một ứng dụng, một phần mềm nào đó mà máy tính yêu cầu thực thi Java...</p></div>
            <div className="footer">
                <table>
                    <tbody>
                        <tr>
                            <td><i className="fa fa-eye"></i> 100</td>
                            <td className="center"><i className="far fa-clock"></i> 40:00</td>
                            <td><Link className="btn btn-outline-info link" to="/">Học ngay</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CourseItemComponent;