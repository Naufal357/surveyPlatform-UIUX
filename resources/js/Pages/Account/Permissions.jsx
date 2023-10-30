import React from "react";
import LayoutAccount from "../../Layouts/Account";
import { Head, usePage } from "@inertiajs/inertia-react";
import Pagination from "../../Components/Pagination";

export default function PermissionIndex() {
    const { permissions } = usePage().props;

    return (
        <>
            <Head>
                <title>Permissions - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-key"></i> Permissions
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    style={{ width: "5%" }}
                                                >
                                                    No.
                                                </th>
                                                <th scope="col">
                                                    Permission Name
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {permissions.data.map(
                                                (permission, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            {++index +
                                                                (permissions.current_page -
                                                                    1) *
                                                                    permissions.per_page}
                                                        </td>
                                                        <td>
                                                            {permission.name}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination
                                    links={permissions.links}
                                    align={"end"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
