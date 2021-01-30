import './discuss_page.css';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pageLayoutDefault } from "../../components/higer_order/page-layout-default";
import Search from "../../components/shared/search_conponent/search.component";
import { Link } from 'react-router-dom';
import Topic from './topic_component/topic.component';
import { Pagination } from '../../components/shared/pagination_component/pagination.component';

const DiscussComponent = () => {
    return (
        <div className="discuss-page container">
            <div className="direct"><Link to="/" className="link">Trang chủ</Link> 	&gt; <Link to="/discuss" className="link">Thảo luận</Link></div>
            <div className="row top">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12">
                    <Search />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12 create-topic">
                    <button><FontAwesomeIcon icon={faPlus} /> Tạo chủ đề mới</button>
                </div>
            </div>
            <div className="list-topic">
                <Topic />
                <Topic />
                <Topic />
                <Topic />
            </div>
            <div className="pagination">
                <Pagination />
            </div>
        </div>
    )
}

const DiscussPage = pageLayoutDefault(DiscussComponent, true);
export default DiscussPage;