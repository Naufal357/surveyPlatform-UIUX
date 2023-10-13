import React from "react";

export default function InputField({ label, type, value, onChange, placeholder, error }) {
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
            ) : type === "file" ? (
                <input
                    type="file"
                    className="form-control"
                    onChange={onChange}
                    accept="image/*"
                />
            ) : (
                <input
                    type={type}
                    className="form-control"
                    defaultValue={sanitizedValue}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}