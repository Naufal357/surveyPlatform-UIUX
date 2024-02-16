import React from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import StyledDropzone from "../../Components/FileUpload";

export default function Home() {
    return (
        <>
            <Head>
                <title>Survey Platform</title>
            </Head>
            <Layout>
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-80">
                        <div className="text-center mb-4">
                            <img src="/assets/images/logo.png" width={"60"} />
                            <h4>
                                <strong>Survey</strong> Platform
                            </h4>
                        </div>
                        <StyledDropzone />
                    </div>
                </div>
            </Layout>
        </>
    );
}
