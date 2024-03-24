import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "../../Layouts/Header";
import SurveyDescription from "../../Components/SurveyDescription";
import LikertScale from "../../Components/LikertScale";
import EmbedDesign from "../../Components/EmbedDesign";
import Swal from "sweetalert2";

function Form() {
    const { surveys, auth, surveyMethods, surveyQuestions } = usePage().props;

    const initialFormData = {
        first_name: auth.first_name,
        surname: auth.surname,
        email: auth.email,
        birth_date: auth.birth_date,
        gender: auth.gender,
        profession: auth.profession,
        educational_background: auth.educational_background,
    };

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
    const [tamValues, setTamValues] = useState(
        parsedTamQuestions.length
            ? Object.fromEntries(
                  parsedTamQuestions.map((question, index) => [
                      `tam${index + 1}`,
                      "",
                  ])
              )
            : {}
    );

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

    function handleSUSChange(questionId, selectedValue) {
        setSusValues((prevState) => ({
            ...prevState,
            [questionId]: selectedValue,
        }));
    }

    const handleTAMChange = (questionId, selectedValue) => {
        setTamValues((prevState) => ({
            ...prevState,
            [questionId]: selectedValue,
        }));
    };

    const submitForm = (e) => {
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

        Inertia.post("/form", dataSubmit, {
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
            },
        });
    };

    return (
        <>
            <Head>
                <title>Form Survey</title>
            </Head>
            <Layout>
                <div className="container" style={{ marginTop: "80px" }}>
                    <div className="Introduction text-center">
                        <h3 className="text-2xl font-bold mb-4 mt-4">
                            Pengenalan dan Konteks <br />"
                            <strong>{surveys.title}</strong>"
                        </h3>
                        <div className="mx-auto">
                            <img
                                src={surveys.image}
                                alt="Gambar Survei"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    <SurveyDescription description={surveys.description} />

                    <hr />

                    <div className="Explore-UI-UX">
                        <h3 className="text-center text-2xl font-bold mb-4">
                            Desain UI/UX
                        </h3>
                        <div className="d-flex justify-content-center align-items-center">
                            <div style={{ textAlign: "center", width: "100%" }}>
                                <EmbedDesign surveys={surveys} />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submitForm}>
                        {surveyMethods
                            .sort((a, b) => a.method_id - b.method_id)
                            .map((method, index) => {
                                if (method.method_id === 1) {
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
                                                    (susQuestion, index) => (
                                                        <div
                                                            className="mb-3"
                                                            key={index}
                                                        >
                                                            <h5>
                                                                {index + 1}.{" "}
                                                                {
                                                                    susQuestion.question
                                                                }
                                                            </h5>
                                                            <LikertScale
                                                                name={`sus${
                                                                    index + 1
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
                                } else if (method.method_id === 2) {
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
                                                (tamQuestion, index) => (
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
                                                                index + 1
                                                            }`}
                                                            selectedValue={
                                                                tamValues[
                                                                    `tam${
                                                                        index +
                                                                        1
                                                                    }`
                                                                ]
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
                                    return <div key={index}>Error Method</div>;
                                }
                            })}

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg m-4"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
}
export default Form;
