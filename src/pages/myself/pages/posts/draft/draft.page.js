import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAuth } from "../../../../../contexts/auth_context";
import app from "../../../../../firebase";
import { setLstDrafts } from "../../../../../redux/blog/blog_actions";
import { BlogService } from "../../../../../services/blog.service";
import { toast } from "../../../../../components/toast/toast.component";
import { DropdownButton } from "../../../components/dropdown-button/dropdown-button.component";
import Loading from "../../../../../components/loading/loading";
import { Date, Item, Icon, NotFound, Title } from "../../../components/style-items/style-items.component";

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
    const handleDelete = async (id, title) => {
        try {
            await BlogService.remove(id);
            toast({ title: "Thành công!", message: `Bạn đã xóa bài này (title: ${title})!`, type: "success", duration: 2000 });
        } catch (error) {
            console.log(error);
        }
    }
    if (loading)
        return <Loading></Loading>
    else
        return (
            <>
                {lstDrafts ? lstDrafts.length > 0 ? lstDrafts.map((el, i) => {
                    return <Item className="draft-item" key={i}>
                        <Title className="title"><Icon><i className="fa fa-lock" aria-hidden="true"></i></Icon> {el.value.title}</Title>
                        <Date>Cập nhập cuối: {el.value.lastModify}
                            <DropdownButton data={{ id: el.id, title: el.value.title }} handleEvent={() => handleDelete(el.id, el.value.title)} />
                        </Date>
                    </Item>
                }) : <NotFound>Không có bài nào!</NotFound> : null}
            </>
        )
}

const mapStateToProps = ({ blog }) => ({
    lstDrafts: blog.lstDrafts
})

const mapDispatchToProps = (dispatch) => ({
    setLstDrafts: (drafts) => dispatch(setLstDrafts(drafts))
})

export default connect(mapStateToProps, mapDispatchToProps)(DraftPage);