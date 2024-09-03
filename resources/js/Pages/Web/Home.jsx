import React, { useEffect } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import CardHomepage from "../../Components/CardHomepage";
import CardItem from "../../Components/CardItem";
import CardCategory from "../../Components/CardCategory";

export default function Home() {
    const { surveys, categories, articles, auth } = usePage().props;

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

    const handleStartNow = () => {
        if (auth) {
            Inertia.get("/account/dashboard");
        } else {
            Inertia.get("/register");
        }
    };

    return (
        <>
            <Head>
                <title>Survey Platform</title>
            </Head>
            <Layout>
                <div style={{ marginTop: "80px" }}>
                    <div className="fade-in">
                        <div className="justify-content-center">
                            <div className="col-12">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
                                            <h2 className="fw-bold display-10">
                                                Solusi pengujian untuk
                                                pengalaman pengguna terbaik
                                            </h2>
                                            <p>
                                                Survey Platform diciptakan untuk
                                                membantu pengembang dalam
                                                menemukan pengalaman UI/UX yang
                                                paling cocok dengan kebutuhan
                                                dan keinginan pengguna.
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
                                </div>

                                <div className="mt-5 p-4 section-cta">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <h2 className=" display-10 text-center">
                                                Kenapa Menggunakan Survey
                                                Platform UI/UX ?
                                            </h2>
                                        </div>

                                        <div className="row justify-content-center mt-5">
                                            <div className="col-md-4 mb-4">
                                                <CardHomepage
                                                    icon="fas fa-file-invoice"
                                                    title="Template Pertanyaan Siap
                                                    Pakai"
                                                    description="Tersedia Template Pertanyaan Siap Pakai untuk mempermudah dalam pengujian UI/UX yang dapat disesuaikan."
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CardHomepage
                                                    icon="fas fa-chart-bar"
                                                    title="Dilengkapi Dengan Grafik Dan
                                                    Metrik"
                                                    description="Menampilkan hasil pengujian
                                                    dalam bentuk grafik yang
                                                    informatif dan mudah
                                                    dipahami."
                                                />
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <CardHomepage
                                                    icon="fas fa-calculator"
                                                    title="Penghitungan Metrik Usability"
                                                    description="Menggunakan berbagai metrik evaluasi untuk menyusun dan mengukur hasil dari pengujian yang dilakukan."
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-3">
                                            <button
                                                className="btn btn-style btn-lg"
                                                onClick={handleStartNow}
                                            >
                                                Mulai Sekarang
                                            </button>
                                            <p className="mt-3">
                                                Gabung sekarang dan mulai
                                                tingkatkan pengalaman pengguna
                                                Anda dengan Survey Platform
                                                UI/UX.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="container">
                                    <div className="mt-5">
                                        <div className="row justify-content-between mb-3">
                                            <div className="col-md-6 text-start">
                                                <h4 className="fw-bold">
                                                    {" "}
                                                    Categories
                                                </h4>
                                                <p>
                                                    Temukan berbagai kategori
                                                    yang kami sediakan untuk
                                                    menemukan kebutuhan Anda.
                                                </p>
                                            </div>
                                            <div className="col-md-6 text-end">
                                                <Link
                                                    href="/categories"
                                                    className="text-dark"
                                                >
                                                    <h5 className="btn-text fw-bold">
                                                        See More{" "}
                                                        <i className="fa fa-long-arrow-alt-right"></i>
                                                    </h5>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="row justify-content-center">
                                            {categories.map(
                                                (category, index) => (
                                                    <div
                                                        className="col-lg-2 col-md-4 col-6 mb-4"
                                                        key={index}
                                                    >
                                                        <CardCategory
                                                            category={category}
                                                            key={index}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="row justify-content-between mb-3 mt-4">
                                            <div className="col-md-6 col-6 text-start">
                                                <h4 className="fw-bold">
                                                    Latest Surveys
                                                </h4>
                                                <p>
                                                    Temukan survei terbaru untuk
                                                    berkontribusi dalam
                                                    pengembangan UI/UX.
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">
                                                <Link
                                                    href="/surveys"
                                                    className="text-dark"
                                                >
                                                    <h5 className="btn-text fw-bold">
                                                        See More{" "}
                                                        <i className="fa fa-long-arrow-alt-right"></i>
                                                    </h5>
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
                                                <h4 className="fw-bold">
                                                    {" "}
                                                    Articles
                                                </h4>
                                                <p>
                                                    Temukan artikel terbaru
                                                    untuk mendapatkan wawasan
                                                    mengenai berbagai topik.
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-6 text-end">
                                                <Link
                                                    href="/articles"
                                                    className="text-dark"
                                                >
                                                    <h5 className="btn-text fw-bold">
                                                        See More{" "}
                                                        <i className="fa fa-long-arrow-alt-right"></i>
                                                    </h5>
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
                </div>
            </Layout>
        </>
    );
}
