import React, { useEffect, useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import CardContent from "../../../Layouts/CardContent";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import InputField from "../../../Components/InputField";
import QuillEditor from "../../../Components/QuillEditor";
import RadioSelect from "../../../Components/RadioSelect";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function ArticleCreate() {
    const { errors, user, article } = usePage().props;

    const [user_id, setUser_id] = useState(user.id);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setTitle(article.title);
        setImage(article.image);
        setContent(article.content);
        setStatus(article.status);
    }, [article]);

    function handleVisibleChange(selectedValue) {
        setStatus(selectedValue);
    }

    const updateArticle = async (e) => {
        setIsSaving(true);
        e.preventDefault();

        if (e.nativeEvent.submitter.getAttribute("type") === "Cancel") {
            handleReset();
            setIsSaving(false);
            return;
        }

        Inertia.post(
            `/account/articles/${article.id}`,
            {
                _method: "PUT",
                user_id: user_id,
                title: title,
                image: image,
                content: content,
                status: status,
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
                    setIsSaving(false);
                },
                onError: () => {
                    Swal.fire({
                        title: "Error!",
                        text: "Data failed to save!",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setIsSaving(false);
                },
            }
        );
    };

    const handleReset = () => {
        setTitle("");
        setImage("");
        setContent("");
        setStatus("");
    };

    return (
        <>
            <Head>
                <title>Create Articles - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <CardContent title="Create Articles" icon="fa fa-newspaper">
                    <form onSubmit={updateArticle}>
                        <InputField
                            label="Image Thumbnail"
                            type="file"
                            value={article.image}
                            onChange={(e) => [setImage(e.target.files[0])]}
                            error={errors.image}
                        />

                        <InputField
                            label="Title Articles"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={errors.title}
                        />

                        <QuillEditor
                            label="Content Articles"
                            value={content}
                            onChange={setContent}
                            error={errors.constent}
                        />

                        <RadioSelect
                            id="survey_visibility"
                            label="General Access Survey"
                            options={[
                                {
                                    id: 1,
                                    value: "Public",
                                    label: "Public",
                                },
                                {
                                    id: 2,
                                    value: "Private",
                                    label: "Private",
                                },
                                {
                                    id: 3,
                                    value: "Restricted",
                                    label: "Only link holders can access",
                                },
                            ]}
                            valueKey="value"
                            labelKey="label"
                            selectedValue={status}
                            onChange={handleVisibleChange}
                            error={errors.status}
                        />

                        <div>
                            <ButtonCRUD
                                type="submit"
                                label="Save"
                                color="btn-success"
                                iconClass="fa fa-save"
                                disabled={isSaving}
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
