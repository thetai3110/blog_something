import Dropdown from '../../../../components/dropdown/dropdown.component';
import LinkItem from '../../../../components/link-item/link-item.component';
import PersonRouters from '../../person.routers';
import styled from 'styled-components';
import DateTimePicker from '../../../../components/datetime-picker/datetime-picker.component';
import Datalists from '../../../../components/datalists/datalists.component';
import Search from '../../../../components/search/search.component';

const Post = styled.div`
    height: 100%;       
`
const ContainMain = styled.div`
    height: 100%;
    padding: 2rem 0;
`
const ContainSub = styled.div`
    margin-bottom: 3rem;
    margin-top: 1rem;
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
const MyPostsPage = ({ match }) => {
    const options = [
        { name: 'Nháp', link: `${match.path}/draft`, icon: "fa fa-lock" },
        { name: 'Công khai', link: `${match.path}/public`, icon: 'fa fa-globe' },
        { name: 'Riêng tư', link: `${match.path}/private`, icon: 'fa fa-unlock-alt' }
    ]
    return (
        <Post>
            <ContainMain className="row">
                <div className="col l-2 md-2 c-0">
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
                            <Datalists />
                        </div>
                    </div>
                    <Search />
                    <PersonRouters />
                </ContainSub>
            </ContainMain>
        </Post>
    )
}

export default MyPostsPage;