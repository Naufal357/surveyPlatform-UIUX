import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "../../Layouts/Header";
import SurveyDescription from "../../Components/SurveyDescription";
import LikertScale from "../../Components/LikertScale";
import EmbedDesign from "../../Components/EmbedDesign";
import Swal from "sweetalert2";

function Form() {
    const { surveys, auth, surveyMethods, surveyMethodIds, surveyQuestions } =
        usePage().props;

    const initialFormData = {
        user_id: auth.id,
        first_name: auth.first_name,
        surname: auth.surname,
        email: auth.email,
        birth_date: auth.birth_date,
        gender: auth.gender,
        profession: auth.profession,
        educational_background: auth.educational_background,
    };

    const [isSaving, setIsSaving] = useState(false);

    let idTamCounter = 0;
    let idSusCounter = 0;

    const questionData = JSON.parse(surveyQuestions[0].questions_data);

    if (surveys.user_id == auth.id) {
        Swal.fire({
            title: "Warning!",
            text: "You are not allowed to fill out your own survey. Please choose another survey to participate in.",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonText: "Got it!",
        });
    }

    const parsedSusQuestions = questionData.sus
        ? Object.entries(questionData.sus).map(([key, value]) => ({
              id: `${idSusCounter++}`,
              question: value,
          }))
        : [];

    const parsedTamQuestions = questionData.tam
        ? questionData.tam.flatMap((variable) =>
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

    const [formData, setFormData] = useState(initialFormData);
    const [susValues, setSusValues] = useState(
        parsedSusQuestions.length
            ? Object.fromEntries(
                  parsedSusQuestions.map((question, index) => [
                      `sus${index + 1}`,
                      "",
                  ])
              )
            : {}
    );
    const [tamValues, setTamValues] = useState(() => {
        const transformedData = [];

        parsedTamQuestions.forEach((question) => {
            const existingVariable = transformedData.find(
                (variable) => variable.name === question.variable
            );
            if (existingVariable) {
                const existingIndicator = existingVariable.responses.find(
                    (response) => response.name === question.indicator
                );
                if (!existingIndicator) {
                    existingVariable.responses.push({
                        name: question.indicator,
                        value: [],
                    });
                }
            } else {
                transformedData.push({
                    name: question.variable,
                    responses: [
                        {
                            name: question.indicator,
                            value: [],
                        },
                    ],
                });
            }
        });

        return transformedData;
    });

    useEffect(() => {
        loadSurveyData();
    }, [surveys.id]);

    useEffect(() => {
        const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
        const surveyData = {
            title: surveys.title,
            formData,
            susValues,
            tamValues,
        };

        localStorage.setItem(
            `surveyData_${surveys.id}`,
            JSON.stringify(surveyData)
        );

        setTimeout(() => {
            localStorage.removeItem(`surveyData_${surveys.id}`);
        }, oneWeekInMillis);
    }, [formData, susValues, tamValues]);

    const loadSurveyData = () => {
        const storedData = localStorage.getItem(`surveyData_${surveys.id}`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData.formData);
            setSusValues(parsedData.susValues);
            setTamValues(parsedData.tamValues);
        }
    };

    function handleSUSChange(dataAnswer, selectedValue) {
        setSusValues((prevState) => ({
            ...prevState,
            [dataAnswer]: selectedValue,
        }));
    }

    const tamSelectedValue = (tamQuestion, index) =>
        tamValues
            .find((variable) => variable.name === tamQuestion.variable)
            ?.responses.find(
                (indicator) => indicator.name === tamQuestion.indicator
            )
            ?.value.find((item) => item[0] === `tam${index + 1}`)?.[1];

    const handleTAMChange = (dataAnswer, selectedValue) => {
        setTamValues((prevState) => {
            const newState = [...prevState];
            const parts = dataAnswer.split("-");
            const questionId = parts[0];
            const questionVariable = parts[1];
            const questionIndicator = parts[2].replace(/_/g, " ");

            const variableIndex = newState.findIndex(
                (variable) => variable.name === questionVariable
            );
            if (variableIndex !== -1) {
                const responseIndex = newState[
                    variableIndex
                ].responses.findIndex(
                    (indicator) => indicator.name === questionIndicator
                );
                if (responseIndex !== -1) {
                    const response =
                        newState[variableIndex].responses[responseIndex];
                    const existingQuestionIndex = response.value.findIndex(
                        (item) => item[0] === questionId
                    );
                    if (existingQuestionIndex !== -1) {
                        // Jika pertanyaan sudah ada, perbarui nilainya
                        response.value[existingQuestionIndex][1] =
                            selectedValue;
                        // Urutkan berdasarkan ID TAM terkecil
                        response.value.sort((a, b) => a[0] - b[0]);
                    } else {
                        // Jika pertanyaan belum ada, tambahkan baru
                        response.value.push([questionId, selectedValue]);
                        // Urutkan berdasarkan ID TAM terkecil
                        response.value.sort((a, b) => a[0] - b[0]);
                    }
                } else {
                    // Jika indikator belum ada, tambahkan baru
                    newState[variableIndex].responses.push({
                        name: questionIndicator,
                        value: [[questionId, selectedValue]],
                    });
                }
            }
            return newState;
        });
    };

    const submitForm = (e) => {
        setIsSaving("true");
        e.preventDefault();

        const dataSubmit = {
            ...formData,
            survey_id: surveys.id,
            response_data: JSON.stringify({
                ...(surveyMethods.find((method) => method.method_id === 1) && {
                    sus: susValues,
                }),
                ...(surveyMethods.find((method) => method.method_id === 2) && {
                    tam: tamValues,
                }),
            }),
        };

        Inertia.post(
            "/form",
            dataSubmit,
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Thank You!",
                        text: "Survey data submitted successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000,
                    }).then(() => {
                        removeSurveyData();
                        Inertia.visit("/");
                    });
                    setIsSaving("false");
                },
                onError: () => {
                    Swal.fire({
                        title: "Error!",
                        text: "Data failed to save!",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setIsSaving("false");
                },
            },
            setIsSaving("false")
        );
    };

    return (
        <>
            <Head>
                <title>Form Survey</title>
            </Head>
            <Layout footerVisible={false}>
                <div className="container" style={{ marginTop: "80px" }}>
                    <div className="fade-in">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="Introduction text-center">
                                    <h3 className="text-2xl font-bold mb-4 mt-4">
                                        Pengenalan dan Konteks <br />"
                                        <strong>{surveys.title}</strong>"
                                    </h3>
                                    <div className="mx-auto">
                                        <img
                                            src={surveys.image}
                                            alt="Gambar Survei"
                                            className="img-fluid rounded mb-4 mx-auto d-block"
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "350px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                </div>

                                <SurveyDescription
                                    description={surveys.description}
                                />

                                <hr />

                                <div className="Explore-UI-UX">
                                    <h3 className="text-center text-2xl font-bold mb-4">
                                        Desain UI/UX
                                    </h3>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div
                                            style={{
                                                textAlign: "center",
                                                width: "100%",
                                            }}
                                        >
                                            <EmbedDesign surveys={surveys} />
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={submitForm}>
                                    {surveyMethodIds.map((methodId, index) => {
                                        if (methodId == 1) {
                                            return (
                                                <div
                                                    className="Questionnaire-SUS"
                                                    key={index}
                                                >
                                                    <hr />
                                                    <h3 className="text-center text-2xl font-bold mb-4">
                                                        Questionnaire SUS
                                                    </h3>
                                                    <div className="mb-3">
                                                        {parsedSusQuestions.map(
                                                            (
                                                                susQuestion,
                                                                index
                                                            ) => (
                                                                <div
                                                                    className="mb-3"
                                                                    key={index}
                                                                >
                                                                    <h5>
                                                                        {index +
                                                                            1}
                                                                        .{" "}
                                                                        {
                                                                            susQuestion.question
                                                                        }
                                                                    </h5>
                                                                    <LikertScale
                                                                        name={`sus${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        selectedValue={
                                                                            susValues[
                                                                                `sus${
                                                                                    index +
                                                                                    1
                                                                                }`
                                                                            ]
                                                                        }
                                                                        onValueChange={
                                                                            handleSUSChange
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        } else if (methodId == 2) {
                                            return (
                                                <div
                                                    className="Questionnaire-TAM"
                                                    key={index}
                                                >
                                                    <hr />
                                                    <h3 className="text-center text-2xl font-bold mb-4">
                                                        Questionnaire TAM
                                                    </h3>
                                                    {parsedTamQuestions.map(
                                                        (
                                                            tamQuestion,
                                                            index
                                                        ) => (
                                                            <div
                                                                className="mb-3"
                                                                key={index}
                                                            >
                                                                <h5>
                                                                    {index + 1}.{" "}
                                                                    {
                                                                        tamQuestion.question
                                                                    }
                                                                </h5>
                                                                <LikertScale
                                                                    name={`tam${
                                                                        index +
                                                                        1
                                                                    }-${
                                                                        tamQuestion.variable
                                                                    }-${tamQuestion.indicator.replace(
                                                                        /\s+/g,
                                                                        "_"
                                                                    )}`}
                                                                    selectedValue={
                                                                        tamSelectedValue(
                                                                            tamQuestion,
                                                                            index
                                                                        ) || ""
                                                                    }
                                                                    onValueChange={
                                                                        handleTAMChange
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={index}>
                                                    Error Method
                                                </div>
                                            );
                                        }
                                    })}

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg m-4"
                                            disabled={isSaving}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default Form;
