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
        respondentCount,
        currentSurveyTitle,
        tamSurveyResults,
        calculateDescriptiveStatistics,
        calculateRegression,
        getTAMChartData,
        tamQustions,
    } = usePage().props;

    let idTamCounter = 0;
    const data = JSON.parse(tamQustions[0].questions_data);

    const parsedTamQuestions = data.tam
        ? data.tam.flatMap((variable) =>
              variable.indicators.flatMap((indicator) =>
                  indicator.questions.map((question) => ({
                      id: `${idTamCounter++}`,
                      question: question,
                  }))
              )
          )
        : [];

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
                <title>TAM Result - SurveyPlatform</title>
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
                                    {parsedTamQuestions.map((item, index) => (
                                        <div
                                            className="col-lg-4 col-md-6 mb-4 mx-auto"
                                            key={index}
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 className="card-title">
                                                        {index + 1}.{item.question}
                                                    </h6>
                                                    <PieChart
                                                        data={tamData[index].data}
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

                            {/* <AccordionLayout
                                title="Hasil Statistik Inferensial"
                                defaultOpen={true}
                            >
                                {tamSurveyResults.length > 0 ? (
                                    <div>
                                        <TAMTable
                                            data={calculateRegression}
                                            type={"regressionTable"}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        Tidak ada data
                                    </div>
                                )}
                            </AccordionLayout> */}

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
