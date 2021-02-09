import { useEffect, useRef } from 'react';
import { Link, Route } from 'react-router-dom';
import './admin_page.css';
import { CreateBlog } from './manage_blog/create/create_blog';

export const AdminPage = () => {
    const btnRef = useRef(null);
    const menuRef = useRef(null);
    const tempRef = useRef(null);
    const overlapRef = useRef(null);

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

    const handleClick = () => {
        if (menuRef.current.style.transform === 'translateX(0%)') {
        console.log("a")

            menuRef.current.style.transform = 'translateX(-100%)';
            tempRef.current.style.width = '0';
        } else {
        console.log("a")
            menuRef.current.style.transform = 'translateX(0%)';
            tempRef.current.style.width = '230px';
        }
    }

    return (
        <div className="admin">
            <div className="nav-admin-top">
                <div className="nav-admin-search">
                    <div className="nav-admin-logo-show">
                        <h4><Link to="/admin">Admin</Link></h4>
                    </div>
                    <div ref={btnRef} onClick={handleClick} className="nav-admin-btn-menu"><i className="fa fa-bars"></i></div>
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
            <div ref={menuRef} className="nav-admin-left">
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
                <div ref={tempRef} className="admin-content-temp"></div>
                <div className="admin-content-main">
                    <Route path="/admin/blog" render={() => <CreateBlog />} />
                </div>
            </div>
            <div ref={overlapRef} className="nav-admin-overlap"></div>
        </div>
    );
}
