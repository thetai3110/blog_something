import { StyledButtonSearch, StyledInput, StyledSearch } from "../common/common-styled.component";

const Search = () => {
    return (
        <StyledSearch>
            <StyledInput value="" onChange={()=>{}} placeholder="Nhập nội dung tìm kiếm"></StyledInput>
            <StyledButtonSearch><i className="fa fa-search"></i></StyledButtonSearch>
        </StyledSearch>
    )
}

export default Search;