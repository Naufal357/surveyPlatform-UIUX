import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Sidebar from "../Components/Sidebar";

export default function LayoutAccount({ children }) {
    //get props auth
    const { auth } = usePage().props;
    //state toggle
    const [sidebarToggle, setSidebarToggle] = useState(false);

    //function toggle hanlder
    const sidebarToggleHandler = (e) => {
        e.preventDefault();

        if (!sidebarToggle) {
            //add class on body
            document.body.classList.add("sb-sidenav-toggled");

            //set state "sidebarToggle" to true
            setSidebarToggle(true);
        } else {
            //remove class on body
            document.body.classList.remove("sb-sidenav-toggled");

            //set state "sidebarToggle" to false
            setSidebarToggle(false);
        }
    };

    //function logout
    const logoutHandler = async (e) => {
        e.preventDefault();

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
                                        title={auth.user.name}
                                        className="fw-bold"
                                        id="basic-nav-dropdown"
                                    >
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
