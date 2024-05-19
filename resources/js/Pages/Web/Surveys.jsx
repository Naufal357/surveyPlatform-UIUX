import React from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import CardItem from "../../Components/CardItem";
import Pagination from "../../Components/Pagination";

export default function Surveys() {
    const { surveys } = usePage().props;

    return (
        <>
            <Head>
                <title>Surveys - Survey Platform</title>
            </Head>
            <Layout>
                <div className="container mt-80 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div className="alert alert-warning border-0 shadow-sm rounded-3">
                                            <strong>All Surveys</strong>
                                        </div>
                                    </div>

                                    {surveys.data.map((survey, index) => (
                                        <div
                                            className="col-md-4 mb-4 col-6"
                                            key={index}
                                        >
                                            <CardItem
                                                type={"survey"}
                                                data={survey}
                                                link={`/form/${survey.id}/${survey.slug}`}
                                            />
                                        </div>
                                    ))}

                                    <div className="col-md-12 mt-4 mb-5">
                                        <Pagination
                                            links={surveys.links}
                                            align={"center"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
