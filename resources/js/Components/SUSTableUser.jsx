import React from "react";

const SUSTableUser = ({ data }) => {
    // Periksa apakah 'data' adalah null atau undefined
    if (!data || data.length === 0) {
        return <div>Tidak Ada Data</div>;
    }

    // Jika 'data' ada, maka kita dapat mengambil susKeys
    const susKeys = Object.keys(data[0]?.answerData);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>Respondent Name</th>
                        <th>SUS Score</th>
                        {Array.from({ length: 10 }, (_, i) => (
                            <th key={`question-${i + 1}`}>Question {i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((result, index) => (
                        <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.respondentName}</td>
                            <td>{result.susScore}</td>
                            {susKeys.map((key) => (
                                <td key={key}>{result.answerData[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SUSTableUser;
