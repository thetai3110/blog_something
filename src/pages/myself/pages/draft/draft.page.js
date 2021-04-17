import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Loading from "../../../../components/loading/loading";
import Search from "../../../../components/search/search.component";
import { useAuth } from "../../../../contexts/auth_context";
import app from "../../../../firebase";
import { setLstDrafts } from "../../../../redux/blog/blog_actions";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { BlogService } from "../../../../services/blog.service";
import { toast } from "../../../../components/toast/toast.component";

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
                                <Dropdown id={el.id} title={el.value.title} />
                            </Date>
                        </DraftItem>
                    }) : null}
                </div>
            </div>
        )
}

const Dropdown = ({ id, title }) => {
    return (
        <DropButton className="dropdown-icon">
            <a style={{ color: 'gray' }} href="#" role="button" id="dropdown-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdown-action">
                <Link className="dropdown-item" to={`/modify-blog/${id}`}>Sửa</Link>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete">Xóa</a>
                <a className="dropdown-item" href="#">Thiết lập</a>
            </div>
            <Model id={id} title={title} />
        </DropButton>
    )
}

const Model = ({ id, title }) => {
    const handleDelete = async () => {
        try {
            await BlogService.remove(id);
            toast({ title: "Thành công!", message: `Bạn đã xóa bài này (title: ${title})!`, type: "success", duration: 2000 });
        } catch (error) {
            console.log(error);
        }
    }
    return <div className="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="title">Bạn muốn xóa bài này?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {title}
                </div>
                <div class="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Bỏ qua</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleDelete}>Xóa</button>
                </div>
            </div>
        </div>
    </div>
}

const mapStateToProps = ({ blog }) => ({
    lstDrafts: blog.lstDrafts
})

const mapDispatchToProps = (dispatch) => ({
    setLstDrafts: (drafts) => dispatch(setLstDrafts(drafts))
})

export default connect(mapStateToProps, mapDispatchToProps)(DraftPage);