import React from "react";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import LayoutAccount from "../../Layouts/Account";
import AccordionLayout from "../../Layouts/Accordion";
import SUSPieChart from "../../Components/SUSPieChart";
import InfoCard from "../../Components/InfoCard";
import SUSTableUser from "../../Components/SUSTableUser";

export default function Dashboard() {
    const {
        auth,
        survey,
        surveyTitles,
        responses,
        respondentCount,
        averageSatisfaction,
        averageSUS,
        currentSurveyTitle,
        getSUSChartData,
        susSurveyResults,
    } = usePage().props;

    // Fungsi untuk menghitung data chart
    const getChartData = (data) => {
        const labels = [
            "Sangat Tidak Setuju",
            "Tidak Setuju",
            "Netral",
            "Setuju",
            "Sangat Setuju",
        ];
        const counts = [0, 0, 0, 0, 0];

        data.forEach((value) => {
            counts[value - 1]++;
        });

        return {
            labels,
            datasets: [
                {
                    data: counts,
                    backgroundColor: [
                        "#272727", // Sangat Tidak Setuju
                        "#FED766", // Tidak Setuju
                        "#009FB7", // Netral
                        "#696773", // Setuju
                        "#B8B8B8", // Sangat Setuju
                    ],
                },
            ],
        };
    };

    // Mengubah format data dari getSUSChartData ke format yang sesuai dengan react-chartjs-2
    const susData = Object.keys(getSUSChartData.original).map((question) => ({
        question,
        data: getChartData(getSUSChartData.original[question]),
    }));

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <>
            <Head>
                <title>Dashboard - SurveyPlatform</title>
            </Head>
            <LayoutAccount>
                <div className="m-3">
                    <div className="row alert alert-success border-0 shadow-sm mb-2">
                        <div className="col-md-6">
                            Selamat Datang, <strong>{auth.name}</strong> <br />
                            {currentSurveyTitle ? (
                                <span>
                                    Hasil :{" "}
                                    <strong>{currentSurveyTitle}</strong>
                                </span>
                            ) : (
                                <strong>Pilih survei terlebih dahulu.</strong>
                            )}
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <select
                                    className="form-select"
                                    onChange={(event) => {
                                        const selectedId = event.target.value;
                                        if (selectedId) {
                                            window.location.replace(
                                                `/account/dashboard/${selectedId}`
                                            );
                                        }
                                    }}
                                >
                                    <option value="">Pilih Survey</option>
                                    {surveyTitles.map((survey) => (
                                        <option
                                            key={survey.id}
                                            value={survey.id}
                                        >
                                            {survey.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <InfoCard
                            icon="fa-users "
                            background="success"
                            value={respondentCount}
                            title="Jumlah Responden"
                        />
                        {/* <InfoCard
                        icon="fa-circle-notch fa-spin"
                        background="info"
                        value={`${angka} menit`}
                        title="Durasi Survei Rata-Rata"
                    /> */}
                        <InfoCard
                            icon="fa-chart-pie"
                            background="primary"
                            value={`${averageSUS} dari 100`}
                            title="Skor SUS Rata-rata"
                        />
                        <InfoCard
                            icon="fa-chart-bar"
                            background="warning"
                            value={`${averageSatisfaction} dari 5`}
                            title="Kepuasan Rata-rata"
                        />
                    </div>

                    <AccordionLayout title="Grafik Hasil Dari Setiap Pertanyaan" defaultOpen={true}>
                        <div className="row">
                            {susData.map((item, index) => (
                                <div
                                    className="col-lg-4 col-md-6 mb-4 mx-auto"
                                    key={index}
                                >
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {item.question}
                                            </h5>
                                            <SUSPieChart data={item.data} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionLayout>

                    <AccordionLayout title="Tabel Hasil" defaultOpen={false}>
                        <div>
                            <h1>Hasil SUS</h1>
                            <SUSTableUser data={susSurveyResults} />
                        </div>
                    </AccordionLayout>
                </div>
            </LayoutAccount>
        </>
    );
}
