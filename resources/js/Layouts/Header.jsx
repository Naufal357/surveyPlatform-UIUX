import React, { useState } from "react";
import { Link, usePage, Inertia } from "@inertiajs/inertia-react";

function AuthMenu() {
    const handleLogout = () => {
        Inertia.post("/logout").then(() => {
            localStorage.clear(); 
        });
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

function Layout({ children }) {
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

            {children}
        </>
    );
}

export default Layout;
