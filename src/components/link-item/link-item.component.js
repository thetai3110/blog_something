import { Link } from 'react-router-dom';
import './link-item.component.css';

const LinkItem = ({ title }) => {
    return (
        <li className="link-item">
           <i className={title.icon} aria-hidden="true"></i> <Link to={title.link}>{title.name}</Link>
        </li>
    )
}

export default LinkItem;