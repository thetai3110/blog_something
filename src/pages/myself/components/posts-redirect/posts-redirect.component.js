import './posts-redirect.component.css';

export const PostsRedirect = ({handleShowMenu}) => {
    return (
       <button className="btn-posts-redirect" onClick={handleShowMenu}>
           <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
    )
}