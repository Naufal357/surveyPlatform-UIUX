import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const focusedStyle = {
    borderColor: "AAA694",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

function PDFDropzone(props) {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
        },
        onDrop: (acceptedFiles, fileRejections) => {
            // Do something with the files
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragAccept, isDragReject]
    );

    return (
        <section className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop file(s) here ...</p>
                ) : (
                    <p>
                        Drag 'n' drop some PDF files here, or click to select
                        files
                    </p>
                )}
            </div>
            <aside>
                <p>Accepted files</p>
                <ul>{acceptedFileItems}</ul>
                <p>Rejected files</p>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </section>
    );
}

export default PDFDropzone;
