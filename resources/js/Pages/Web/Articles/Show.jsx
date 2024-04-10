import React from "react";
import LayoutWeb from "../../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";

export default function ArticleShow() {
    const { article } = usePage().props;

    return (
        <LayoutWeb>
            <Head>
                <title>{article.title}</title>
            </Head>
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="fade-in">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="col-md-12">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="img-fluid rounded mb-4 mx-auto d-block"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "300px",
                                        objectFit: "cover",
                                    }}
                                />

                                <h1 className="fw-bold fs-1">
                                    {article.title}
                                </h1>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        {article.user.first_name +
                                            " " +
                                            article.user.surname}
                                    </div>
                                    <div className="col-md-6 text-end">
                                        {article.updated_at}
                                    </div>
                                </div>
                                <hr />
                                <div
                                    className="mt-4"
                                    dangerouslySetInnerHTML={{
                                        __html: article.content,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWeb>
    );
}
