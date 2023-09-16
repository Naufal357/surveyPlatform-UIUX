import React from "react";
import Layout from "../Layouts/Header";
import { Head, usePage } from "@inertiajs/inertia-react";

export default function Home() {
    return (
        <>
            <Head>
                <title>Form Survey</title>
            </Head>
            <Layout>
                <h1>dffd</h1>
                <div className="container">
                    <iframe
                        width="80%"
                        height="560"
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FjzQVivHqw2zMYgh2YZYNhK%2FMasak-Aja%3Ftype%3Ddesign%26node-id%3D2-10%26t%3DSdkHHSxfETTbyfn2-1%26scaling%3Dmin-zoom%26page-id%3D0%253A1%26starting-point-node-id%3D2%253A2%26mode%3Ddesign"
                        allowFullScreen
                    ></iframe>
                    <iframe
                        width="80%"
                        height="450"
                        allowFullScreen
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FjzQVivHqw2zMYgh2YZYNhK%2FMasak-Aja%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DezyaiFFx9poyRVa6-1"
                    ></iframe>
                </div>
            </Layout>
        </>
    );
}
