import Dropdown from '../../../../components/dropdown/dropdown.component';
import LinkItem from '../../../../components/link-item/link-item.component';
import PersonRouters from '../../person.routers';
import './posts.page.css';

const MyPostsPage = ({ match }) => {
    const options = [
        { name: 'Nháp', link: `${match.path}/draft`, icon: "fa fa-lock" },
        { name: 'Công khai', link: `${match.path}/public`, icon: 'fa fa-globe' },
        { name: 'Riêng tư', link: `${match.path}/private`, icon: 'fa fa-unlock-alt' }
    ]
    return (
        <div className="my-posts">
            <div className="row content-main">
                <div className="col l-2 md-2 c-0 ">
                    <ul className="my-posts-sidebar">
                        <Dropdown title={{ name: 'Bài đăng', icon: 'fa fa-pencil' }} options={options} />
                        <LinkItem title={{ name: 'Câu hỏi', link: `${match.path}/questions`, icon: 'fa fa-question' }}></LinkItem>
                    </ul>
                </div>
                <div className="col l-10 md-10 c-12 content-sub">
                    <PersonRouters />
                </div>
            </div>
        </div>
    )
}

export default MyPostsPage;