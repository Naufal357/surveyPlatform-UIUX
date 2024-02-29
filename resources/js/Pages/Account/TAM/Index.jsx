import React from "react";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import hasAnyPermission from "../../../Utils/Permissions";
import LayoutAccount from "../../../Layouts/Account";
import AccordionLayout from "../../../Layouts/Accordion";
import InfoCard from "../../../Components/CardInfo";
import PieChart from "../../../Components/PieChart";
import TAMTable from "../../../Components/TAMTable";

export default function Dashboard() {
    const {
        auth,
        survey,
        surveyTitles,
        responses,
        respondentCount,
        currentSurveyTitle,
        test,
        tamSurveyResults,
        calculateDescriptiveStatistics,
        getTAMChartData,
    } = usePage().props;

    const questionTexts = [
        `1. Saya tidak mengalami kesulitan menggunakan ${survey.theme}.`,
        `2. Dengan adanya ${survey.theme} dapat mencapai tujuan pekerjaan saya.`,
        `3. Secara keseluruhan Saya merasa ${survey.theme} mudah dipahami.`,
        `4. ${survey.theme} ini menjadikan pekerjaan saya lebih mudah.`,
        `5. Menggunakan ${survey.theme} dapat meningkatkan kemampuan saya.`,
        `6. Secara keseluruhan saya merasa ${survey.theme} memiliki banyak manfaat.`,
        `7. Saya menerima penerapan ${survey.theme} ini`,
        `8. Saya menolak untuk menggunkan ${survey.theme} selain ini`,
        `9. Secara keseluruhan saya menikmati penggunaan ${survey.theme} ini`,
        `10. Saya berharap ${survey.theme} ini akan selalu digunakan di masa depan.`,
        `11. Saya termotivasi untuk tetap menggunakan ${survey.theme} untuk dimasa yang akan datang.`,
        `12. Saya selalu menggunakan ${survey.theme} ini dalam kondisi apapun.`,
        `13. Saya menggunakan ${survey.theme} ini sesuai dengan prosedur yang telah diberikan.`,
        `14. Saya menggunakan ${survey.theme} ini secara jujur sesuai ketentuan dan prosedur.`,
        `15. Saya menggunakan ${survey.theme} ini sesuai dengan durasi waktu yang telah ditentukan secara real time.`,
    ];

    //Fungsi untuk menghitung data chart
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

    const tamData = Object.keys(getTAMChartData.original).map((question) => ({
        question,
        data: getChartData(getTAMChartData.original[question]),
    }));

    const handleExport = () => {
        Inertia.get("/account/responses/tam/${survey.id}/export");
    };

    return (
        <>
            <Head>
                <title>SUS Result - SurveyPlatform</title>
            </Head>
            <LayoutAccount>
                <div className="m-3">
                    <div className="row alert alert-success border-0 shadow-sm mb-2">
                        <div className="col-md-6">
                            Selamat Datang, <strong>{auth.user.name}</strong>{" "}
                            <br />
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
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        if (selectedId) {
                                            Inertia.get(
                                                `/account/tam/${selectedId}`
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
                    {hasAnyPermission(["sus.statistics"]) && (
                        <div className="row mt-2">
                            <InfoCard
                                icon="fa-users "
                                background="success"
                                value={respondentCount}
                                title="Jumlah Responden"
                            />
                            {/* <InfoCard
                                icon="fa-chart-pie"
                                background="primary"
                                value={`${averageSUS} dari 100`}
                                title="Skor SUS Total"
                            />
                            <InfoCard
                                icon="fa-star"
                                background="#FFD700"
                                value={classifySUSGrade}
                                title="Kategori Nilai SUS"
                            /> */}
                        </div>
                    )}

                    {hasAnyPermission(["sus.charts"]) && (
                        <AccordionLayout
                            title="Grafik Hasil Dari Setiap Pertanyaan"
                            defaultOpen={false}
                        >
                            {tamData.length > 0 ? (
                                <div className="row">
                                    {tamData.map((item, index) => (
                                        <div
                                            className="col-lg-4 col-md-6 mb-4 mx-auto"
                                            key={index}
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 className="card-title">
                                                        {questionTexts[index]}
                                                    </h6>
                                                    <PieChart
                                                        data={item.data}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center">
                                    Tidak ada data
                                </div>
                            )}
                        </AccordionLayout>
                    )}

                    {hasAnyPermission(["sus.responses"]) && (
                        <>
                            <AccordionLayout
                                title="Hasil Statistik Deskriptif"
                                defaultOpen={false}
                            >
                                {tamSurveyResults.length > 0 ? (
                                    <div>
                                        <TAMTable
                                            data={
                                                calculateDescriptiveStatistics
                                            }
                                            type={"descriptiveStatisticsTable"}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        Tidak ada data
                                    </div>
                                )}
                            </AccordionLayout>

                            <AccordionLayout
                                title="Hasil Statistik Inferensial"
                                defaultOpen={true}
                            >
                                
                            </AccordionLayout>

                            <AccordionLayout
                                title="Data Responses TAM"
                                defaultOpen={false}
                            >
                                {tamSurveyResults.length > 0 ? (
                                    <div>
                                        <TAMTable
                                            data={tamSurveyResults}
                                            type={"responsesTable"}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        Tidak ada data
                                    </div>
                                )}
                            </AccordionLayout>
                        </>
                    )}
                </div>
            </LayoutAccount>
        </>
    );
}
