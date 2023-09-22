import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "../Layouts/Header";
import RadioQuestion from "../Components/RadioQuestionSUS";
import { Head, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

function Form() {
    const { errors, surveys, auth } = usePage().props;

    // useEffect(() => {
    //     const designContainer = document.getElementById(
    //         "embed-design-container"
    //     );
    //     designContainer.innerHTML = surveys.embed_design;

    //     const prototypeContainer = document.getElementById(
    //         "embed-prototype-container"
    //     );
    //     prototypeContainer.innerHTML = surveys.embed_prototype;
    // }, [surveys]);

    let [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        gender: "",
        profession: "",
        educational_background: "",
    });

    const [questionValues, setQuestionValues] = useState({
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
    });

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuestionChange = (questionName, value) => {
        setQuestionValues({ ...questionValues, [questionName]: value });
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
                        <p className="mt-4">{surveys.description}</p>
                    </div>

                    <hr />

                    {/* <div className="Explore-UI-UX">
                        <h3 className="text-2xl font-bold mb-4">
                            Desain UI/UX
                        </h3>
                        <div className="content-center align-items-center">
                            <div>
                                <div id="embed-design-container"></div>
                                <div id="embed-prototype-container"></div>
                            </div>
                        </div>
                    </div>
                    <hr /> */}

                    <form onSubmit={submitForm}>
                        <div className="Personal-Info-Entry">
                            <h3 className="text-2xl font-bold mb-4 mt-4">
                                Personal Information
                            </h3>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        htmlFor="inputFirstName"
                                        className="form-label"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="inputFirstName"
                                        name="first_name"
                                        placeholder="First name"
                                        onChange={handleValueChange}
                                        value={formData.first_name}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        htmlFor="inputLastName"
                                        className="form-label"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="inputLastName"
                                        name="last_name"
                                        placeholder="Last name"
                                        onChange={handleValueChange}
                                        value={formData.last_name}
                                        className="form-control"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inputEmail"
                                    className="form-label"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    id="inputEmail"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={handleValueChange}
                                    value={formData.email}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inputAge"
                                    className="form-label"
                                >
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="inputAge"
                                    name="age"
                                    onChange={handleValueChange}
                                    value={formData.age}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inputGender"
                                    className="form-label"
                                >
                                    Gender
                                </label>
                                <select
                                    type="text"
                                    id="inputGender"
                                    name="gender"
                                    onChange={handleValueChange}
                                    value={formData.gender}
                                    className="form-select"
                                    required
                                >
                                    <option disabled value="">
                                        Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inputProfession"
                                    className="form-label"
                                >
                                    Profession
                                </label>
                                <select
                                    type="text"
                                    id="inputProfession"
                                    name="profession"
                                    onChange={handleValueChange}
                                    value={formData.profession}
                                    className="form-select"
                                    required
                                >
                                    <option disabled value="">
                                        Select Profession
                                    </option>
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inputEducation"
                                    className="form-label"
                                >
                                    Educational Background
                                </label>
                                <select
                                    type="text"
                                    id="inputEducation"
                                    name="educational_background"
                                    onChange={handleValueChange}
                                    value={formData.educational_background}
                                    className="form-select"
                                    required
                                >
                                    <option disabled value="">
                                        Select educational background
                                    </option>
                                    <option value="Elementary School">
                                        Elementary School (SD)
                                    </option>
                                    <option value="Junior High School">
                                        Junior High School (SMP)
                                    </option>
                                    <option value="High School">
                                        High School (SMA/SMK)
                                    </option>
                                    <option value="Associate's Degree">
                                        Associate's Degree (D3)
                                    </option>
                                    <option value="Bachelor's Degree">
                                        Bachelor's Degree (S1/D4)
                                    </option>
                                    <option value="Master's Degree">
                                        Master's Degree (S2)
                                    </option>
                                    <option value="Doctorate Degree">
                                        Doctorate Degree (S3)
                                    </option>
                                </select>
                            </div>
                        </div>
                        <hr />

                        <div className="Questionnaire-SUS">
                            <h3 className="text-2xl font-bold mb-4">
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
