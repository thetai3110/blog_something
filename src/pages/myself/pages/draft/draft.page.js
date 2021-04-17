import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loading from "../../../../components/loading/loading";
import Search from "../../../../components/search/search.component";
import { useAuth } from "../../../../contexts/auth_context";
import app from "../../../../firebase";
import { setLstDrafts } from "../../../../redux/blog/blog_actions";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const DraftItem = styled.div`
    border-bottom: 1px solid #d6d6d7!important;
    padding: 10px;
    margin: 1rem 0;
`
const Title = styled.h5`
    font-size: 22px;
    font-weight: 500;
    color: #333;
`
const Icon = styled.span`
    color: green;
    margin-right: 0.3rem
`
const Date = styled.div`
    font-size: 15px;
    color: gray
`
const DropButton = styled.div`
    display: inline;
    margin-left: 0.3rem;
    font-size: 18px
`

const DraftPage = ({ lstDrafts, setLstDrafts }) => {
    const TAG = 'DraftPage';
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        if (currentUser) {
            (async function () {
                try {
                    setLstDrafts([]);
                    const db = app.database().ref('Blogs');
                    db.on('value', (snap) => {
                        if (snap.val() !== null) {
                            let lst = Object.keys(snap.val()).map(id => {
                                return { id: id, value: snap.val()[id] }
                            })
                            setLstDrafts(lst.filter(el => { return el.value.published === 0 && currentUser.uid === el.value.author.uid }))
                            setLoading(false);
                        }
                    });
                } catch (error) {
                    console.log(TAG + ': ' + error);
                }
            })();
        }
    }, [currentUser]);
    if (loading)
        return <Loading></Loading>
    else
        return (
            <div className="draft-page">
                <div className="actions-search">
                    <Search />
                </div>
                <div className="drafts-content">
                    {lstDrafts ? lstDrafts.map((el, i) => {
                        return <DraftItem className="draft-item" key={i}>
                            <Title className="title"><Icon><i className="fa fa-lock" aria-hidden="true"></i></Icon> {el.value.title}</Title>
                            <Date>Cập nhập cuối: {el.value.lastModify}
                                <Dropdown id={el.id} />
                            </Date>
                        </DraftItem>
                    }) : null}
                </div>
            </div>
        )
}

const Dropdown = ({ id }) => {
    return (
        <DropButton className="dropdown-icon">
            <a style={{ color: 'gray' }} href="#" role="button" id="dropdown-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdown-action">
                <Link className="dropdown-item" to={`/modify-blog/${id}`}>Sửa</Link>
                <a className="dropdown-item" href="#">Xóa</a>
                <a className="dropdown-item" href="#">Thiết lập</a>
            </div>
        </DropButton>
    )
}

const mapStateToProps = ({ blog }) => ({
    lstDrafts: blog.lstDrafts
})

const mapDispatchToProps = (dispatch) => ({
    setLstDrafts: (drafts) => dispatch(setLstDrafts(drafts))
})

export default connect(mapStateToProps, mapDispatchToProps)(DraftPage);