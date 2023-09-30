import React from "react";
import { Head, Inertia, usePage, Link } from "@inertiajs/inertia-react";
import LayoutAccount from "../../Layouts/Account";
import AccordionLayout from "../../Layouts/Accordion";
import SUSPieChart from "../../Components/SUSPieChart";
import InfoCard from "../../Components/CardInfo";
import SUSTableUser from "../../Components/SUSTableUser";

export default function Dashboard() {
    const {
        auth,
        survey,
        surveyTitles,
        responses,
        respondentCount,
        averageSUS,
        classifySUSGrade,
        currentSurveyTitle,
        getSUSChartData,
        susSurveyResults,
    } = usePage().props;


    console.log(responses);

    const questionTexts = [
        `1. Saya berpikir akan menggunakan sistem ${survey.theme} ini lagi.`,
        `2. Saya merasa sistem ${survey.theme} ini rumit untuk digunakan.`,
        `3. Saya merasa sistem ${survey.theme} ini mudah digunakan.`,
        `4. Saya membutuhkan bantuan dari orang lain atau teknisi dalam menggunakan sistem ${survey.theme} ini.`,
        `5. Saya merasa fitur-fitur sistem ${survey.theme} ini berjalan dengan semestinya.`,
        `6. Saya merasa ada banyak hal yang tidak konsisten (tidak serasi pada sistem ${survey.theme} ini).`,
        `7. Saya merasa orang lain akan memahami cara menggunakan sistem ${survey.theme} ini dengan cepat.`,
        `8. Saya merasa sistem ${survey.theme} ini membingungkan.`,
        `9. Saya merasa tidak ada hambatan dalam menggunakan sistem ${survey.theme} ini.`,
        `10. Saya perlu membiasakan diri terlebih dahulu sebelum menggunakan sistem ${survey.theme} ini.`,
    ];



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
                        "#FFA600", // Sangat Tidak Setuju
                        "#FF6361", // Tidak Setuju
                        "#BC5090", // Netral
                        "#58508D", // Setuju
                        "#003F5C", // Sangat Setuju
                    ],
                },
            ],
        };
    };

    const susData = Object.keys(getSUSChartData.original).map((question) => ({
        question,
        data: getChartData(getSUSChartData.original[question]),
    }));

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };
const handleExport = () => {
    window.location.href = `/account/responses/${survey.id}/export`;
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
                        <InfoCard
                            icon="fa-chart-pie"
                            background="primary"
                            value={`${averageSUS} dari 100`}
                            title="Skor SUS Rata-rata"
                        />
                        <InfoCard
                            icon="fa-star"
                            background="#FFD700"
                            value={classifySUSGrade}
                            title="Kategori Nilai SUS"
                        />
                        {/* <InfoCard
                        icon="fa-circle-notch fa-spin"
                        background="info"
                        value={`${angka} menit`}
                        title="Durasi Survei Rata-Rata"
                    /> */}
                    </div>

                    <AccordionLayout
                        title="Grafik Hasil Dari Setiap Pertanyaan"
                        defaultOpen={true}
                    >
                        <div className="row">
                            {susData.map((item, index) => (
                                <div
                                    className="col-lg-4 col-md-6 mb-4 mx-auto"
                                    key={index}
                                >
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title">
                                                {questionTexts[index]}
                                            </h6>
                                            <SUSPieChart data={item.data} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AccordionLayout>

                    <AccordionLayout title="Tabel Hasil" defaultOpen={false}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4>Hasil SUS</h4>
                            <button
                                className="btn btn-success"
                                onClick={handleExport}
                            >
                                Export to Excel
                            </button>
                        </div>
                        <SUSTableUser data={susSurveyResults} />
                    </AccordionLayout>
                </div>
            </LayoutAccount>
        </>
    );
}
