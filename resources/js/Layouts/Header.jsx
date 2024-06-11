import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

function AuthMenu() {
    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.clear();
        Inertia.post("/logout");
    };

    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link href="/account/dashboard" className="btn text-white">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <button className="btn text-white" onClick={handleLogout}>
                    Logout
                </button>
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

function Layout({ children, footerVisible = true }) {
    const { auth } = usePage().props;
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-green shadow fixed-top p-0">
                <div className="container">
                    <Link
                        href="/"
                        className="navbar-brand d-flex align-items-center text-white text-decoration-none"
                    >
                        <img
                            src="/assets/images/logo.png"
                            width="50"
                            alt="Logo"
                        />
                        <h5 className="mb-0 ml-2">
                            <strong>Survey </strong> Platform UI/UX
                        </h5>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={`collapse navbar-collapse justify-content-end ${
                            menuVisible ? "show" : ""
                        }`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav">
                            {auth ? <AuthMenu /> : <NonAuthMenu />}
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ minHeight: "86vh" }}>{children}</div>
            {footerVisible ? (
                <div>
                    <footer
                        className="text-center text-lg-start text-white py-3 mt-auto"
                        style={{ backgroundColor: "#1c2331" }}
                    >
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-12 col-md-4 d-flex justify-content-md-start justify-content-center mb-3 mb-md-0">
                                    @{new Date().getFullYear()}
                                    &nbsp;
                                    <abbr title="Jurusan Teknologi Informasi">
                                        JTI
                                    </abbr>
                                    &nbsp;-&nbsp;
                                    <abbr title="Politeknik Negeri Malang">
                                        POLINEMA
                                    </abbr>
                                </div>

                                {/* <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-3 mb-md-0">
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <p className="mb-0 me-md-2 text-center text-md-start">
                                            Developed with dedication by
                                        </p>
                                        <a
                                            href="https://www.linkedin.com/in/naufal357/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-decoration-none text-white"
                                        >
                                            Naufal Rozan
                                        </a>
                                    </div>
                                </div> */}

                                <div className="col-12 col-md-4 d-flex flex-column align-items-md-end align-items-center ">
                                    <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end">
                                        <a
                                            href="/"
                                            className="text-decoration-none text-white mb-2 me-md-3 mb-md-0"
                                        >
                                            Home
                                        </a>
                                        <a
                                            href="/articles"
                                            className="text-decoration-none text-white mb-2 me-md-3 mb-md-0"
                                        >
                                            Blog
                                        </a>
                                        <a
                                            href="/about"
                                            className="text-decoration-none text-white"
                                        >
                                            About
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            ) : null}
        </>
    );
}

export default Layout;
