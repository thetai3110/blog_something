// import { StyledInput } from "../common/common-styled.component";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from "react";
import './datetime-picker.component.css';
import { useRef } from 'react';
import { setSelectionRange } from '../../redux/blog/blog_actions';
import { connect } from 'react-redux';
import $ from 'jquery';

const DateTimePicker = ({ selectionRange, setSelectionRange }) => {
    const startRef = useRef();
    const endRef = useRef();
    const [hiddenDateRange, setHiddenDateRange] = useState(true);

    function handleSelect(ranges) {
        startRef.current.value = ranges.selection.startDate.toLocaleDateString();
        endRef.current.value = ranges.selection.endDate.toLocaleDateString();
        setSelectionRange({
            ...selectionRange,
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate,
            isSearch: true,
            key: 'selection'
        });
    }

    return (
        <>
            <div className="datetime-wrap"
                onFocus={() => { $('.datetime-wrap').css('border', '1px solid #5488c7'); }}
                onBlur={() => { $('.datetime-wrap').css('border', '1px solid #d4d4d8'); }}>
                <i className="fa fa-calendar" aria-hidden="true"
                    onClick={() => { setHiddenDateRange(!hiddenDateRange) }}></i>
                <div className='datetime-range-choose'>
                    <input type="text" ref={startRef} placeholder="Bắt đầu" defaultValue=""
                        onFocus={() => { setHiddenDateRange(!hiddenDateRange) }}></input>
                    <span> - </span>
                    <input type="text" ref={endRef} placeholder="Kết thúc" defaultValue=""
                        onFocus={() => { setHiddenDateRange(!hiddenDateRange) }}></input>
                </div>
                {selectionRange.isSearch ?
                    <i className="fa fa-times-circle clear" aria-hidden="true"
                        onClick={() => {
                            setSelectionRange({
                                ...setSelectionRange,
                                startDate: new Date(),
                                endDate: new Date(),
                                isSearch: false,
                                key: 'selection'
                            });
                            startRef.current.value = '';
                            endRef.current.value = '';
                        }}></i>
                    : null}
                <div className="datetime-range" style={{ display: !hiddenDateRange ? 'block' : 'none' }}>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />
                </div>
            </div>
            {!hiddenDateRange ? <div id="overlap-date" onClick={() => {
                setHiddenDateRange(!hiddenDateRange);
                if (selectionRange.isSearch) {
                    startRef.current.value = selectionRange.startDate.toLocaleDateString();
                    endRef.current.value = selectionRange.endDate.toLocaleDateString();
                }
            }}></div> : null}
        </>
    )
}

const mapStateToProps = ({ blog }) => ({
    selectionRange: blog.selectionRange
})

const mapDispatchToProps = (dispatch) => ({
    setSelectionRange: selectionRange => dispatch(setSelectionRange(selectionRange))
})
export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker);