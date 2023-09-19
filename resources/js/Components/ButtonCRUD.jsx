import React from "react";

function ButtonCRUD({ type, onClick, label, iconClass, color }) {
    return (
        <button
            type={type}
            className={`btn btn-md me-2 ${color}`}
            onClick={onClick}
        >
            <i className={iconClass}></i> {label}
        </button>
    );
}

export default ButtonCRUD;
