import React, { useState } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AuthField from "../../Components/AuthField";

export default function Login() {
    //destruct props "errors"
    const { errors} = usePage().props;

    //state user
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //function "loginHandler"
    const loginHandler = async (e) => {
        e.preventDefault();

        //login
        Inertia.post("/login", {
            email: email,
            password: password,
        });
    };

    return (
        <>
            <Head>
                <title>Login Account - Survey Platform</title>
            </Head>
            <Layout>
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
