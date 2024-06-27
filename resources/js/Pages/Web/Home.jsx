import React, { useEffect } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Pagination from "../../Components/Pagination";
import CardItem from "../../Components/CardItem";
import CardCategory from "../../Components/CardCategory";

export default function Home() {
    const { surveys, categories, articles } = usePage().props;

    useEffect(() => {
        const handleVisibilityChange = () => {
            document.title = document.hidden
                ? "Survey Platform 👋😊"
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
                <title>Survey Platform</title>
            </Head>
            <Layout>
                <div className="container" style={{ marginTop: "80px" }}>
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
                                        <h2>
                                            Hubungkan pengembang dan pengguna
                                            dengan UI/UX
                                        </h2>
                                        <p>
                                            Survey Platform membantu pengembang
                                            menemukan UI/UX kebutuhan mereka
                                            dengan mudah, cepat, dan akurat.
                                        </p>
                                    </div>

                                    <div className="col-lg-6 d-flex justify-content-center align-items-end">
                                        <img
                                            src="assets\images\Homepage-Brown.png"
                                            style={{
                                                maxHeight: "320px",
                                                maxWidth: "320px",
                                            }}
                                            alt="Home Img"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="row justify-content-between mb-3">
                                        <div className="col-md-6 col-6 text-start">
                                            <strong> Categories</strong>
                                        </div>
                                        <div className="col-md-6 col-6 text-end">
                                            <Link
                                                href="/categories"
                                                className="text-dark"
                                            >
                                                <strong className="btn-text">
                                                    See More{" "}
                                                    <i className="fa fa-long-arrow-alt-right"></i>
                                                </strong>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center">
                                        {categories.map((category, index) => (
                                            <div
                                                className="col-lg-2 col-md-4 col-6 mb-4"
                                                key={index}
                                            >
                                                <CardCategory
                                                    category={category}
                                                    key={index}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="row justify-content-between mb-3 mt-4">
                                        <div className="col-md-6 col-6 text-start">
                                            <strong> Latest Surveys</strong>
                                        </div>
                                        <div className="col-md-6 col-6 text-end">
                                            <Link
                                                href="/surveys"
                                                className="text-dark"
                                            >
                                                <strong className="btn-text">
                                                    See More{" "}
                                                    <i className="fa fa-long-arrow-alt-right"></i>
                                                </strong>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="row mb-5 justify-content-center">
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

                                <div>
                                    <div className="row justify-content-between mb-3 mt-4">
                                        <div className="col-md-6 col-6 text-start">
                                            <strong> Articles</strong>
                                        </div>
                                        <div className="col-md-6 col-6 text-end">
                                            <Link
                                                href="/articles"
                                                className="text-dark"
                                            >
                                                <strong className="btn-text">
                                                    See More{" "}
                                                    <i className="fa fa-long-arrow-alt-right"></i>
                                                </strong>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center mb-5">
                                        {articles.map((article, index) => (
                                            <div
                                                className="col-6 col-md-4 mb-4"
                                                key={index}
                                            >
                                                <CardItem
                                                    type={"article"}
                                                    data={article}
                                                    link={`/articles/${article.id}/${article.slug}`}
                                                />
                                            </div>
                                        ))}
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
