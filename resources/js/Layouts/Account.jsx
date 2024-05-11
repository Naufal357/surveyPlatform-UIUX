import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "../Layouts/Sidebar";

export default function LayoutAccount({ children }) {
    const { auth } = usePage().props;
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const sidebarToggleHandler = (e) => {
        e.preventDefault();

        if (!sidebarToggle) {
            document.body.classList.add("sb-sidenav-toggled");

            //set state "sidebarToggle" to true
            setSidebarToggle(true);
        } else {
            document.body.classList.remove("sb-sidenav-toggled");

            setSidebarToggle(false);
        }
    };

    const logoutHandler = async (e) => {
        e.preventDefault();
        localStorage.clear();

        Inertia.post("/logout");
    };

    return (
        <>
            <div className="d-flex sb-sidenav-toggled" id="wrapper">
                <div className="bg-sidebar" id="sidebar-wrapper">
                    <div className="sidebar-heading bg-light text-center">
                        <a href="/" className="btn text-white">
                            <img
                                src="/assets/images/logo.png"
                                width={"50"}
                                alt="Logo"
                            />
                            <strong>Survey</strong> <small>Platform</small>
                        </a>
                    </div>
                    <Sidebar />
                </div>
                <div id="page-content-wrapper" style={{ width: "100%" }}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button
                                className="btn btn-success-dark me-3"
                                onClick={sidebarToggleHandler}
                            >
                                <i className="fa fa-list-ul"></i>
                            </button>
                            <div className="d-flex align-items-center">
                                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                    <NavDropdown
                                        title={
                                            <>
                                                {auth.user.roles.some(
                                                    (role) =>
                                                        role.name ==
                                                        "verified user"
                                                ) && (
                                                    <i className="fas fa-user-check me-2" />
                                                )}
                                                {`${auth.user.first_name} ${auth.user.surname}`}
                                            </>
                                        }
                                        className="fw-bold"
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item>
                                            <Link
                                                href="/account/profile"
                                                className="d-flex align-items-center text-black text-decoration-none"
                                            >
                                                <i className="fa fa-user me-2"></i>
                                                Profile
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                        >
                                            <i className="fa fa-sign-out-alt me-2"></i>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="container-fluid">{children}</div>
                </div>
            </div>
        </>
    );
}
