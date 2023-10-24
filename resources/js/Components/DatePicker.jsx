import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {    
    return (
        <div className="mb-3">
            <label className="mb-1 fw-bold">{props.label}</label>
            <div className="input-group mb-3">
                <span className="input-group-text">
                    <i className={props.icon}></i>
                </span>
                <DatePicker
                    selected={props.selectedDate}
                    onChange={props.onChange}
                    closeOnScroll={(e) => e.target === document}
                    showYearDropdown
                    showMonthDropdown
                    required={props.required}
                    dropdownMode="select"
                />
            </div>
            {props.error && <div className="text-danger">{props.error}</div>}
        </div>
    );
};

export default CustomDatePicker;
