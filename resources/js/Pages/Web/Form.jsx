import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "../../Layouts/Header";
import SurveyDescription from "../../Components/SurveyDescription";
import RadioQuestion from "../../Components/RadioQuestionSUS";
import EmbedFigma from "../../Components/EmbedFigma";
import { Head, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

function Form() {
    const { errors, surveys, auth } = usePage().props;

    const initialFormData = {
        first_name: auth.first_name,
        surname: auth.surname,
        email: auth.email,
        birth_date: auth.birth_date,
        gender: auth.gender,
        profession: auth.profession,
        educational_background: auth.educational_background,
    };

    const initialQuestionValues = {
        sus1: null,
        sus2: null,
        sus3: null,
        sus4: null,
        sus5: null,
        sus6: null,
        sus7: null,
        sus8: null,
        sus9: null,
        sus10: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [questionValues, setQuestionValues] = useState(initialQuestionValues);

    const currentDate = new Date();
    const formattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    useEffect(() => {
        loadSurveyData();
    }, [surveys.id]);

    useEffect(() => {
        saveSurveyData();
    }, [formData, questionValues]);

    const loadSurveyData = () => {
        const storedData = localStorage.getItem(`surveyData_${surveys.id}`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData.formData);
            setQuestionValues(parsedData.questionValues);
        }
    };

    const saveSurveyData = () => {
        const surveyData = {
            title: surveys.title,
            formData,
            questionValues,
            update_at: formattedDate,
        };
        localStorage.setItem(
            `surveyData_${surveys.id}`,
            JSON.stringify(surveyData)
        );
    };

    const handleQuestionChange = (questionName, value) => {
        setQuestionValues({ ...questionValues, [questionName]: value });
    };

    const removeSurveyData = () => {
        localStorage.removeItem(`surveyData_${surveys.id}`);
    };

    const submitForm = (e) => {
        e.preventDefault();

        const response_data = {
            sus1: questionValues.sus1,
            sus2: questionValues.sus2,
            sus3: questionValues.sus3,
            sus4: questionValues.sus4,
            sus5: questionValues.sus5,
            sus6: questionValues.sus6,
            sus7: questionValues.sus7,
            sus8: questionValues.sus8,
            sus9: questionValues.sus9,
            sus10: questionValues.sus10,
        };

        const dataSubmit = {
            ...formData,
            survey_id: surveys.id,
            response_data: JSON.stringify(response_data),
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
                <div className="container">
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
                                <EmbedFigma surveys={surveys} />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <form onSubmit={submitForm}>
                        <div className="Questionnaire-SUS">
                            <h3 className="text-center text-2xl font-bold mb-4">
                                Questionnaire SUS
                            </h3>
                            <div className="mb-3">
                                <h5 className="font-weight-bold">
                                    1. Saya berpikir akan menggunakan sistem{" "}
                                    <strong> {surveys.theme} </strong>
                                    ini lagi
                                </h5>
                                <RadioQuestion
                                    name="sus1"
                                    selectedValue={questionValues.sus1}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-weight-bold">
                                    2. Saya merasa sistem{" "}
                                    <strong> {surveys.theme} </strong> ini rumit
                                    untuk digunakan
                                </h5>
                                <RadioQuestion
                                    name="sus2"
                                    selectedValue={questionValues.sus2}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    3. Saya merasa sistem{" "}
                                    <strong> {surveys.theme} </strong> ini mudah
                                    digunakan
                                </h5>
                                <RadioQuestion
                                    name="sus3"
                                    selectedValue={questionValues.sus3}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    4. Saya membutuhkan bantuan dari orang lain
                                    atau teknisi dalam menggunakan sistem{" "}
                                    <strong> {surveys.theme} </strong> ini
                                </h5>
                                <RadioQuestion
                                    name="sus4"
                                    selectedValue={questionValues.sus4}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    5. Saya merasa fitur-fitur sistem{" "}
                                    <strong> {surveys.theme} </strong> ini
                                    berjalan dengan semestinya
                                </h5>
                                <RadioQuestion
                                    name="sus5"
                                    selectedValue={questionValues.sus5}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    6. Saya merasa ada banyak hal yang tidak
                                    konsisten (tidak serasi pada sistem{" "}
                                    <strong> {surveys.theme} </strong> ini)
                                </h5>
                                <RadioQuestion
                                    name="sus6"
                                    selectedValue={questionValues.sus6}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    7. Saya merasa orang lain akan memahami cara
                                    menggunakan sistem{" "}
                                    <strong> {surveys.theme} </strong> ini
                                    dengan cepat
                                </h5>
                                <RadioQuestion
                                    name="sus7"
                                    selectedValue={questionValues.sus7}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    8. Saya merasa sistem{" "}
                                    <strong> {surveys.theme} </strong> ini
                                    membingungkan
                                </h5>
                                <RadioQuestion
                                    name="sus8"
                                    selectedValue={questionValues.sus8}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    9. Saya merasa tidak ada hambatan dalam
                                    menggunakan sistem{" "}
                                    <strong> {surveys.theme} </strong> ini
                                </h5>
                                <RadioQuestion
                                    name="sus9"
                                    selectedValue={questionValues.sus9}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>

                            <div className="mb-3">
                                <h5 className="font-semibold">
                                    10. Saya perlu membiasakan diri terlebih
                                    dahulu sebelum menggunakan sistem{" "}
                                    <strong> {surveys.theme} </strong> ini
                                </h5>
                                <RadioQuestion
                                    name="sus10"
                                    selectedValue={questionValues.sus10}
                                    onValueChange={handleQuestionChange}
                                />
                            </div>
                        </div>

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
