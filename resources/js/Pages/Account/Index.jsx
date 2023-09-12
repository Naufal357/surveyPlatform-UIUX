import React from "react";
import LayoutAccount from "../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

//register chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function Dashboard() {
    //destruct props
    const { auth, count, chart } = usePage().props;
    const angka = 342;

    //option chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `STATISTIC RESPONSES : ${new Date().getFullYear()}`,
            },
        },
    };

    //data chart
    const data = {
        labels: chart?.month_name,
        datasets: [
            {
                fill: true,
                label: "Responses",
                backgroundColor: "#bccad8",
                data: chart?.grand_total,
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Dashboard - SurveyPlatform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12 col-md-12 col-lg-12 mb-4">
                        <div className="alert alert-success border-0 shadow-sm mb-0">
                            Selamat Datang, <strong>{auth.name}</strong>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div
                                    className="bg-primary py-4 px-5 mfe-3"
                                    style={{ width: "130px" }}
                                >
                                    <i className="fas fa-circle-notch fa-spin fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-primary">
                                        {angka}
                                    </div>
                                    <div className="text-muted text-uppercase font-weight-bold small">
                                        Waktu Rata-rata Mengisi Survei
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 rounded shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div
                                    className="bg-success py-4 px-5 mfe-3"
                                    style={{ width: "130px" }}
                                >
                                    <i className="fas fa-check-circle fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-success">
                                        {angka}
                                    </div>
                                    <div className="text-muted text-uppercase font-weight-bold small">
                                        Jumlah Responden
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 rounded shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div
                                    className="bg-warning py-4 px-5 mfe-3"
                                    style={{ width: "130px" }}
                                >
                                    <i className="fas fa-exclamation-triangle fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-warning">
                                        {angka}
                                    </div>
                                    <div className="text-muted text-uppercase font-weight-bold small">
                                        Jumlah Responden
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mb-4">
                        <div className="card border-0 rounded shadow-sm overflow-hidden">
                            <div className="card-body p-0 d-flex align-items-center">
                                <div
                                    className="bg-danger py-4 px-5 mfe-3"
                                    style={{ width: "130px" }}
                                >
                                    <i className="fas fa-times fa-2x text-white"></i>
                                </div>
                                <div>
                                    <div className="text-value text-danger">
                                        {angka}
                                    </div>
                                    <div className="text-muted text-uppercase font-weight-bold small">
                                        kurang dari target
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-12 col-md-12 col-lg-12 mb-4">
                        <div className="card border-0 border-top-success shadow-sm">
                            <div className="card-header fw-bold">
                                <i className="fa fa-chart-bar"></i> CHART
                                Survey {new Date().getFullYear()}
                            </div>
                            <div className="card-body">
                                <Line options={options} data={data} />;
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
