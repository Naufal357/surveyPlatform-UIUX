import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";

function AuthMenu() {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link href="/account/dashboard" className="btn text-white">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="btn text-white"
                    href="/logout"
                    method="POST"
                    as="button"
                >
                    Logout
                </Link>
            </li>
        </ul>
    );
}

function NonAuthMenu() {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link href="/login" className="btn text-white">
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/register" className="btn text-white">
                    Register
                </Link>
            </li>
        </ul>
    );
}

function Layout({ children }) {
    const { auth } = usePage().props;
    return (
        <>
            <div id="page-content-wrapper" style={{ width: "100%" }}>
                <nav className="navbar navbar-expand-md navbar-dark bg-green shadow fixed-top p-0">
                    <div className="container">
                        <div className="col-md-12">
                            <header className="d-flex justify-content-between align-items-center">
                                <div className="navbar-brand">
                                    <Link
                                        href="/"
                                        className="d-flex align-items-center text-white text-decoration-none"
                                    >
                                        <img
                                            src="/assets/images/logo.png"
                                            width="50"
                                            alt="Logo"
                                        />
                                        <h5 className="mb-0 ml-2">
                                            <strong>Survey </strong> Platform
                                            UI/UX
                                        </h5>
                                    </Link>
                                </div>
                                <div className="navbar">
                                    <ul className="nav navbar-nav navbar-right">
                                        {auth ? <AuthMenu /> : <NonAuthMenu />}
                                    </ul>
                                </div>
                            </header>
                        </div>
                    </div>
                </nav>
            </div>

            {children}
        </>
    );
}

export default Layout;
