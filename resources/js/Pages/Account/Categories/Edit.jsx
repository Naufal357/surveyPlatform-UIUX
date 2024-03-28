import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import CardContent from "../../../Layouts/CardContent";
import InputField from "../../../Components/InputField";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function CategoryEdit() {
    const { errors, category } = usePage().props;

    const [name, setName] = useState(category.name);

    const updateCategory = async (e) => {
        e.preventDefault();

        if (e.nativeEvent.submitter.getAttribute("type") === "Cancel") {
            handleReset();
            return;
        }

        Inertia.post(
            `/account/categories/${category.id}`,
            {
                name: name,
                _method: "PUT",
            },
            {
                onSuccess: () => {
                    //show alert
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
                <title>Edit Category - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <CardContent title="Edit Category" icon="fa fa-folder">
                    <form onSubmit={updateCategory}>
                        <div className="mb-3">
                            <InputField
                                label="Category Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
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
                                onClick={() => window.history.back()}
                            />
                        </div>
                    </form>
                </CardContent>
            </LayoutAccount>
        </>
    );
}
