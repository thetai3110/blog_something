import { StyledButtonSearch, StyledInput, StyledSearch } from "../common/common-styled.component";

const Search = ({ handleChange }) => {
    return (
        <StyledSearch>
            <StyledInput onChange={(e) => { handleChange(e.target.value) }} placeholder="Nhập nội dung tìm kiếm"></StyledInput>
            <StyledButtonSearch><i className="fa fa-search"></i></StyledButtonSearch>
        </StyledSearch>
    )
}

export default Search;