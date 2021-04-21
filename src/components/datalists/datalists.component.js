import { StyledDataLists, StyledInput, StyledOption } from '../common/common-styled.component';
const Datalists = ({ data, type, name, handleChange }) => {
    return (
        <>
            <StyledInput list={type ? `${type}-target` : ''} 
                         id={type ? type : ''} 
                         name={type ? type : ''} 
                         placeholder={name ? name : ''}
                         onChange={(e)=> handleChange(e.target.value)}></StyledInput>
            <StyledDataLists id={type ? `${type}-target` : ''}>
                {data ? data.map((el, i) => {
                    return <StyledOption key={i} value={el}></StyledOption>
                }) : null}
            </StyledDataLists>
        </>
    )
}

export default Datalists;