import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAuth } from "../../../../../contexts/auth_context";
import app from "../../../../../firebase";
import { setLstPrivates } from "../../../../../redux/blog/blog_actions";
import { Date, Item, Icon, NotFound, Title } from "../../../components/style-items/style-items.component";
import { DropdownButton } from "../../../components/dropdown-button/dropdown-button.component";
import { BlogService } from '../../../../../services/blog.service';
import { toast } from '../../../../../components/toast/toast.component';
import Loading from "../../../../../components/loading/loading";

const PrivatesPage = ({ lstPrivates, setLstPrivates }) => {
    const TAG = 'DraftPage';
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (currentUser) {
            (async function () {
                try {
                    setLstPrivates([]);
                    const db = app.database().ref('Blogs');
                    db.on('value', (snap) => {
                        if (snap.val() !== null) {
                            let lst = Object.keys(snap.val()).map(id => {
                                return { id: id, value: snap.val()[id] }
                            })
                            setLstPrivates(lst.filter(el => { return el.value.published === 2 && currentUser.uid === el.value.author.uid }))
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
                {lstPrivates ? lstPrivates.length > 0 ? lstPrivates.map((el, i) => {
                    return <Item className="draft-item" key={i}>
                        <Title className="title"><Icon><i className="fa fa-lock" aria-hidden="true"></i></Icon> {el.value.title}</Title>
                        <Date>Cập nhập cuối: {el.value.lastModify}
                            <DropdownButton data={{ id: el.id, title: el.value.title }} handleEvent={(id, title) => handleDelete(id, title)} />
                        </Date>
                    </Item>
                }) : <NotFound>Không có bài nào!</NotFound> : null}
            </>
        )
}

const mapStateToProps = ({ blog }) => ({
    lstPrivates: blog.lstPrivates
})

const mapDispatchToProps = (dispatch) => ({
    setLstPrivates: (privates) => dispatch(setLstPrivates(privates))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivatesPage);