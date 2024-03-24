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
    const [url_website, setUrlWebsite] = useState("");
    const [embed_design, setEmbedDesign] = useState("");
    const [embed_prototype, setEmbedPrototype] = useState("");
    const [surveyCategoriesData, setSurveyCategoriesData] = useState([]);
    const [surveyMethodsData, setSurveyMethodsData] = useState([]);
    const [susQuestionsData, setSusQuestionsData] = useState([]);
    const [tamQuestionsData, setTamQuestionsData] = useState([]);
    const [user_id] = useState(auth.user.id);

    const [isMethodSusFilled, setIsMethodSusFilled] = useState();
    const [isMethodTamFilled, setIsMethodTamFilled] = useState();

    const tamJson = [];
    const susJson = {};

    let idTamCounter = 0;
    let idSusCounter = 0;
    
    const data = JSON.parse(surveyQuestions[0].questions_data);

    const parsedSusQuestions = data.sus
        ? Object.entries(data.sus).map(([key, value]) => ({
              id: `${idSusCounter++}`,
              question: value,
          }))
        : [];

    const parsedTamQuestions = data.tam
        ? data.tam.flatMap((variable) =>
              variable.indicators.flatMap((indicator) =>
                  indicator.questions.map((question) => ({
                      id: `${idTamCounter++}`,
                      variable: variable.name,
                      indicator: indicator.name,
                      question: question,
                  }))
              )
          )
        : [];

    useEffect(() => {
        setTitle(survey.title);
        setTheme(survey.theme);
        setDescription(survey.description);
        setUrlWebsite(survey.url_website);
        setEmbedDesign(survey.embed_design);
        setEmbedPrototype(survey.embed_prototype);
        setSurveyCategoriesData(
            surveyCategories.map((item) => parseInt(item.category_id, 10))
        );
        setSurveyMethodsData(
            surveyMethods.map((item) => parseInt(item.method_id, 10))
        );

        setSusQuestionsData(parsedSusQuestions);
        setTamQuestionsData(parsedTamQuestions);
    }, [survey, surveyCategories, surveyMethods]);

    const checkSurveyMethods = (data) => {
        let isSusFilled = false;
        let isTamFilled = false;

        if (data.includes(1) && data.includes(2)) {
            isSusFilled = true;
            isTamFilled = true;
        } else if (data.includes(1)) {
            isSusFilled = true;
            isTamFilled = false;
        } else if (data.includes(2)) {
            isSusFilled = false;
            isTamFilled = true;
        }

        return { isSusFilled, isTamFilled };
    };

    useEffect(() => {
        const { isSusFilled, isTamFilled } =
            checkSurveyMethods(surveyMethodsData);
        setIsMethodSusFilled(isSusFilled);
        setIsMethodTamFilled(isTamFilled);
    }, [surveyMethodsData]);

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
                    question.question = value;
                }
                return question;
            })
        );
    };

    const handleTamVariableChange = (questionId, value) => {
        setTamQuestionsData(
            tamQuestionsData.map((question) => {
                if (question.id === questionId) {
                    question.variable = value;
                }
                return question;
            })
        );
    };

    const handleTamIndicatorChange = (questionId, value) => {
        setTamQuestionsData(
            tamQuestionsData.map((question) => {
                if (question.id === questionId) {
                    question.indicator = value;
                }
                return question;
            })
        );
    };

    const handleTamQuestionChange = (questionId, value) => {
        setTamQuestionsData(
            tamQuestionsData.map((question) => {
                if (question.id === questionId) {
                    question.question = value;
                }
                return question;
            })
        );
    };

    susQuestionsData.forEach((item, index) => {
        susJson[`sus${index + 1}`] = item.question;
    });

    tamQuestionsData.forEach((item) => {
        // Check if the variable already exists in tamJson
        let variableIndex = tamJson.findIndex(
            (element) => element.name === item.variable
        );

        // If the variable doesn't exist, create a new entry
        if (variableIndex === -1) {
            let variable = {
                name: item.variable,
                indicators: [
                    {
                        name: item.indicator,
                        questions: [item.question],
                    },
                ],
            };
            tamJson.push(variable);
        } else {
            // If the variable exists, add the question to its corresponding indicator
            let indicatorIndex = tamJson[variableIndex].indicators.findIndex(
                (element) => element.name === item.indicator
            );

            if (indicatorIndex === -1) {
                tamJson[variableIndex].indicators.push({
                    name: item.indicator,
                    questions: [item.question],
                });
            } else {
                tamJson[variableIndex].indicators[
                    indicatorIndex
                ].questions.push(item.question);
            }
        }
    });

    const combineSurveyData = () => {
        checkSurveyMethods(surveyMethodsData);
        if (isMethodSusFilled && isMethodTamFilled) {
            return JSON.stringify({
                sus: susJson,
                tam: tamJson,
            });
        } else if (isMethodSusFilled) {
            return JSON.stringify({
                sus: susJson,
            });
        } else if (isMethodTamFilled) {
            return JSON.stringify({
                tam: tamJson,
            });
        } else {
            return null;
        }
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
                url_website: url_website,
                embed_design: embed_design,
                embed_prototype: embed_prototype,
                survey_categories: surveyCategoriesData,
                survey_methods: surveyMethodsData,
                survey_questions: combineSurveyData(),
                user_id: user_id,
                _method: "PUT",
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

    const handleReset = () => {
        setImage(null);
        setTitle("");
        setTheme("");
        setDescription("");
        setUrlWebsite("");
        setEmbedDesign("");
        setEmbedPrototype("");
        setSurveyCategoriesData([]);
    };

    const resetSusQuestions = () => {
        setSusQuestionsData(parsedSusQuestions);
    };

    const resetTamQuestions = () => {
        setTamQuestionsData(parsedTamQuestions);
    };

    const removeTamQuestion = (questionId) => {
        const updatedQuestions = tamQuestionsData.filter(
            (question) => question.id !== questionId
        );

        const reindexedQuestions = updatedQuestions.map((question, index) => ({
            ...question,
            id: `${index + 1}`,
        }));

        setTamQuestionsData(reindexedQuestions);
    };

    const addTamQuestion = () => {
        const newQuestion = {
            id: `${tamQuestionsData.length + 1}`,
            variable: "",
            indicator: "",
            question: "",
        };

        setTamQuestionsData([...tamQuestionsData, newQuestion]);
    };

    const deleteAllTamQuestions = () => {
        setTamQuestionsData([]);
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
                                        error={errors.description}
                                    />
                                    <InputField
                                        label="URL Website"
                                        type="text"
                                        value={url_website}
                                        onChange={(e) =>
                                            setUrlWebsite(e.target.value)
                                        }
                                        error={errors.url_website}
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

                {isMethodSusFilled && (
                    <AccordionLayout
                        title="Preview Question - System Usability Scale"
                        defaultOpen={false}
                    >
                        <div className="card-body">
                            {susQuestionsData.map((question, index) => (
                                <InputField
                                    key={question.id}
                                    label={`Pertanyaan ${index + 1}`}
                                    type="text"
                                    value={question.question}
                                    onChange={(e) =>
                                        handleSusQuestionChange(
                                            question.id,
                                            e.target.value
                                        )
                                    }
                                    error={errors[`question${index + 1}`]}
                                />
                            ))}
                        </div>

                        <div>
                            <ButtonCRUD
                                type="reset"
                                label="Reset to default"
                                color="btn-warning"
                                iconClass="fa fa-redo"
                                onClick={resetSusQuestions}
                            />
                        </div>
                    </AccordionLayout>
                )}

                {isMethodTamFilled && (
                    <AccordionLayout
                        title="Preview Question - Technology Acceptence Model"
                        defaultOpen={false}
                    >
                        <p>
                            Pertanyaan dalam kuesioner akan diatur sesuai dengan
                            urutan variabel TAM. Dimulai dari Pertanyaan{" "}
                            <i> Perceived Ease of Use</i>, kemudian{" "}
                            <i> Perceived Usefulness</i>,
                            <i> Attitude Toward Using</i>,{" "}
                            <i> Behavioral Intention to Use</i>, dan terakhir{" "}
                            <i> Actual System Use</i>. Dengan demikian, pengguna
                            akan menjawab pertanyaan sesuai dengan alur yang
                            telah ditetapkan, memudahkan pengisian kuesioner.
                        </p>
                        <hr />
                        {tamQuestionsData.map((question, index) => (
                            <div key={index} className="mb-3">
                                <div className="row">
                                    <div className="col-md-3">
                                        <strong>
                                            {" "}
                                            Variable Pertanyaan {index + 1}
                                        </strong>

                                        <select
                                            className="form-select mt-2"
                                            onChange={(e) => {
                                                handleTamVariableChange(
                                                    question.id,
                                                    e.target.value
                                                );
                                            }}
                                            value={question.variable}
                                        >
                                            <option
                                                value=""
                                                disabled
                                                defaultValue
                                            >
                                                Pilih Variable
                                            </option>
                                            <option value="PEU">
                                                Perceived Ease of Use
                                            </option>
                                            <option value="PU">
                                                Perceived Usefulness
                                            </option>
                                            <option value="ATU">
                                                Attitude Toward Using
                                            </option>
                                            <option value="BI">
                                                Behavioral Intention to Use
                                            </option>
                                            <option value="ASU">
                                                Actual System Use
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <InputField
                                                    id={`indicator${index + 1}`}
                                                    type="text"
                                                    label={`Indikator Pertanyaan ${
                                                        index + 1
                                                    }`}
                                                    value={question.indicator}
                                                    onChange={(e) =>
                                                        handleTamIndicatorChange(
                                                            question.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    error={
                                                        errors[
                                                            `indicator${
                                                                index + 1
                                                            }`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <InputField
                                                    id={`question${index + 1}`}
                                                    type="text"
                                                    label={`Pertanyaan ${
                                                        index + 1
                                                    }`}
                                                    value={question.question}
                                                    onChange={(e) =>
                                                        handleTamQuestionChange(
                                                            question.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    error={
                                                        errors[
                                                            `question${
                                                                index + 1
                                                            }`
                                                        ]
                                                    }
                                                />
                                            </div>
                                            <div className="col-md-1 col-12 text-center mt-md-3">
                                                <ButtonCRUD
                                                    type="delete question"
                                                    color="btn btn-outline-danger"
                                                    iconClass="fas fa-minus"
                                                    onClick={() =>
                                                        removeTamQuestion(
                                                            question.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}

                        <div className="mb-3 text-center">
                            <ButtonCRUD
                                type="add question"
                                color="btn btn-outline-success"
                                iconClass="fa fa-plus"
                                onClick={() => addTamQuestion()}
                            />
                        </div>

                        <div>
                            <ButtonCRUD
                                type="reset"
                                label="Reset to default"
                                color="btn-warning"
                                iconClass="fa fa-redo"
                                onClick={resetTamQuestions}
                            />
                            <ButtonCRUD
                                type="delete all questions"
                                label="Delete all questions"
                                color="btn-danger"
                                iconClass="fa fa-trash"
                                onClick={deleteAllTamQuestions}
                            />
                        </div>
                    </AccordionLayout>
                )}
            </LayoutAccount>
        </>
    );
}
