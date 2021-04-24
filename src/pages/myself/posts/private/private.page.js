import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAuth } from "../../../../contexts/auth_context";
import app from "../../../../firebase";
import { setLstPrivates } from "../../../../redux/blog/blog_actions";
import { Date, Item, Icon, NotFound, Title } from "../../components/myself/myself-styled.component";
import { DropdownButton } from "../../components/dropdown-button/dropdown-button.component";
import { BlogService } from '../../../../services/blog.service';
import { toast } from '../../../../components/toast/toast.component';
import Loading from "../../../../components/loading/loading";
import { Pagination } from "../../../../components/pagination/pagination.component";
import { themes } from '../../../../themes/themes';

const PrivatesPage = ({ lstPrivates, setLstPrivates, match, countPrivates, searchInfo, selectionRange, theme }) => {
    const TAG = 'DraftPage';
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const currentPage = typeof match.params.page === 'undefined' ? 1 : match.params.page;

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
                            let privates = lst.filter(el => { return el.value.published === 2 && currentUser.uid === el.value.author.uid });
                            if (searchInfo.tags !== '') {
                                privates = privates.filter(el => {
                                    if (el.value.tags)
                                        return el.value.tags.includes(searchInfo.tags)
                                });
                            }
                            if (searchInfo.content !== '') {
                                privates = privates.filter(el => {
                                    return el.value.title.includes(searchInfo.content) || el.value.content.includes(searchInfo.content);
                                });
                            }
                            if (selectionRange.isSearch) {
                                privates = privates.filter(el => {
                                    let date = new window.Date(el.value.lastModify.split(', ')[0]);
                                    return date.getTime() <= selectionRange.endDate.getTime()
                                        && date.getTime() >= selectionRange.startDate.getTime()
                                });
                            }
                            setLstPrivates(privates.slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6));
                            setLoading(false);
                        }
                    });
                } catch (error) {
                    console.log(TAG + ': ' + error);
                }
            })();
        }
    }, [currentUser, match, selectionRange]);
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
                    return <Item key={i}>
                        <Title style={themes[theme].item_title}><Icon><i className="fa fa-lock" aria-hidden="true"></i></Icon> {el.value.title}</Title>
                        <Date style={themes[theme].item_info}>Cập nhập cuối: {el.value.lastModify}
                            <DropdownButton data={{ id: el.id, title: el.value.title }} handleEvent={() => handleDelete(el.id, el.value.title)} />
                        </Date>
                    </Item>
                }) : <NotFound>Không có bài nào!</NotFound> : null}
                <Pagination {...{ total: countPrivates % 6 === 0 ? parseInt(countPrivates / 6) : parseInt(countPrivates / 6) + 1, link: '/myself/private', currentPage: currentPage }} />
            </>
        )
}

const mapStateToProps = ({ blog }) => ({
    lstPrivates: blog.lstPrivates,
    countPrivates: blog.countPrivates,
    searchInfo: blog.searchInfo,
    selectionRange: blog.selectionRange
})

const mapDispatchToProps = (dispatch) => ({
    setLstPrivates: (privates) => dispatch(setLstPrivates(privates))
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivatesPage);