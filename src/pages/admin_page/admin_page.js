import { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './admin_page.css';
import { CreateBlog } from './manage_blog/create_or_modify/create_or_modify';
import { TableBlog } from './manage_blog/table/table_blog';

export const AdminPage = () => {
    const menus = [
        { id: '1', title: 'blog', title_en: 'blog' }
    ];
    useEffect(() => {
        const $$ = document.querySelectorAll.bind(document);
        const $ = document.querySelector.bind(document);
        const links = $$('.nav-admin-list li');
        links.forEach((elm) => {
            elm.onclick = function () {
                if($('.nav-admin-list li.active'))
                    $('.nav-admin-list li.active').classList.remove('active');
                this.classList.add('active');
            }
        });
    })

    return (
        <div className="admin">
            <input type="checkbox" id="nav-admin-checked" name="nav-admin-checked" hidden></input>
            <div className="nav-admin-top">
                <div className="nav-admin-search">
                    <label htmlFor="nav-admin-checked" className="nav-admin-btn-menu"><i className="fa fa-bars"></i></label>
                    <div className="nav-admin-logo-show">
                        <h4><Link to="/admin">Admin</Link></h4>
                    </div>
                    <form>
                        <input value="" onChange={() => { }} placeholder="Nhập nội dung tìm kiếm"></input>
                        <button><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <div className="nav-admin-notify">
                    <div><i className="fa fa-envelope-square"></i></div>
                    <div><i className="fa fa-bell"></i></div>
                </div>
            </div>
            <div className="nav-admin-left">
                <div className="nav-admin-logo">
                    <h4><Link to="/admin">Admin</Link></h4>
                </div>
                <ul className="nav-admin-list">
                    {menus.map((item) => {
                        return <li key={item.id} className="nav-admin-list"><Link to={"/admin/" + item.title_en}>{item.title.charAt(0).toLocaleUpperCase() + item.title.slice(1)}</Link></li>
                    })}
                </ul>
            </div>
            <div className="admin-content">
                <div className="admin-content-temp"></div>
                <div className="admin-content-main">
                    <Switch>
                        <Route path="/admin/blog" render={(props) => <TableBlog {...props}/>} exact />
                        <Route path="/admin/blog/create" render={(props) => <CreateBlog {...props}/>} exact />
                    </Switch>
                </div>
            </div>
            <div className="nav-admin-background"></div>
            <label htmlFor="nav-admin-checked" className="nav-admin-overlap"></label>
        </div>
    );
}
