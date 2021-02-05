import { Link, Route } from "react-router-dom"
import { BlogEditor } from "./manage_blog/blog_editor";
import "./admin_page.css";

export const AdminPage = () => {
    return (
        <>
            <div className="admin-page">
                <div>admin page</div>
                <Link to="/admin/blog">Blog editor</Link>
                <hr></hr>
            </div>
            <Route path="/admin/blog" render={() => <BlogEditor />} />
        </>
    );
}