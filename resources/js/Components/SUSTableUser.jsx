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
                        <th>ID</th>
                        <th>Respondent Name</th>
                        <th>SUS Score</th>
                        {susKeys.map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((result) => (
                        <tr key={result.id}>
                            <td>{result.id}</td>
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
