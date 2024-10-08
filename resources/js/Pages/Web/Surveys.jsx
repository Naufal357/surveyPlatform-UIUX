import React from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import CardItem from "../../Components/CardItem";
import Pagination from "../../Components/Pagination";
import Search from "../../Components/Search";

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
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <div className="card-body border-0 shadow-sm rounded-3 mb-4">
                                        <div className="row d-flex">
                                            <div className="col-6 justify-content-start mt-2">
                                                <strong>All Surveys</strong>
                                            </div>
                                            <div className="col-6 justify-content-end">
                                                <Search URL={"surveys"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {surveys.data.map((survey, index) => (
                                        <div
                                            className="col-lg-3 col-md-4 col-6 mb-4"
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
