import React from "react";
import Layout from "../../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import CardItem from "../../../Components/CardItem";
import Pagination from "../../../Components/Pagination";

export default function Articles() {
    const { articles } = usePage().props;

    return (
        <>
            <Head>
                <title>Articles - Article Platform</title>
            </Head>
            <Layout>
                <div className="container mt-80 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div className="alert alert-warning border-0 shadow-sm rounded-3">
                                            <strong>All Articles</strong>
                                        </div>
                                    </div>

                                    {articles.data.map((article, index) => (
                                        <div
                                            className="col-md-4 mb-4 col-6"
                                            key={index}
                                        >
                                            <CardItem
                                                type={"article"}
                                                data={article}
                                                link={`/articles/${article.id}/${article.slug}`}
                                            />
                                        </div>
                                    ))}

                                    <div className="col-md-12 mt-4 mb-5">
                                        <Pagination
                                            links={articles.links}
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
