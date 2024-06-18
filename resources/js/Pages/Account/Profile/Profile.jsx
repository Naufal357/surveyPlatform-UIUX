import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import CardContent from "../../../Layouts/CardContent";
import hasAnyPermission from "../../../Utils/Permissions";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function UserCreate() {
    const { user } = usePage().props;
    const logoutHandler = async (e) => {
        e.preventDefault();
        localStorage.clear();

        Inertia.post("/logout");
    };

    return (
        <>
            <Head>
                <title>Create Users - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mb-5">
                    <div className="col-8">
                        <CardContent title="Profile">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>Nama Lengkap</strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.first_name} {user.surname}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>Email</strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.email}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>Gender</strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.gender}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>Tanggal Lahir</strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.birth_date}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>Profesi</strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.profession}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>
                                                Latar Belakang Pendidikan
                                            </strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.educational_background}
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <div className="col-7 col-lg-3">
                                            <strong>Bergabung sejak</strong>
                                        </div>
                                        <div className="col-7 col-lg-9">
                                            : {user.created_at}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    <div className="col-4">
                        <CardContent title={"Account Settings"}>
                            <nav className="d-flex flex-column">
                                <Link
                                    href="/"
                                    className="btn btn-outline-primary btn-block mb-3"
                                    style={{ width: "100%" }}
                                    type="button"
                                >
                                    Home
                                </Link>
                                {hasAnyPermission(["profile.edit"]) && (
                                    <Link
                                        href={`/account/profile/${user.id}/edit`}
                                        className="btn btn-outline-success btn-block mb-3"
                                        style={{ width: "100%" }}
                                        type="button"
                                    >
                                        Edit Profile
                                    </Link>
                                )}
                                {hasAnyPermission([
                                    "profile.upload.certificate",
                                ]) && (
                                    <Link
                                        href="/account/profile/certificate"
                                        className="btn btn-outline-secondary btn-block mb-3"
                                        style={{ width: "100%" }}
                                        type="button"
                                    >
                                        Upload Certificates
                                    </Link>
                                )}
                                {hasAnyPermission([
                                    "profile.change.password",
                                ]) && (
                                    <Link
                                        href="/account/profile/password"
                                        className="btn btn-outline-warning btn-block mb-3"
                                        style={{ width: "100%" }}
                                        type="button"
                                    >
                                        Change Password
                                    </Link>
                                )}
                                <Link
                                    onClick={logoutHandler}
                                    className="btn btn-outline-danger btn-block mb-3"
                                    style={{ width: "100%" }}
                                    type="button"
                                >
                                    Logout
                                </Link>
                            </nav>
                        </CardContent>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
