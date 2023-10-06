import React from "react";

function InputField({ label, type, value, onChange, placeholder, error }) {
    const sanitizedValue = value || "";

    return (
        <div className="mb-3">
            <label className="form-label fw-bold">{label}</label>
            {type === "textarea" ? (
                <textarea
                    className="form-control"
                    value={sanitizedValue}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    className="form-control"
                    value={sanitizedValue}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default InputField;
