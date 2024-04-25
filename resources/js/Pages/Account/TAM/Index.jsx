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
        demographicRespondents,
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

    const getDemographicData = (data, category) => {
        const labels = Object.keys(data);
        const counts = Object.values(data);

        return {
            labels,
            datasets: [
                {
                    label: category,
                    data: counts,
                },
            ],
        };
    };

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

    const demographicsData = demographicRespondents
        ? Object.keys(demographicRespondents).map((category) => ({
              category,
              data: getDemographicData(
                  demographicRespondents[category],
                  category
              ),
          }))
        : [];

    const tamData = Object.keys(getTAMChartData.original).map((question) => ({
        question,
        data: getChartData(getTAMChartData.original[question]),
    }));

    const handleExport = () => {
        console.log(survey.id);
        window.location.href = `/account/responses/tam/${survey.id}/export`;
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
                        <div className="col-md-6 text-end">
                            <div className="mb-2">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ width: "100%" }}
                                    >
                                        Pilih Survey
                                    </button>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="dropdownMenuButton"
                                        style={{
                                            maxHeight: "200px",
                                            width: "100%",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        {surveyTitles.map((survey) => (
                                            <li key={survey.id}>
                                                <a
                                                    className="dropdown-item"
                                                    href="#"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        Inertia.get(
                                                            `/account/sus/${survey.id}`
                                                        );
                                                    }}
                                                >
                                                    {survey.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {hasAnyPermission(["tam.statistics"]) && (
                        <div className="row mt-2">
                            <InfoCard
                                icon="fa-users "
                                background="success"
                                value={respondentCount}
                                title="Jumlah Responden"
                            />
                        </div>
                    )}

                    <AccordionLayout
                        title="Demografi Responden"
                        defaultOpen={true}
                    >
                        {demographicsData.length > 0 ? (
                            <div className="row justify-content-center">
                                {demographicsData.map((item, index) => (
                                    <div
                                        className="col-lg-4 col-md-6 mb-4 mx-auto"
                                        key={index}
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title text-center">
                                                    {item.category
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        item.category
                                                            .slice(1)
                                                            .replace(
                                                                /_/g,
                                                                " "
                                                            )}{" "}
                                                </h6>
                                                <PieChart data={item.data} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center">Tidak ada data</div>
                        )}
                    </AccordionLayout>

                    {hasAnyPermission(["tam.charts"]) && (
                        <AccordionLayout
                            title="Grafik Hasil Dari Setiap Pertanyaan"
                            defaultOpen={true}
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
                                                        {index + 1}.
                                                        {item.question}
                                                    </h6>
                                                    <PieChart
                                                        data={
                                                            tamData[index].data
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

                    {hasAnyPermission(["tam.responses"]) && (
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
                                title="Data Responses TAM"
                                defaultOpen={false}
                            >
                                {tamSurveyResults.length > 0 ? (
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h4>Hasil TAM</h4>
                                            {hasAnyPermission([
                                                "tam.export",
                                            ]) && (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={handleExport}
                                                >
                                                    Export to Excel
                                                </button>
                                            )}
                                        </div>
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
