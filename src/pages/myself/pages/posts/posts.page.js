import Dropdown from '../../../../components/dropdown/dropdown.component';
import LinkItem from '../../../../components/link-item/link-item.component';
import PersonRouters from '../../person.routers';
import styled from 'styled-components';
import DateTimePicker from '../../../../components/datetime-picker/datetime-picker.component';
import Datalists from '../../../../components/datalists/datalists.component';
import Search from '../../../../components/search/search.component';
import { useEffect } from 'react';
import app from '../../../../firebase';
import { setAllTags } from '../../../../redux/blog/blog_actions';
import { connect } from 'react-redux';

const Post = styled.div`
    height: 100%;       
`
const ContainMain = styled.div`
    height: 100%;
    padding-top: 30px;
`
const ContainSub = styled.div`
`
const SideBar = styled.ul`
    background: #f5f7fa;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
    overflow: auto;
    height: 100%;
`
const DateWrap = styled.div`
    display: flex;
    align-items: center;
`
const Split = styled.span`
    padding: 0 12px;
`
const Redirect = styled.div`
    padding: 0 0 60px 0;
`
const MyPostsPage = ({ match, allTags, setAllTags }) => {
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
        <Post>
            <ContainMain className="row">
                <div className="col l-2 md-2 c-0" style={{ marginBottom: '20px' }}>
                    <SideBar>
                        <Dropdown title={{ name: 'Bài đăng', icon: 'fa fa-pencil' }} options={options} />
                        <LinkItem title={{ name: 'Câu hỏi', link: `${match.path}/questions`, icon: 'fa fa-question' }}></LinkItem>
                    </SideBar>
                </div>
                <ContainSub className="col l-10 md-10 c-12">
                    <div className="row" style={{ marginBottom: '15px' }}>
                        <DateWrap className="col l-6 md-12 c-12">
                            <DateTimePicker type="Ngày bắt đầu" />
                            <Split>-</Split>
                            <DateTimePicker type="Ngày kết thúc" />
                        </DateWrap>
                        <div className="col l-6 md-12 c-12">
                            <Datalists data={allTags} type='tags' name="Thẻ" />
                        </div>
                    </div>
                    <Search />
                    <Redirect>
                        <PersonRouters />
                    </Redirect>
                </ContainSub>
            </ContainMain>
        </Post>
    )
}

const mapStateToProps = ({ blog }) => ({
    allTags: blog.allTags
})

const mapDispatchToProps = (dispatch) => ({
    setAllTags: (tags) => dispatch(setAllTags(tags))
})
export default connect(mapStateToProps, mapDispatchToProps)(MyPostsPage);