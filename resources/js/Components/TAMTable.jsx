import React from "react";

const TAMTable = ({ data, type }) => {
    return (
        <div className="table-responsive">
            {type === "responsesTable" && renderResponseTable(data)}
            {type === "descriptiveStatisticsTable" &&
                renderDescriptiveStatisticsTable(data)}
        </div>
    );
};

const renderResponseTable = (data) => {
    const keys = Object.keys(data[0]?.answerData);

    return (
        <table className="table table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th>No</th>
                    <th>Respondent Name</th>
                    {keys.map((key) => (
                        <th key={key}>Question {key.replace("tam", "")}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((result, index) => (
                    <tr key={result.id}>
                        <td>{index + 1}</td>
                        <td>{result.respondentName}</td>
                        {keys.map((key) => (
                            <td key={key}>{result.answerData[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const renderDescriptiveStatisticsTable = (data) => {
    return (
        <table className="table table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th>Variable</th>
                    <th>nI</th>
                    <th>Sum SK</th>
                    <th>Sum SH</th>
                    <th>P</th>
                </tr>
            </thead>
            <tbody>
                {data.map((result, index) => (
                    <tr key={index}>
                        <td>{result.variable}</td>
                        <td>{result.nI}</td>
                        <td>{result.sum_SK}</td>
                        <td>{result.sum_SH}</td>
                        <td>{result.P}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TAMTable;
