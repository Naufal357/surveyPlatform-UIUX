import React from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";
import InfoCard from "../../Components/CardInfo";

export default function About() {
    const { usersCount, surveysCount } = usePage().props;
    
    
    return (
        <>
            <Head>
                <title>About - Survey Platform</title>
            </Head>
            <Layout>
                <div className="container mt-80 mb-5">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>About Us</h1>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-4 text-center">
                            <img
                                src="https://img.freepik.com/free-vector/isometric-style-cms-concept_23-2148807946.jpg"
                                alt="Usability Testing"
                                className="img-fluid rounded shadow-sm"
                                style={{
                                    maxWidth: "100%",
                                    height: "400px",
                                }}
                            />
                        </div>
                        <div className="col-md-8">
                            <p>
                                Situs web kami bertujuan untuk menyediakan
                                layanan pengujian kegunaan yang komprehensif
                                menggunakan metodologi yang telah terbukti
                                seperti System Usability Scale (SUS) dan
                                Technology Acceptance Model (TAM). Pengujian
                                kegunaan sangat penting dalam memastikan bahwa
                                produk memenuhi kebutuhan pengguna dan
                                meningkatkan kepuasan pengguna.
                            </p>
                            <ul>
                                <li>Pembuatan survei yang komprehensif</li>
                                <li>Pengumpulan dan analisis data</li>
                                <li>
                                    Laporan yang disesuaikan untuk memenuhi
                                    kebutuhan
                                </li>
                            </ul>
                            <p>
                                Layanan kami memastikan bahwa Anda mendapatkan
                                wawasan berharga tentang pengalaman pengguna dan
                                penerimaan produk.
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <InfoCard
                            icon="fa-users "
                            background="success"
                            value={usersCount}
                            title="Jumlah Pengguna"
                        />
                        <InfoCard
                            icon="fa-poll"
                            background="info"
                            value={surveysCount}
                            title="Jumlah Survei"
                        />
                    </div>
                    {/* <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <img
                                src="https://img.freepik.com/free-vector/mobile-app-development-abstract-set-with-testing-symbols-flat-isolated-vector-illustration_1284-77470.jpg"
                                alt="User Experience"
                                className="img-fluid rounded shadow-sm"
                                style={{
                                    maxWidth: "100%",
                                    height: "300px",
                                }}
                            />
                        </div>
                    </div> */}
                </div>
            </Layout>
        </>
    );
}
