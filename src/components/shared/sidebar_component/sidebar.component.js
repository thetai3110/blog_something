import "./sidebar.component.css";
import { Link } from "react-router-dom";

export const SideBarComponent = () => {
    return (
        <div className="side-bar">
            <select className="form-control form-control-md menu-item row">
                <option>Java</option>
                <option>Reactjs</option>
                <option>Angular</option>
            </select>
            <ul>
                <li><Link className="link" to="/">Variable</Link></li>
                <li><Link className="link" to="/">Input/ output</Link></li>
                <li><Link className="link" to="/">Operator</Link></li>
                <li><Link className="link" to="/">Collection</Link></li>
            </ul>
        </div>
    )
}
