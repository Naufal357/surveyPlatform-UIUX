import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import LayoutAccount from "../../Layouts/Account";
import AccordionLayout from "../../Layouts/Accordion";
import SelectCheckbox from "../../Components/SelectCheckbox";
import ButtonCRUD from "../../Components/ButtonCRUD";

export default function Certificates() {
    const { pendingCertificates, categories } = usePage().props;

    const [certCategoriesData, setCertCategoriesData] = useState([]);
    const [selectedCertificateId, setSelectedCertificateId] = useState();
    const [selectedCertificate, setSelectedCertificate] = useState("");

    const handleCardClick = (id, certificate) => {
        setSelectedCertificateId(id);
        setSelectedCertificate(certificate);
    };

    const handleCheckboxCetfCategory = (e) => {
        const category_id = parseInt(e.target.value, 10);
        if (certCategoriesData.includes(category_id)) {
            setCertCategoriesData(
                certCategoriesData.filter((id) => id !== category_id)
            );
        } else {
            setCertCategoriesData([...certCategoriesData, category_id]);
        }
    };

    const handleReset = () => {
        setCertCategoriesData([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const shouldProceed = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to save the certificate categories?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, save it!",
        });

        if (shouldProceed.isConfirmed) {
            Inertia.post(
                "/account/certificates",
                {
                    certificateId: selectedCertificateId,
                    certCategories: certCategoriesData,
                },
                {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success!",
                            text: "Certificate categories saved successfully!",
                            icon: "success",
                            showConfirmButton: false,
                        });
                    },
                }
            );
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject this certificate?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(
                    `/account/certificates/${selectedCertificateId}`
                );

                Swal.fire({
                    title: "Success!",
                    text: "Certificate rejected successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <>
            <Head>
                <title>Certificates - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <AccordionLayout
                    title="Pengkategorian Sertifikat"
                    defaultOpen={true}
                >
                    <div className="row">
                        <div className="col-md-8 d-flex align-items-center justify-content-center">
                            {selectedCertificate ? (
                                <iframe
                                    id="pdfViewer"
                                    src={selectedCertificate}
                                    width="100%"
                                    height="600"
                                ></iframe>
                            ) : (
                                <div
                                    className="card text-center bg-black"
                                    style={{ width: "100%", height: "600px" }}
                                >
                                    <div className="card-body mt-4">
                                        <p className="text-white ">
                                            Silakan pilih sertifikat pada
                                            navigasi sertifikat.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-md-4 h-100">
                            <AccordionLayout
                                title="Navigasi Sertifikat"
                                defaultOpen={true}
                            >
                                <div
                                    style={{
                                        maxHeight: "500px",
                                        overflowY: "auto",
                                    }}
                                >
                                    {Object.values(pendingCertificates).map(
                                        (certificate) => (
                                            <div
                                                key={certificate.id}
                                                className={`mb-3 ${
                                                    selectedCertificateId ===
                                                    certificate.id
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleCardClick(
                                                        certificate.id,
                                                        certificate.certificate
                                                    )
                                                }
                                            >
                                                <div
                                                    className="card p-1"
                                                    style={{
                                                        backgroundColor:
                                                            selectedCertificateId ===
                                                            certificate.id
                                                                ? "#ffcc00"
                                                                : "#a2a80f",
                                                        color: "white",
                                                    }}
                                                >
                                                    <p className="card-text">
                                                        <strong>Nama:</strong>{" "}
                                                        {
                                                            certificate.user
                                                                .first_name
                                                        }{" "}
                                                        {
                                                            certificate.user
                                                                .surname
                                                        }
                                                    </p>
                                                    <p className="card-text">
                                                        <strong>
                                                            Tanggal:
                                                        </strong>{" "}
                                                        {certificate.created_at}
                                                    </p>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    )}
                                </div>
                            </AccordionLayout>
                        </div>
                    </div>
                    <AccordionLayout
                        title="Kategori Sertifikat"
                        defaultOpen={true}
                    >
                        <form onSubmit={handleSubmit}>
                            <SelectCheckbox
                                id="certCategories"
                                options={categories}
                                valueKey="id"
                                labelKey="name"
                                onChange={handleCheckboxCetfCategory}
                            />
                            <ButtonCRUD
                                type="submit"
                                label="Save"
                                color="btn-success"
                                iconClass="fas fa-check-circle"
                            />
                            <ButtonCRUD
                                type="reset"
                                label="Reset"
                                color="btn-warning"
                                iconClass="fa fa-redo"
                                onClick={handleReset}
                            />
                            <ButtonCRUD
                                type="Reject"
                                label="Reject"
                                color="btn-danger"
                                iconClass="fas fa-times-circle"
                                onClick={handleReject}
                            />
                        </form>
                    </AccordionLayout>
                </AccordionLayout>
            </LayoutAccount>
        </>
    );
}
