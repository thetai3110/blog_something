import $ from 'jquery';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './dropdown.component.css';

const Dropdown = ({ options, title }) => {
    const [hidden, setHidden] = useState(true);
    const toggle = () => {
        $('.dropdown-sub').fadeToggle();
        setHidden(!hidden);
    }
    return (
        <li className="dropdown">
            <div className="dropdown-title" onClick={toggle}>
                <span><i className={title.icon} aria-hidden="true"></i> {title.name}</span>
                <div className="dropdown-toggled">
                    {!hidden ? <i className="fa fa-angle-up" aria-hidden="true"></i> :
                        <i className="fa fa-angle-down" aria-hidden="true"></i>}
                </div>
            </div>
            <ul className="dropdown-sub">
                {options.map((el, i) => {
                    return <li key={i}><Link to={el.link}><i className={el.icon} aria-hidden="true"></i> {el.name}</Link></li>
                })}
            </ul>
        </li>
    )
}

export default Dropdown;