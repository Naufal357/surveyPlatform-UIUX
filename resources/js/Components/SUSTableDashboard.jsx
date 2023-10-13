import React from "react";

const TableDashboard = ({ surveys }) => {
    if (!surveys || surveys.length === 0) {
        return <div>Tidak Ada Data Survei</div>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>Judul Survei</th>
                        <th>Jumlah Respons</th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.map((survey, index) => (
                        <tr key={survey.id}>
                            <td>{index + 1}</td>
                            <td>{survey.title}</td>
                            <td>{survey.response_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDashboard;
