import React from "react";
import LayoutWeb from "../../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import CardSurvey from "../../../Components/CardSurvey";

export default function CategoryShow() {
    const { category, surveys, auth } = usePage().props;

    return (
        <>
            <Head>
                <title>{`${category.name} - Survey Platform`}</title>
            </Head>
            <LayoutWeb>
                <div className="container" style={{ marginTop: "80px" }}>
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="col-md-12">
                                    <div className="alert alert-warning border-0 shadow-sm rounded-3">
                                        Surveys Category :{" "}
                                        <strong>{category.name}</strong>
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
                </div>
            </LayoutWeb>
        </>
    );
}
