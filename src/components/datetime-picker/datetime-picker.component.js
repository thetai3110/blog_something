import { StyledInput } from "../common/common-styled.component";

const DateTimePicker = ({ type }) => {
    return (
        <StyledInput type="date" className="time-picker" placeholder={type}></StyledInput>
    )
}

export default DateTimePicker;