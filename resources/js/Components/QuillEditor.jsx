import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import stylesheet Quill.js

function QuillEditor({ value, onChange, label, error }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ["bold", "italic"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ color: [] }, { background: [] }],
        ],
    };

    const formats = [
        "header",
        "font",
        "bold",
        "italic",
        "link",
        "list",
        "script",
        "color",
        "background",
    ];

    return (
        <div className="mb-3">
            <label className="form-label fw-bold">{label}</label>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={onChange}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default QuillEditor;
