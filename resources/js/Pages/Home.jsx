import React from "react";
import Layout from "../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Pagination from "../Components/Pagination";
import CardSurvey from "../Components/CardSurvey";

export default function Home() {
    const { surveys, auth } = usePage().props;

    return (
        <>
            <Head>
                <title>Form Survey</title>
            </Head>
            <Layout>
                <div className="container">
                    <div className="row mt-3">
                            {surveys.data.map((survey, index) => (
                                <div
                                    className="col-md-4 mb-4 col-6"
                                    key={index}
                                >
                                    <CardSurvey survey={survey} key={index} />
                                </div>
                            ))}
                    </div>
                </div>

                <Pagination links={surveys.links} align="end" />
            </Layout>
        </>
    );
}
