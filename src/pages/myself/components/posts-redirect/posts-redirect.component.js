import './posts-redirect.component.css';
import {themes} from '../../../../themes/themes';

export const PostsRedirect = ({handleShowMenu, theme}) => {
    return (
       <button className="btn-posts-redirect" onClick={handleShowMenu}>
           <i style={themes[theme].page_name} className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
    )
}