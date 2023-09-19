import React from "react";

function InputField({ label, type, value, onChange, placeholder, error }) {
    const sanitizedValue = value || "";

    return (
        <div className="mb-3">
            <label className="form-label fw-bold">{label}</label>
            <input
                type={type}
                className="form-control"
                value={sanitizedValue} // Gunakan sanitizedValue sebagai nilai input
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default InputField;
