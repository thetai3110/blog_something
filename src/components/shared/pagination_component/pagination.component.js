import { Link } from "react-router-dom"

export const Pagination = () => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <Link className="page-link" to="/" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </Link>
                </li>
                <li className="page-item"><Link className="page-link" to="/">1</Link></li>
                <li className="page-item"><Link className="page-link" to="/">2</Link></li>
                <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                <li className="page-item">
                    <Link className="page-link" to="/" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}