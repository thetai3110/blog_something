import $ from 'jquery';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { setHiddenSidebar } from '../../redux/blog/blog_actions';
import './dropdown.component.css';

const Dropdown = ({ options, title, location, dispatch, history }) => {
    const [hidden, setHidden] = useState(false);
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
                    return <li className={el.link === location.pathname ? 'active' : ''} key={i}>
                        <a href="#" onClick={()=> { 
                            history.push(el.link);
                            dispatch(setHiddenSidebar(true));
                        }}><i className={el.icon} aria-hidden="true"></i> {el.name}</a>
                    </li>
                })}
            </ul>
        </li>
    )
}

const mapStateToProps = ({ blog }) => ({
    hiddenSidebar: blog.hiddenSidebar
})
export default withRouter(connect(mapStateToProps)(Dropdown));