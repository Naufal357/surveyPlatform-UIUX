import React from "react";
import { Head, Inertia, usePage, Link } from "@inertiajs/inertia-react";
import hasAnyPermission from "../../Utils/Permissions";
import Pagination from "../../Components/Pagination";
import LayoutAccount from "../../Layouts/Account";
import AccordionLayout from "../../Layouts/Accordion";
import InfoCard from "../../Components/CardInfo";
import TableDashboard from "../../Components/SUSTableDashboard";

export default function Dashboard() {
    const { auth, surveys, surveyData } = usePage().props;

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
                            <TableDashboard
                                surveys={surveyData}
                            ></TableDashboard>
                        ) : (
                            <div className="text-center">Tidak ada data</div>
                        )}

                        <Pagination links={surveys.links} align={"end"} />
                    </AccordionLayout>
                </div>
            </LayoutAccount>
        </>
    );
}
