import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";

export default function Sidebar() {
    //destruct URL from props
    const { url } = usePage();

    return (
        <>
            <div className="list-group list-group-flush">
                    <Link
                        href="/account/dashboard"
                        className={`${
                            url.startsWith("/account/dashboard")
                                ? "active list-group-item list-group-item-action list-group-item-light p-3"
                                : "list-group-item list-group-item-action list-group-item-light p-3"
                        }`}
                    >
                        <i className="fa fa-tachometer-alt me-2"></i> Dashboard
                    </Link>
                    <Link
                        href="/account/surveys"
                        className={`${
                            url.startsWith("/account/surveys")
                                ? "active list-group-item list-group-item-action list-group-item-light p-3"
                                : "list-group-item list-group-item-action list-group-item-light p-3"
                        }`}
                    >
                        <i className="fa fa-scroll me-2"></i> Surveys
                    </Link>
                    <Link
                        href="/account/users"
                        className={`${
                            url.startsWith("/account/users")
                                ? "active list-group-item list-group-item-action list-group-item-light p-3"
                                : "list-group-item list-group-item-action list-group-item-light p-3"
                        }`}
                    >
                        <i className="fa fa-users me-2"></i> Users
                    </Link>
            </div>
        </>
    );
}
