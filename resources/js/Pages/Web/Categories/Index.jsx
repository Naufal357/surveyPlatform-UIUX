import React from "react";
import Layout from "../../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import CardCategory from "../../../Components/CardCategory";
import Pagination from "../../../Components/Pagination";

export default function CategoryIndex() {
    const { categories } = usePage().props;

    return (
        <>
            <Head>
                <title>Categories - Survey Platform</title>
            </Head>
            <Layout>
                <div className="container mt-80 mb-5">
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div className="card-body border-0 shadow-sm rounded-3 mb-4">
                                            <strong>All Categories</strong>
                                        </div>
                                    </div>

                                    {categories.data.map((category, index) => (
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

                                    <div className="col-md-12 mt-4 mb-5">
                                        <Pagination
                                            links={categories.links}
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
