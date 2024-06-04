import React, { useState } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AuthField from "../../Components/AuthField";

export default function Login() {
    const { errors} = usePage().props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();

        Inertia.post("/login", {
            email: email,
            password: password,
            remember: rememberMe,
        });
    };

    return (
        <>
            <Head>
                <title>Login Account - Survey Platform</title>
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
                                            LOGIN ACCOUNT
                                        </h6>
                                        <hr />
                                    </div>
                                    <form onSubmit={loginHandler}>
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
                                        <AuthField
                                            icon="fa fa-lock"
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Password"
                                            error={errors.password}
                                        />
                                        <div className="row">
                                            <div className="form-group form-check mb-3 col-6">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="rememberMe"
                                                    checked={rememberMe}
                                                    onChange={(e) =>
                                                        setRememberMe(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <label className="form-check-label">
                                                    Remember Me
                                                </label>
                                            </div>
                                            <div className="col-6 d-flex flex-column align-items-end">
                                                <Link href="/forgot-password">
                                                    Forgot Password
                                                </Link>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-success shadow-sm rounded-sm px-4 w-100"
                                            type="submit"
                                        >
                                            LOGIN
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="register text-center mt-3">
                                Need an account?{" "}
                                <Link href="/register">Register!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
