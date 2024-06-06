import React, { useState } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AuthField from "../../Components/AuthField";
import Swal from "sweetalert2";

export default function ForgotPassword() {
    const { errors } = usePage().props;

    const [email, setEmail] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        Inertia.post("/forgot-password", {
            email: email,
        }, {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Check your email to reset your password!",
                    icon: "success",
                    showConfirmButton: true,
                })
            },
        });
    };

    return (
        <>
            <Head>
                <title>Forgot Password - Survey Platform</title>
            </Head>
            <Layout footerVisible={false}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4 mt-80">
                            <div className="text-center mb-4">
                                <img
                                    src="/assets/images/logo.png"
                                    width={"60"}
                                />
                                <h4>
                                    <strong>Survey</strong>{" "}
                                    <small>Platform</small>
                                </h4>
                            </div>
                            <div className="card border-0 rounded-3 shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="text-center">
                                        <h6 className="fw-bold">
                                            Reset Your Password
                                        </h6>
                                        <hr />
                                        <p className="text-muted">
                                            Enter your email address and we will
                                            send you a link to reset your
                                            password.
                                        </p>
                                    </div>
                                    <form onSubmit={resetPasswordHandler}>
                                        <AuthField
                                            icon="fa fa-envelope"
                                            label="Email Address"
                                            type="text"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Email Address"
                                            error={errors.email}
                                        />

                                        <button
                                            className="btn btn-success shadow-sm rounded-sm px-4 w-100"
                                            type="submit"
                                        >
                                            Reset Password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
