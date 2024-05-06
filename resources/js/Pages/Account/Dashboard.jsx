import React, { useEffect } from "react";
import { Head, Inertia, usePage, Link } from "@inertiajs/inertia-react";
import Pagination from "../../Components/Pagination";
import LayoutAccount from "../../Layouts/Account";
import AccordionLayout from "../../Layouts/Accordion";
import CardContent from "../../Layouts/CardContent";
import TableDashboardSurvey from "../../Components/TableDashboardSurvey";
import TableDashboardFilledSurvey from "../../Components/TableDashboardfilledSurvey";

export default function Dashboard() {
    const { auth, surveys, surveyData, filledOutSurvey } = usePage().props;

    useEffect(() => {
        const handleVisibilityChange = () => {
            document.title = document.hidden
                ? "Come back 😔"
                : "Survey Platform";
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    return (
        <>
            <Head>
                <title>Dashboard - SurveyPlatform</title>
            </Head>
            <LayoutAccount>
                <div className="m-3">
                    <div className="row alert alert-success border-0 shadow-sm mb-2">
                        <div className="m-3">
                            <div className="col-md-6">
                                Selamat Datang,{" "}
                                <strong>{`${auth.user.first_name} ${auth.user.surname}`}</strong>{" "}
                                <br />
                            </div>
                        </div>
                    </div>
                    <AccordionLayout
                        title="Jumlah Respons Setiap Survey"
                        defaultOpen={true}
                    >
                        {surveyData.length > 0 ? (
                            <TableDashboardSurvey
                                surveyData={surveyData}
                                surveys={surveys}
                            />
                        ) : (
                            <div className="text-center">Tidak ada data</div>
                        )}

                        <Pagination links={surveys.links} align={"end"} />
                    </AccordionLayout>
                    <AccordionLayout
                        title="Survey Yang Telah Diisi"
                        defaultOpen={false}
                    >
                        {filledOutSurvey.length > 0 ? (
                            <>
                                <TableDashboardFilledSurvey
                                    surveyFilled={filledOutSurvey}
                                />

                                <Pagination
                                    links={filledOutSurvey.links}
                                    align={"end"}
                                />
                            </>
                        ) : (
                            <div className="text-center">Tidak ada data</div>
                        )}
                    </AccordionLayout>
                </div>
            </LayoutAccount>
        </>
    );
}
