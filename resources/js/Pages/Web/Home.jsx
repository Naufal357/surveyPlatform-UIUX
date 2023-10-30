import React from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Pagination from "../../Components/Pagination";
import CardSurvey from "../../Components/CardSurvey";
import CardCategory from "../../Components/CardCategory";

export default function Home() {
    const { surveys, categories, auth } = usePage().props;

    return (
        <>
            <Head>
                <title>Survey Platform</title>
            </Head>
            <Layout>
                <div className="container" style={{ marginTop: "80px" }}>
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row justify-content-between mb-3">
                                    <div className="col-md-6 col-6 text-start">
                                        <strong> Categories</strong>
                                    </div>
                                    <div className="col-md-6 col-6 text-end">
                                        <Link
                                            href="/categories"
                                            className="text-dark"
                                        >
                                            <strong>
                                                See More{" "}
                                                <i className="fa fa-long-arrow-alt-right"></i>
                                            </strong>
                                        </Link>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    {categories.map((category, index) => (
                                        <CardCategory
                                            category={category}
                                            key={index}
                                        />
                                    ))}
                                </div>

                                <div className="row justify-content-between mb-3 mt-4">
                                    <div className="col-md-6 col-6 text-start">
                                        <strong> Latest Surveys</strong>
                                    </div>
                                    <div className="col-md-6 col-6 text-end">
                                        <Link
                                            href="/surveys"
                                            className="text-dark"
                                        >
                                            <strong>
                                                See More{" "}
                                                <i className="fa fa-long-arrow-alt-right"></i>
                                            </strong>
                                        </Link>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    {surveys.map((survey, index) => (
                                        <div
                                            className="col-md-4 mb-4 col-6"
                                            key={index}
                                        >
                                            <CardSurvey
                                                survey={survey}
                                                key={index}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row mt-3">
                        {surveys.data.map((survey, index) => (
                            <div className="col-md-4 mb-4 col-6" key={index}>
                                <CardSurvey survey={survey} key={index} />
                            </div>
                        ))}
                    </div>
                    <Pagination links={surveys.links} align="end" /> */}
                </div>
            </Layout>
        </>
    );
}
