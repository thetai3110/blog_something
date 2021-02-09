import { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './admin_page.css';
import { CreateBlog } from './manage_blog/create/create_blog';
import { TableBlog } from './manage_blog/table/table_blog';

export const AdminPage = () => {

    useEffect(() => {
        const $$ = document.querySelectorAll.bind(document);
        const $ = document.querySelector.bind(document);
        const links = $$('.nav-admin-list li');
        links.forEach((elm) => {
            elm.onclick = function () {
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
                    <div className="nav-admin-logo-show">
                        <h4><Link to="/admin">Admin</Link></h4>
                    </div>
                    <label htmlFor="nav-admin-checked" className="nav-admin-btn-menu"><i className="fa fa-bars"></i></label>
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
                    <li className="active">
                        <Link to="/admin/blog"><i className="fa fa-btc"></i> Blog manage</Link>
                    </li>
                    <li>
                        <Link to="/admin/blog"><i className="fa fa-btc"></i> Blog manage</Link>
                    </li>
                    <li>
                        <Link to="/admin/blog"><i className="fa fa-btc"></i> Blog manage</Link>
                    </li>
                </ul>
            </div>
            <div className="admin-content">
                <div className="admin-content-temp"></div>
                <div className="admin-content-main">
                    <Switch>
                        <Route path="/admin/blog" render={() => <TableBlog />} exact/>
                        <Route path="/admin/blog/create" render={() => <CreateBlog />} exact/>
                    </Switch>
                </div>
            </div>
            <div className="nav-admin-background"></div>
            <label htmlFor="nav-admin-checked" className="nav-admin-overlap"></label>
        </div>
    );
}
