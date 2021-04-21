import { Link } from "react-router-dom";
import { StyledPagination } from "../common/common-styled.component";
export const Pagination = (props) => {
    const pageInfo = [];
    for (let i = 0; i < props.total; i++) {
        pageInfo.push(props.link + '/' + (i + 1));
    }
    return (
        <StyledPagination aria-label="Page navigation example">
            <ul className="pagination">
                <li className={parseInt(props.currentPage) === 1 ? 'page-item disabled' : 'page-item'}>
                    <Link className="page-link" to={`${props.link}/${parseInt(props.currentPage) - 1}`} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </Link>
                </li>
                {pageInfo.map((item, i) => {
                    return <li className={parseInt(props.currentPage) === (i + 1) ? 'page-item disabled' : 'page-item'} key={i}><Link className="page-link" to={item}>{i + 1}</Link></li>
                })}
                <li className={parseInt(props.currentPage) === parseInt(props.total) ? 'page-item disabled' : 'page-item'}>
                    <Link className="page-link" to={`${props.link}/${parseInt(props.currentPage) + 1}`} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </Link>
                </li>
            </ul>
        </StyledPagination>
    )
}