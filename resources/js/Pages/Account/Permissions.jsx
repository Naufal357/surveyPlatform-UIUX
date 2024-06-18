import React from "react";
import LayoutAccount from "../../Layouts/Account";
import CardContent from "../../Layouts/CardContent";
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
                <CardContent title="Permissions" icon="fa fa-key">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hovered">
                            <thead className="thead">
                                <tr>
                                    <th scope="col" style={{ width: "5%" }}>
                                        No.
                                    </th>
                                    <th scope="col">Permission Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.data.map((permission, index) => (
                                    <tr key={index}>
                                        <td className="text-center">
                                            {++index +
                                                (permissions.current_page - 1) *
                                                    permissions.per_page}
                                        </td>
                                        <td>{permission.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination links={permissions.links} align={"end"} />
                </CardContent>
            </LayoutAccount>
        </>
    );
}
