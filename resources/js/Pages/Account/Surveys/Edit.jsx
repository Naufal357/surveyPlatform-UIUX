import React, { useState, useEffect } from "react";
import LayoutAccount from "../../../Layouts/Account";
import InputField from "../../../Components/InputField";
import QuillEditor from "../../../Components/QuillEditor";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import SelectCheckbox from "../../../Components/SelectCheckbox";
import AccordionLayout from "../../../Layouts/Accordion";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function SurveyEdit() {
    const {
        errors,
        survey,
        auth,
        categories,
        methods,
        surveyCategories,
        surveyMethods,
        surveyQuestions,
    } = usePage().props;

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [theme, setTheme] = useState("");
    const [description, setDescription] = useState("");
    const [embed_design, setEmbedDesign] = useState("");
    const [embed_prototype, setEmbedPrototype] = useState("");
    const [surveyCategoriesData, setSurveyCategoriesData] = useState([]);
    const [surveyMethodsData, setSurveyMethodsData] = useState([]);
    const [susQuestionsData, setSusQuestionsData] = useState([]);
    const [user_id, setUserId] = useState(auth.id);

    useEffect(() => {
        setTitle(survey.title);
        setTheme(survey.theme);
        setDescription(survey.description);
        setEmbedDesign(survey.embed_design);
        setEmbedPrototype(survey.embed_prototype);
        setSurveyCategoriesData(
            surveyCategories.map((item) => parseInt(item.category_id, 10))
        );
        setSurveyMethodsData(
            surveyMethods.map((item) => parseInt(item.method_id, 10))
        );
        setSusQuestionsData(
            Object.entries(
                JSON.parse(surveyQuestions[0].questions_data).sus
            ).map(([key, value]) => ({
                id: key,
                question: value,
            }))
        );
        setUserId(survey.user_id);
    }, [survey, surveyCategories, surveyMethods]);
    console.log(susQuestionsData);
    const handleCheckboxCategoriesChange = (e) => {
        const categoryId = parseInt(e.target.value, 10);

        if (surveyCategoriesData.includes(categoryId)) {
            setSurveyCategoriesData(
                surveyCategoriesData.filter((id) => id !== categoryId)
            );
        } else {
            setSurveyCategoriesData([...surveyCategoriesData, categoryId]);
        }
    };

    const handleCheckboxMethodsChange = (e) => {
        const methodId = parseInt(e.target.value, 10);

        if (surveyMethodsData.includes(methodId)) {
            setSurveyMethodsData(
                surveyMethodsData.filter((id) => id !== methodId)
            );
        } else {
            setSurveyMethodsData([...surveyMethodsData, methodId]);
        }
    };

    const handleSusQuestionChange = (questionId, value) => {
        setSusQuestionsData(
            susQuestionsData.map((question) => {
                if (question.id === questionId) {
                    return { ...question, question: value };
                }
                return question;
            })
        );
    };

    const resetSusQuestions = () => {
        setSusQuestionsData(
            Object.entries(
                JSON.parse(surveyQuestions[0].questions_data).sus
            ).map(([key, value]) => ({
                id: key,
                question: value,
            }))
        );
    };

    const updateSurvey = async (e) => {
        e.preventDefault();

        if (e.nativeEvent.submitter.getAttribute("type") === "Cancel") {
            handleReset();
            return;
        }

        Inertia.post(
            `/account/surveys/${survey.id}`,
            {
                title: title,
                image: image,
                theme: theme,
                description: description,
                embed_design: embed_design,
                embed_prototype: embed_prototype,
                survey_categories: surveyCategoriesData,
                survey_methods: surveyMethodsData,
                user_id: user_id,
                _method: "PUT",
                console: console.log(image),
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
                                        value={survey.image}
                                        onChange={(e) => [
                                            setImage(e.target.files[0]),
                                        ]}
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

                                    <div className="mb-3">
                                        <SelectCheckbox
                                            label="Categories Survey"
                                            options={categories}
                                            valueKey="id"
                                            labelKey="name"
                                            onChange={
                                                handleCheckboxCategoriesChange
                                            }
                                            selectedValues={
                                                surveyCategoriesData
                                            }
                                        />
                                    </div>
                                    <div>
                                        <SelectCheckbox
                                            label="Methods Survey"
                                            options={methods}
                                            valueKey="id"
                                            labelKey="name"
                                            onChange={
                                                handleCheckboxMethodsChange
                                            }
                                            selectedValues={surveyMethodsData}
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

                <AccordionLayout
                    title="Preview Question - System Usability Scale"
                    defaultOpen={true}
                >
                    <div className="card-body">
                        {susQuestionsData.map((question) => (
                            <InputField
                                key={question.id}
                                label={`Pertanyaan ${question.id.substring(6)}`}
                                type="text"
                                value={question.question}
                                onChange={(e) =>
                                    handleSusQuestionChange(
                                        question.id,
                                        e.target.value
                                    )
                                }
                                error={
                                    errors[
                                        `question${question.id.substring(6)}`
                                    ]
                                }
                            />
                        ))}
                    </div>
                    <div>
                        <ButtonCRUD
                            type="reset"
                            label="Reset"
                            color="btn-warning"
                            iconClass="fa fa-redo"
                            onClick={resetSusQuestions}
                        />
                    </div>
                </AccordionLayout>

                {/* <AccordionLayout
                    title="Preview Question - Technology Acceptence Model"
                    defaultOpen={false}
                >
                    <div className="card-body">
                        {susQuestionsData.map((question) => (
                            <InputField
                                key={question.id}
                                label={`Pertanyaan ${question.id + 1}`}
                                type="text"
                                value={question.question}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        question.id,
                                        e.target.value
                                    )
                                }
                                error={errors[`question${question.id + 1}`]}
                            />
                        ))}
                    </div>
                    <div>
                        <ButtonCRUD
                            type="reset"
                            label="Reset"
                            color="btn-warning"
                            iconClass="fa fa-redo"
                            onClick={resetSusQuestions}
                        />
                    </div>
                </AccordionLayout> */}
            </LayoutAccount>
        </>
    );
}
