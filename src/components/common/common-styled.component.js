import styled from 'styled-components';

export const StyledInput = styled.input`
    border: 1px solid #dcdfe6;
    background-color: #ffff;
    flex-grow: 2;
    color: #777;
    padding: 7px 15px;
    width: 100%;
    &:focus{
        outline: none;
        border: 1px solid #5488c7;
    }
`
export const StyledOption = styled.option`
    color: #777;
    min-width: 375px;
`
export const StyledDataLists = styled.datalist`
    color: #777;
    min-width: 375px;
`
export const StyledPagination = styled.div`
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
`
export const StyledSearch = styled.div`
    background-color: #ffff;
    display: flex;
    justify-content: space-between;
`
export const StyledButtonSearch = styled.button`
    background-color: #ffff;
    border: 1px solid #dcdfe6;
    padding: 8px 15px;
    border-left: none;
    color: #777;
    &:hover{
        outline: none;
        color: #ffff;
        border: none;
        background-color: gray;
    };
    &:focus{
        outline: none;
    }
`