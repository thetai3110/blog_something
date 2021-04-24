import $ from 'jquery';
import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setHiddenSidebar } from '../../redux/blog/blog_actions';
import { themes } from '../../themes/themes';
import './dropdown.component.css';

const Dropdown = ({ options, title, pageName, dispatch, history, theme }) => {
    const [hidden, setHidden] = useState(false);
    const toggle = () => {
        $('.dropdown-sub').slideToggle(300);
        setHidden(!hidden);
    }
    return (
        <li className="dropdown">
            <div className="dropdown-title" onClick={toggle}>
                <span><i className={title.icon} aria-hidden="true"></i> {title.name} ({title.total})</span>
                <div className="dropdown-toggled">
                    {!hidden ? <i className="fa fa-angle-up" aria-hidden="true"></i> :
                        <i className="fa fa-angle-down" aria-hidden="true"></i>}
                </div>
            </div>
            <ul className="dropdown-sub">
                {options.map((el, i) => {
                    return <li className={el.eng === pageName ? 'active' : ''} key={i}>
                        <a href="#" onClick={() => {
                            history.push(el.link);
                            dispatch(setHiddenSidebar(true));
                        }}><i className={el.icon} aria-hidden="true"></i> {el.name} ({el.total})</a>
                    </li>
                })}
            </ul>
        </li>
    )
}

const mapStateToProps = ({ blog, common }) => ({
    hiddenSidebar: blog.hiddenSidebar,
    pageName: common.pageName
})
export default withRouter(connect(mapStateToProps)(Dropdown));