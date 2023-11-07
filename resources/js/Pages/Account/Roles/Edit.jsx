import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import SelectCheckbox from "../../../Components/SelectCheckbox";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import hasAnyPermission from "../../../Utils/Permissions";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function RoleEdit() {
    const { errors, permissions, role } = usePage().props;

    let filteredPermissions = permissions;

    if (!hasAnyPermission(["roles.index.full"])) {
        filteredPermissions = filteredPermissions.filter(
            (permission) =>
                permission.name !== "users.index.full" &&
                permission.name !== "roles.index.full"
        );
    }

    const [name, setName] = useState(role.name);
    const [permissionsData, setPermissionsData] = useState(
        role.permissions.map((obj) => obj.name)
    );

    const handleCheckboxChange = (e) => {
        const permissionName = e.target.value;

        if (permissionsData.includes(permissionName)) {
            setPermissionsData(
                permissionsData.filter((name) => name !== permissionName)
            );
        } else {
            setPermissionsData([...permissionsData, permissionName]);
        }

        if (data.some((name) => name === e.target.value)) {
            data = data.filter((name) => name !== e.target.value);
        } else {
            data.push(e.target.value);
        }

        setPermissionsData(data);
    };

    const updateRole = async (e) => {
        e.preventDefault();

        if (e.nativeEvent.submitter.getAttribute("type") === "Cancel") {
            handleReset();
            return;
        }

        Inertia.put(
            `/account/roles/${role.id}`,
            {
                name: name,
                permissions: permissionsData,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success!",
                        text: "Data updated successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                },
            }
        );
    };

    return (
        <>
            <Head>
                <title>Edit Roles - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-shield-alt"></i> Edit
                                    Role
                                </span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateRole}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Role Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Enter Role Name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="alert alert-danger">
                                            {errors.name}
                                        </div>
                                    )}
                                    <hr />
                                    <div className="mb-3">
                                        <SelectCheckbox
                                            label="Permissions"
                                            options={filteredPermissions}
                                            valueKey="name"
                                            labelKey="name"
                                            selectedValues={permissionsData}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                    <div>
                                        <ButtonCRUD
                                            type="submit"
                                            label="Save"
                                            color="btn-success"
                                            iconClass="fa fa-save"
                                        />
                                        <ButtonCRUD
                                            type="Cancel"
                                            label="Cancel"
                                            color="btn-secondary"
                                            iconClass="fas fa-times"
                                            onClick={() =>
                                                window.history.back()
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
