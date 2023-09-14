import React, { useState } from "react";
import LayoutAccount from '../../../Layouts/Account';
import { Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import Swal from 'sweetalert2';

export default function CategoryEdit() {

    //destruct props "errors" & "category"
    const { errors, survey, auth } = usePage().props;

    //state
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [theme, setTheme] = useState("");
    const [description, setDescription] = useState("");
    const [embed_design, setEmbedDesign] = useState("");
    const [embed_prototype, setEmbedPrototype] = useState("");
    const [user_id, setUserId] = useState(auth.id);

    //method "updateCategory"
    const updateSurvey = async (e) => {
        e.preventDefault();

        // Periksa apakah tombol "Cancel" diklik
        if (e.nativeEvent.submitter.getAttribute("type") === "Cancel") {
            handleReset();
            return;
        }

        //sending data ketika menekan save
        Inertia.post(
            `/account/surveys/${survey.id}`,
            {
                //data
                title: title,
                image: image,
                theme: theme,
                description: description,
                embed_design: embed_design,
                embed_prototype: embed_prototype,
                user_id: user_id,
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
    }

    const handleReset = () => {
        setImage(null);
        setTitle("");
        setTheme("");
        setDescription("");
        setEmbedDesign("");
        setEmbedPrototype("");
    };

    return (
        <>
            <Head>
                <title>Edit Survey - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-folder"></i> Edit{" "}
                                    {survey.title} Survey
                                </span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateSurvey}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Image Thumbnail
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) =>
                                                setImage(e.target.files[0])
                                            }
                                        />
                                    </div>
                                    {errors.image && (
                                        <div className="alert alert-danger">
                                            {errors.image}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Title Design
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            placeholder=""
                                        />
                                    </div>
                                    {errors.title && (
                                        <div className="alert alert-danger">
                                            {errors.title}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Theme Design
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={theme}
                                            onChange={(e) =>
                                                setTheme(e.target.value)
                                            }
                                            placeholder=""
                                        />
                                    </div>
                                    {errors.theme && (
                                        <div className="alert alert-danger">
                                            {errors.theme}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder=""
                                        />
                                    </div>
                                    {errors.description && (
                                        <div className="alert alert-danger">
                                            {errors.description}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Embed Design (Figma)
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={embed_design}
                                            onChange={(e) =>
                                                setEmbedDesign(e.target.value)
                                            }
                                            placeholder=""
                                        />
                                    </div>
                                    {errors.embed_design && (
                                        <div className="alert alert-danger">
                                            {errors.embed_design}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">
                                            Embed Prototype (Figma)
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={embed_prototype}
                                            onChange={(e) =>
                                                setEmbedPrototype(
                                                    e.target.value
                                                )
                                            }
                                            placeholder=""
                                        />
                                    </div>
                                    {errors.embed_prototype && (
                                        <div className="alert alert-danger">
                                            {errors.embed_prototype}
                                        </div>
                                    )}

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-md btn-success me-2"
                                        >
                                            <i className="fa fa-save"></i> Save
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-md btn-warning me-2"
                                            onClick={handleReset}
                                        >
                                            <i className="fa fa-redo"></i> Reset
                                        </button>
                                        <button
                                            type="Cancel"
                                            className="btn btn-md btn-secondary"
                                            onClick={() => {
                                                window.history.back();
                                            }}
                                        >
                                            <i class="fas fa-times"></i> Cancel
                                        </button>
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