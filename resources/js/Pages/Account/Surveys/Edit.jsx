import React, { useState, useEffect } from "react";
import LayoutAccount from '../../../Layouts/Account';
import InputField from "../../../Components/InputField";
import QuillEditor from "../../../Components/QuillEditor";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import { Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";
import Swal from 'sweetalert2';

export default function SurveyEdit() {

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

    useEffect(() => {
        // Isi state dengan data dari objek "survey" saat halaman dimuat
        setTitle(survey.title);
        setTheme(survey.theme);
        setDescription(survey.description);
        setEmbedDesign(survey.embed_design);
        setEmbedPrototype(survey.embed_prototype);
        setUserId(survey.user_id);
    }, [survey]);

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
                                    <InputField
                                        label="Image Thumbnail"
                                        type="file"
                                        value={image}
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                        error={errors.image}
                                    />

                                    <InputField
                                        label="Title Design"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        error={errors.title}
                                    />

                                    <InputField
                                        label="Theme Design"
                                        type="text"
                                        value={theme}
                                        onChange={(e) =>
                                            setTheme(e.target.value)
                                        }
                                        error={errors.theme}
                                    />

                                    <QuillEditor
                                        label="Description"
                                        value={description}
                                        onChange={setDescription}
                                    />

                                    <InputField
                                        label="Embed Design (Figma)"
                                        type="text"
                                        value={embed_design}
                                        onChange={(e) =>
                                            setEmbedDesign(e.target.value)
                                        }
                                        error={errors.embed_design}
                                    />

                                    <InputField
                                        label="Embed Prototype (Figma)"
                                        type="text"
                                        value={embed_prototype}
                                        onChange={(e) =>
                                            setEmbedPrototype(e.target.value)
                                        }
                                        error={errors.embed_prototype}
                                    />

                                    <div>
                                        <ButtonCRUD
                                            type="submit"
                                            label="Save"
                                            color="btn-success"
                                            iconClass="fa fa-save"
                                        />
                                        <ButtonCRUD
                                            type="reset"
                                            label="Reset"
                                            color="btn-warning"
                                            iconClass="fa fa-redo"
                                            onClick={handleReset}
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