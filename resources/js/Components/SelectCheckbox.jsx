import React from "react";

const SelectCheckbox = ({ label, options, valueKey, labelKey, selectedValues, onChange,}) => {
    return (
        <div className="mb-3">
            {selectedValues ? (
                <>
                    <label className="fw-bold">{label}</label>
                    <br />
                    {options.map((option, index) => (
                        <div
                            className="form-check form-check-inline"
                            key={index}
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={option[valueKey]}
                                onChange={onChange}
                                id={`check-${option[valueKey]}`}
                                checked={selectedValues.includes(
                                    option[valueKey]
                                )}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`check-${option[valueKey]}`}
                            >
                                {option[labelKey]}
                            </label>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <label className="fw-bold">{label}</label>
                    <br />
                    {options.map((option, index) => (
                        <div
                            className="form-check form-check-inline"
                            key={index}
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={option[valueKey]}
                                onChange={onChange}
                                id={`check-${option[valueKey]}`}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={`check-${option[valueKey]}`}
                            >
                                {option[labelKey]}
                            </label>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default SelectCheckbox;
