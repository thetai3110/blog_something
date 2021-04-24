import Dropdown from '../../../components/dropdown/dropdown.component';
import LinkItem from '../../../components/link-item/link-item.component';
import MyselfRouters from '../../myself/myself.routers';
import DateTimePicker from '../../../components/datetime-picker/datetime-picker.component';
import Datalists from '../../../components/datalists/datalists.component';
import Search from '../../../components/search/search.component';
import { useEffect } from 'react';
import app from '../../../firebase';
import { setAllTags, setCountDrafts, setCountPrivates, setCountPublics, setHiddenSidebar, setSearchInfo } from '../../../redux/blog/blog_actions';
import { connect } from 'react-redux';
import { PostsRedirect } from '../components/posts-redirect/posts-redirect.component';
import './posts.page.css';
import { setPageName } from '../../../redux/common/common.actions';
import { useAuth } from '../../../contexts/auth_context';
import { themes } from '../../../themes/themes';

const MyPostsPage = ({ match, allTags, setAllTags, hiddenSidebar, setHiddenSidebar,
    pageName, setPageName, searchInfo, setSearchInfo, countDrafts, setCountDrafts,
    countPrivates, setCountPrivates, countPublics, setCountPublics, location, theme }) => {
    const TAG = 'MyPostsPage';
    const options = [
        { name: 'Nháp', eng: 'draft', link: `${match.path}/draft`, icon: "fa fa-lock", total: countDrafts },
        { name: 'Công khai', eng: 'public', link: `${match.path}/public`, icon: 'fa fa-globe', total: countPublics },
        { name: 'Riêng tư', eng: 'private', link: `${match.path}/private`, icon: 'fa fa-unlock-alt', total: countPrivates }
    ];
    const { currentUser } = useAuth();
    useEffect(() => {
        let childPath = location.pathname.split(match.path)[location.pathname.split(match.path).length - 1];
        setPageName(childPath.split('/')[1]);
        (async function () {
            try {
                const db = app.database().ref('Blogs');
                db.on('value', (snap) => {
                    if (snap.val() !== null) {
                        let rs = Object.keys(snap.val()).map(id => {
                            return { id: id, value: snap.val()[id] }
                        })
                        let arr = [];
                        rs.forEach(el => {
                            if (el.value.tags)
                                arr = [...arr, ...el.value.tags];
                        })
                        // Datalists
                        let tags = [];
                        for (let i = 0; i < arr.length; i++) {
                            if (tags.indexOf(arr[i]) === -1) {
                                tags.push(arr[i]);
                            }
                        }
                        setAllTags(tags);
                        // Count
                        if (currentUser) {
                            let privates = rs.filter(el => { return el.value.published === 2 && currentUser.uid === el.value.author.uid });
                            let publics = rs.filter(el => { return el.value.published === 1 && currentUser.uid === el.value.author.uid });
                            let drafts = rs.filter(el => { return el.value.published === 0 && currentUser.uid === el.value.author.uid });
                            setCountDrafts(drafts.length);
                            setCountPrivates(privates.length);
                            setCountPublics(publics.length);
                        }
                    }
                });
            } catch (error) {
                console.log(TAG + ': ' + error);
            }
        })();
    }, [location, currentUser]);
    return (
        <div className="posts">
            <div className="sidebar-hidden" style={{ transform: !hiddenSidebar ? 'translateX(0)' : 'translateX(-100%)' }}>
                <Dropdown title={{ name: 'Bài đăng', total: countDrafts + countPrivates + countPublics, icon: 'fa fa-pencil' }}
                    options={options}
                    total={[countDrafts, countPublics, countPrivates]} />
                <LinkItem title={{ name: 'Câu hỏi', link: `${match.path}/questions`, icon: 'fa fa-question' }}></LinkItem>
            </div>
            {!hiddenSidebar ? <div className="overlap" onClick={() => setHiddenSidebar(!hiddenSidebar)}></div> : null}
            <div className="row contain-main">
                <div className="col l-2 md-0 c-0" style={{ marginBottom: '20px' }}>
                    <ul className="sidebar" style={themes[theme].page_name}>
                        <Dropdown theme={theme} title={{ name: 'Bài đăng', total: countDrafts + countPrivates + countPublics, icon: 'fa fa-pencil' }}
                            options={options}
                            total={[countDrafts, countPublics, countPrivates]} />
                        <LinkItem theme={theme} title={{ name: 'Câu hỏi', link: `${match.path}/questions`, icon: 'fa fa-question' }}></LinkItem>
                    </ul>
                </div>
                <div className="col l-10 md-12 c-12 contain-sub">
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <h2 style={{ fontWeight: '500', fontSize: '21px', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                            <PostsRedirect theme={theme} handleShowMenu={() => setHiddenSidebar(!hiddenSidebar)} />
                            <span style={themes[theme].page_name}>
                                {pageName.charAt(0).toUpperCase() +
                                    pageName.slice(1, pageName.length)}
                            </span>
                        </h2>
                        <hr style={themes[theme].border_page} />
                    </div>
                    <div className="row">
                        <div className="col l-5 md-12 c-12 date-wrap" style={{ marginBottom: '15px' }}>
                            <DateTimePicker />
                        </div>
                        <div className="col l-7 md-12 c-12" style={{ marginBottom: '15px' }}>
                            <Datalists data={allTags} type='tags' name="Thẻ" handleChange={(value) => setSearchInfo({ ...searchInfo, tags: value })} />
                        </div>
                    </div>
                    <Search handleChange={(value) => setSearchInfo({ ...searchInfo, content: value })} />
                    <div className="redirect">
                        <MyselfRouters theme={theme} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog, common }) => ({
    allTags: blog.allTags,
    hiddenSidebar: blog.hiddenSidebar,
    pageName: common.pageName,
    searchInfo: blog.searchInfo,
    countPrivates: blog.countPrivates,
    countPublics: blog.countPublics,
    countDrafts: blog.countDrafts
})

const mapDispatchToProps = (dispatch) => ({
    setAllTags: (tags) => dispatch(setAllTags(tags)),
    setHiddenSidebar: (hidden) => dispatch(setHiddenSidebar(hidden)),
    setPageName: name => dispatch(setPageName(name)),
    setSearchInfo: info => dispatch(setSearchInfo(info)),
    setCountPrivates: (count) => dispatch(setCountPrivates(count)),
    setCountPublics: (count) => dispatch(setCountPublics(count)),
    setCountDrafts: (count) => dispatch(setCountDrafts(count))
})
export default connect(mapStateToProps, mapDispatchToProps)(MyPostsPage);