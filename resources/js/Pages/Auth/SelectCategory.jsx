import React, { useState } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import SelectButton from "../../Components/SelectButton";
import PDFDropzone from "../../Components/FileUpload"; 
import Swal from "sweetalert2";

export default function SelectCategory() {
    const { errors, categories } = usePage().props;

    const [userPrefsData, setUserPrefsData] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleCheckboxUserPrefsChange = (value) => {
        setUserPrefsData((prevData) => {
            if (prevData.includes(value)) {
                return prevData.filter((item) => item !== value);
            } else {
                return [...prevData, value];
            }
        });
    };

    const handleFileUpload = (files) => {
        setUploadedFiles(files);
    };

    const storeCategories = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userPrefsData", JSON.stringify(userPrefsData));
        uploadedFiles.forEach((file) => {
            formData.append("files[]", file);
        });

        Inertia.post("/register/preferencedata", formData, {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Registration successful! Welcome to our community!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <>
            <Head>
                <title>Preference Categories - Survey Platform</title>
            </Head>
            <Layout footerVisible={false}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 mt-80">
                            <div className="text-center mb-4">
                                <img
                                    src="/assets/images/logo.png"
                                    width={"60"}
                                />
                                <h4>
                                    <strong>Survey</strong> Platform
                                </h4>
                            </div>
                            <div className="card border-0 rounded-3 shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="text-center">
                                        <h6 className="fw-bold">
                                            Select Preference Categories
                                        </h6>
                                        <hr />
                                    </div>
                                    <form onSubmit={storeCategories}>
                                        <SelectButton
                                            options={categories}
                                            valueKey="id"
                                            labelKey="name"
                                            selectedValues={userPrefsData}
                                            onChange={
                                                handleCheckboxUserPrefsChange
                                            }
                                            error={errors.userPrefsData}
                                        />

                                        <hr />
                                        <p>
                                            Pilih kategori yang Anda kuasai atau
                                            sukai, dan jika Anda memiliki
                                            sertifikat atau ijasah yang
                                            mendukung preferensi Anda, Anda
                                            dapat mengunggahnya di sini. Dokumen
                                            tersebut digunakan untuk mengajukan
                                            anda sebagai "Certified User".
                                        </p>

                                        <PDFDropzone
                                            onFileUpload={handleFileUpload}
                                        />

                                        <button
                                            className="btn btn-success shadow-sm rounded-sm px-4 w-100"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="register text-center mt-3">
                                Have an account?{" "}
                                <Link href="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
