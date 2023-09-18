import React from "react";
import LayoutAccount from "../../Layouts/Account";
import InfoCard from "../../Components/InfoCard";
// import SUSChart from "../../Components/SUSChart";
import { Head, usePage, Link } from "@inertiajs/inertia-react";

export default function Dashboard() {
    const {
        auth,
        survey,
        surveyTitles,
        responses,
        respondentCount,
        averageSatisfaction,
        averageSUS,
        currentSurveyTitle,
    } = usePage().props;

    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };

    return (
        <>
            <Head>
                <title>Dashboard - SurveyPlatform</title>
            </Head>
            <LayoutAccount>
                <div className="m-3">
                    <div className="row alert alert-success border-0 shadow-sm mb-2">
                        <div className="col-md-6">
                            Selamat Datang, <strong>{auth.name}</strong> <br/>
                            {currentSurveyTitle ? <span>Hasil : <strong>{currentSurveyTitle}</strong></span> : <strong>Pilih survei terlebih dahulu.</strong>}
                        </div>
                        <div className="col-md-6">
                            <div className="mb-2">
                                <select
                                    className="form-select"
                                    onChange={(event) => {
                                        const selectedId = event.target.value;
                                        if (selectedId) {
                                            window.location.replace(
                                                `/account/dashboard/${selectedId}`
                                            );
                                        }
                                    }}
                                >
                                    <option value="">Pilih Survey</option>
                                    {surveyTitles.map((survey) => (
                                        <option
                                            key={survey.id}
                                            value={survey.id}
                                        >
                                            {survey.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <InfoCard
                        icon="fa-users "
                        background="success"
                        value={respondentCount}
                        title="Jumlah Responden"
                    />
                    {/* <InfoCard
                        icon="fa-circle-notch fa-spin"
                        background="info"
                        value={`${angka} menit`}
                        title="Durasi Survei Rata-Rata"
                    /> */}
                    <InfoCard
                        icon="fa-chart-pie"
                        background="primary"
                        value={`${averageSUS} dari 100`}
                        title="Skor SUS Rata-rata"
                    />
                    <InfoCard
                        icon="fa-chart-bar"
                        background="warning"
                        value={`${averageSatisfaction} dari 5`}
                        title="Kepuasan Rata-rata"
                    />
                </div>
            </LayoutAccount>
        </>
    );
}
