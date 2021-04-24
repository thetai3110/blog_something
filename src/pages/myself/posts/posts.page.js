import Dropdown from '../../../components/dropdown/dropdown.component';
import LinkItem from '../../../components/link-item/link-item.component';
import MyselfRouters from '../../myself/myself.routers';
import DateTimePicker from '../../../components/datetime-picker/datetime-picker.component';
import Datalists from '../../../components/datalists/datalists.component';
import Search from '../../../components/search/search.component';
import { useEffect } from 'react';
import app from '../../../firebase';
import { setAllTags, setHiddenSidebar } from '../../../redux/blog/blog_actions';
import { connect } from 'react-redux';
import { PostsRedirect } from '../components/posts-redirect/posts-redirect.component';
import './posts.page.css';

const MyPostsPage = ({ match, allTags, setAllTags, hiddenSidebar, setHiddenSidebar,location }) => {
    const TAG = 'MyPostsPage';
    const options = [
        { name: 'Nháp', link: `${match.path}/draft`, icon: "fa fa-lock" },
        { name: 'Công khai', link: `${match.path}/public`, icon: 'fa fa-globe' },
        { name: 'Riêng tư', link: `${match.path}/private`, icon: 'fa fa-unlock-alt' }
    ];
    useEffect(() => {
        (async function () {
            try {
                const db = app.database().ref('Blogs');
                db.on('value', (snap) => {
                    if (snap.val() !== null) {
                        let rs = Object.keys(snap.val()).map(id => {
                            return snap.val()[id].tags;
                        })
                        let arr = [];
                        rs.forEach(el => {
                            if (el)
                                arr = [...arr, ...el];
                        })
                        let tags = [];
                        for (let i = 0; i < arr.length; i++) {
                            if (tags.indexOf(arr[i]) === -1) {
                                tags.push(arr[i]);
                            }
                        }
                        setAllTags(tags);
                    }
                });
            } catch (error) {
                console.log(TAG + ': ' + error);
            }
        })();
    }, [])
    return (
        <div className="posts">
            <div className="sidebar-hidden" style={{transform: !hiddenSidebar ? 'translateX(0)' : 'translateX(-100%)'}}>
                <Dropdown title={{ name: 'Bài đăng', icon: 'fa fa-pencil' }} options={options} />
                <LinkItem title={{ name: 'Câu hỏi', link: `${match.path}/questions`, icon: 'fa fa-question' }}></LinkItem>
            </div>
            {!hiddenSidebar ? <div className="overlap" onClick={()=> setHiddenSidebar(!hiddenSidebar)}></div> : null}
            <div className="row contain-main">
                <div className="col l-2 md-0 c-0" style={{ marginBottom: '20px' }}>
                    <ul className="sidebar">
                        <Dropdown title={{ name: 'Bài đăng', icon: 'fa fa-pencil' }} options={options} />
                        <LinkItem title={{ name: 'Câu hỏi', link: `${match.path}/questions`, icon: 'fa fa-question' }}></LinkItem>
                    </ul>
                </div>
                <div className="col l-10 md-12 c-12 contain-sub">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <h2 style={{ fontWeight: '500', fontSize: '21px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                            <PostsRedirect handleShowMenu={()=> setHiddenSidebar(!hiddenSidebar)} />
                            <span>
                                {location.pathname.split('/')[location.pathname.split('/').length - 1].charAt(0).toUpperCase() +
                                    location.pathname.split('/')[location.pathname.split('/').length - 1].slice(1, location.pathname.split('/')[location.pathname.split('/').length - 1].length)}
                            </span>
                        </h2>
                        <hr />
                    </div>
                    <div className="row" style={{ marginBottom: '15px' }}>
                        <div className="col l-6 md-12 c-12 date-wrap">
                            <DateTimePicker type="Ngày bắt đầu" />
                            <span className="split">-</span>
                            <DateTimePicker type="Ngày kết thúc" />
                        </div>
                        <div className="col l-6 md-12 c-12">
                            <Datalists data={allTags} type='tags' name="Thẻ" />
                        </div>
                    </div>
                    <Search />
                    <div className="redirect">
                        <MyselfRouters />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    allTags: blog.allTags,
    hiddenSidebar: blog.hiddenSidebar
})

const mapDispatchToProps = (dispatch) => ({
    setAllTags: (tags) => dispatch(setAllTags(tags)),
    setHiddenSidebar: (hidden) => dispatch(setHiddenSidebar(hidden))
})
export default connect(mapStateToProps, mapDispatchToProps)(MyPostsPage);