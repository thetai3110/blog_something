import { StyledDataLists, StyledInput, StyledOption } from '../common/common-styled.component';
const Datalists = () => {
    return (
       <>
            <StyledInput list="browsers" id="myBrowser" name="myBrowser" placeholder="Thẻ"></StyledInput>
            <StyledDataLists id="browsers">
                <StyledOption value="Chrome"></StyledOption>
                <StyledOption value="Firefox"></StyledOption>
                <StyledOption value="Internet Explorer"></StyledOption>
                <StyledOption value="Opera"></StyledOption>
                <StyledOption value="Safari"></StyledOption>
                <StyledOption value="Microsoft Edge"></StyledOption>
            </StyledDataLists>
       </>
    )
}

export default Datalists;