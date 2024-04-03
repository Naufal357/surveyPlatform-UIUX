import React from "react";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import hasAnyPermission from "../../../Utils/Permissions";
import LayoutAccount from "../../../Layouts/Account";
import CardContent from "../../../Layouts/CardContent";
import AccordionLayout from "../../../Layouts/Accordion";
import PieChart from "../../../Components/PieChart";
import InfoCard from "../../../Components/CardInfo";
import SUSTableResponses from "../../../Components/SUSTableResponses";

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
        susQuestions,
        resumeDescription,
        averageAnswer,
    } = usePage().props;

    const formatAnswers = (averageAnswer) => {
        return averageAnswer.map((answer, index) => {
            return `Rata-rata (${index + 1}) : ${answer}`;
        });
    };

    let idSusCounter = 0;
    const data = JSON.parse(susQuestions[0].questions_data);

    const parsedSusQuestions = data.sus
        ? Object.entries(data.sus).map(([key, value]) => ({
              id: `${idSusCounter++}`,
              question: value,
          }))
        : [];

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

    const handleExport = () => {
        window.location.href = `/account/responses/sus/${survey.id}/export`;
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
                                    onChange={(event) => {
                                        const selectedId = event.target.value;
                                        if (selectedId) {
                                            Inertia.get(
                                                `/account/sus/${selectedId}`
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
                        <>
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
                                    title="Skor SUS Total"
                                />
                                <InfoCard
                                    icon="fa-star"
                                    background="#FFD700"
                                    value={classifySUSGrade}
                                    title="Kategori Nilai SUS"
                                />
                            </div>
                            {resumeDescription !== null ? (
                                <CardContent
                                    title="Kesimpulan">
                                    <div className="text-center">
                                        {resumeDescription}
                                    </div>
                                    <hr />
                                    <div className="row justify-content-center">
                                        {formatAnswers(averageAnswer).map(
                                            (item, index) => (
                                                <div
                                                    className="text-center col-lg-4 col-md-6 mb-4 mx-auto"
                                                    key={index}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <div className="text-center">
                                                <p>
                                                    Positif jika rata-rata{" "}
                                                    {">= 3.5"}{" "}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <div className="text-center">
                                                <p>
                                                    Netral jika rata-rata{" "}
                                                    {"> 2.5 & < 3.5"}{" "}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12 mb-4">
                                            <div className="text-center">
                                                <p>
                                                    Negatif jika rata-rata{" "}
                                                    {"<= 2.5"}{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            ) : (
                                ""
                            )}
                        </>
                    )}

                    {hasAnyPermission(["sus.charts"]) && (
                        <AccordionLayout
                            title="Grafik Hasil Dari Setiap Pertanyaan"
                            defaultOpen={true}
                        >
                            {susData.length > 0 ? (
                                <div className="row">
                                    {parsedSusQuestions.map((item, index) => (
                                        <div
                                            className="col-lg-4 col-md-6 mb-4 mx-auto"
                                            key={index}
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 className="card-title">
                                                        {index + 1}.{" "}
                                                        {item.question}
                                                    </h6>
                                                    <PieChart
                                                        data={
                                                            susData[index].data
                                                        }
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
                        <AccordionLayout
                            title="Tabel Hasil"
                            defaultOpen={false}
                        >
                            {susSurveyResults.length > 0 ? (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4>Hasil SUS</h4>
                                        {hasAnyPermission(["sus.export"]) && (
                                            <button
                                                className="btn btn-success"
                                                onClick={handleExport}
                                            >
                                                Export to Excel
                                            </button>
                                        )}
                                    </div>
                                    <SUSTableResponses
                                        data={susSurveyResults}
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    Tidak ada data
                                </div>
                            )}
                        </AccordionLayout>
                    )}
                </div>
            </LayoutAccount>
        </>
    );
}
