import "./search.component.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome")

const Search = () => {
    return (
        <div className="search">
            <input value="" onChange={()=>{}} placeholder="Nhập nội dung tìm kiếm"></input>
            <button><FontAwesomeIcon icon={faSearch}/></button>
        </div>
    )
}

export default Search;