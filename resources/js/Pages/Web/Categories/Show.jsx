import React from "react";
import LayoutWeb from "../../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import CardItem from "../../../Components/CardItem";

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
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <div className="card-body border-0 shadow-sm rounded-3 mb-4">
                                        Surveys Category :{" "}
                                        <strong>{category.name}</strong>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    {surveys.map((survey, index) => (
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutWeb>
        </>
    );
}
