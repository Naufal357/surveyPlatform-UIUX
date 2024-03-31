import React from "react";
import { Link } from "@inertiajs/inertia-react";

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
                        <th>Hasil</th>
                    </tr>
                </thead>
                <tbody>
                    {surveys.map((survey, index) => (
                        <tr key={survey.id}>
                            <td>{index + 1}</td>
                            <td>{survey.title}</td>
                            <td>{survey.response_count}</td>
                            <td>
                                {survey.method_ids.includes(1) &&
                                survey.method_ids.includes(2) ? (
                                    <div className="d-flex gap-2">
                                        <Link
                                            href={`sus/${survey.survey_id}`}
                                            className="btn btn-sm btn-success border-0 shadow"
                                            type="button"
                                        >
                                            SUS
                                        </Link>
                                        <Link
                                            href={`tam/${survey.survey_id}`}
                                            className="btn btn-sm btn-success border-0 shadow"
                                            type="button"
                                        >
                                            TAM
                                        </Link>
                                    </div>
                                ) : survey.method_ids.includes(1) ? (
                                    <Link
                                        href={`sus/${survey.survey_id}`}
                                        className="btn btn-sm btn-success border-0 shadow"
                                        type="button"
                                    >
                                        SUS
                                    </Link>
                                ) : survey.method_ids.includes(2) ? (
                                    <Link
                                        href={`tam/${survey.survey_id}`}
                                        className="btn btn-sm btn-success border-0 shadow"
                                        type="button"
                                    >
                                        TAM
                                    </Link>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDashboard;
