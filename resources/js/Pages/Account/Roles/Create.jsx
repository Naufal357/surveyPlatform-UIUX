import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import SelectCheckbox from "../../../Components/SelectCheckbox";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function RoleCreate() {
    const { errors, permissions } = usePage().props;

    const [name, setName] = useState("");
    const [permissionsData, setPermissionsData] = useState([]);

    const handleCheckboxChange = (e) => {
        let data = permissionsData;
        data.push(e.target.value);

        setPermissionsData(data);
    };

    const storeRole = async (e) => {
        e.preventDefault();

        Inertia.post(
            "/account/roles",
            {
                name: name,
                permissions: permissionsData,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success!",
                        text: "Data saved successfully!",
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
                <title>Create Roles - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-shield-alt"></i> Add New
                                    Role
                                </span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeRole}>
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
                                            options={permissions}
                                            valueKey="name"
                                            labelKey="name"
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
                                        <button
                                            type="reset"
                                            className="btn btn-md btn-warning me-2"
                                        >
                                            <i className="fa fa-redo"></i> Reset
                                        </button>
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
