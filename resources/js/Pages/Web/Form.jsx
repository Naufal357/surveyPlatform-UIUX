import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Layout from "../../Layouts/Header";
import SurveyDescription from "../../Components/SurveyDescription";
import RadioQuestion from "../../Components/RadioQuestionSUS";
import EmbedFigma from "../../Components/EmbedFigma";
import Swal from "sweetalert2";

function Form() {
    const { surveys, auth, surveyMethods } = usePage().props;

    const initialFormData = {
        first_name: auth.first_name,
        surname: auth.surname,
        email: auth.email,
        birth_date: auth.birth_date,
        gender: auth.gender,
        profession: auth.profession,
        educational_background: auth.educational_background,
    };

    const initialSUSValues = {
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

    const initialTAMValues = {
        tam1: null,
        tam2: null,
        tam3: null,
        tam4: null,
        tam5: null,
        tam6: null,
        tam7: null,
        tam8: null,
        tam9: null,
        tam10: null,
        tam11: null,
        tam12: null,
        tam13: null,
        tam14: null,
        tam15: null,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [susValues, setSUSValues] = useState(initialSUSValues);
    const [tamValues, setTAMValues] = useState(initialTAMValues);

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
    }, [formData, susValues, tamValues]);

    const loadSurveyData = () => {
        const storedData = localStorage.getItem(`surveyData_${surveys.id}`);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData.formData);
            setSUSValues(parsedData.susValues);
            setTAMValues(parsedData.tamValues);
        }
    };

    const saveSurveyData = () => {
        const surveyData = {
            title: surveys.title,
            formData,
            susValues,
            tamValues,
            update_at: formattedDate,
        };
        localStorage.setItem(
            `surveyData_${surveys.id}`,
            JSON.stringify(surveyData)
        );
    };

    const handleSUSChange = (questionName, value) => {
        setSUSValues({ ...susValues, [questionName]: value });
    };

    const handleTAMChange = (questionName, value) => {
        setTAMValues({ ...tamValues, [questionName]: value });
    };

    const removeSurveyData = () => {
        localStorage.removeItem(`surveyData_${surveys.id}`);
    };

    const submitForm = (e) => {
        e.preventDefault();

        const susResponseData = {
            sus1: susValues.sus1,
            sus2: susValues.sus2,
            sus3: susValues.sus3,
            sus4: susValues.sus4,
            sus5: susValues.sus5,
            sus6: susValues.sus6,
            sus7: susValues.sus7,
            sus8: susValues.sus8,
            sus9: susValues.sus9,
            sus10: susValues.sus10,
        };

        const tamResponseData = {
            tam1: tamValues.tam1,
            tam2: tamValues.tam2,
            tam3: tamValues.tam3,
            tam4: tamValues.tam4,
            tam5: tamValues.tam5,
            tam6: tamValues.tam6,
            tam7: tamValues.tam7,
            tam8: tamValues.tam8,
            tam9: tamValues.tam9,
            tam10: tamValues.tam10,
            tam11: tamValues.tam11,
            tam12: tamValues.tam12,
            tam13: tamValues.tam13,
            tam14: tamValues.tam14,
            tam15: tamValues.tam15,
        };

        const dataSubmit = {
            ...formData,
            survey_id: surveys.id,
            response_data: JSON.stringify({
                ...(surveyMethods.find((method) => method.method_id === 1) && {
                    sus: susResponseData,
                }),
                ...(surveyMethods.find((method) => method.method_id === 2) && {
                    tam: tamResponseData,
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
                                <EmbedFigma surveys={surveys} />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submitForm}>
                        {surveyMethods.map((method, index) =>
                            method.method_id === 1 ? (
                                <div key={index} className="Questionnaire-SUS">
                                    <hr />
                                    <h3 className="text-center text-2xl font-bold mb-4">
                                        Questionnaire SUS
                                    </h3>
                                    <div className="mb-3">
                                        <h5 className="font-weight-bold">
                                            1. Saya berpikir akan menggunakan
                                            sistem{" "}
                                            <strong> {surveys.theme} </strong>
                                            ini lagi
                                        </h5>
                                        <RadioQuestion
                                            name="sus1"
                                            selectedValue={susValues.sus1}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-weight-bold">
                                            2. Saya merasa sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini rumit untuk digunakan
                                        </h5>
                                        <RadioQuestion
                                            name="sus2"
                                            selectedValue={susValues.sus2}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            3. Saya merasa sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini mudah digunakan
                                        </h5>
                                        <RadioQuestion
                                            name="sus3"
                                            selectedValue={susValues.sus3}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            4. Saya membutuhkan bantuan dari
                                            orang lain atau teknisi dalam
                                            menggunakan sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini
                                        </h5>
                                        <RadioQuestion
                                            name="sus4"
                                            selectedValue={susValues.sus4}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            5. Saya merasa fitur-fitur sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini berjalan dengan semestinya
                                        </h5>
                                        <RadioQuestion
                                            name="sus5"
                                            selectedValue={susValues.sus5}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            6. Saya merasa ada banyak hal yang
                                            tidak konsisten (tidak serasi pada
                                            sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini)
                                        </h5>
                                        <RadioQuestion
                                            name="sus6"
                                            selectedValue={susValues.sus6}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            7. Saya merasa orang lain akan
                                            memahami cara menggunakan sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini dengan cepat
                                        </h5>
                                        <RadioQuestion
                                            name="sus7"
                                            selectedValue={susValues.sus7}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            8. Saya merasa sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini membingungkan
                                        </h5>
                                        <RadioQuestion
                                            name="sus8"
                                            selectedValue={susValues.sus8}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            9. Saya merasa tidak ada hambatan
                                            dalam menggunakan sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini
                                        </h5>
                                        <RadioQuestion
                                            name="sus9"
                                            selectedValue={susValues.sus9}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            10. Saya perlu membiasakan diri
                                            terlebih dahulu sebelum menggunakan
                                            sistem{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini
                                        </h5>
                                        <RadioQuestion
                                            name="sus10"
                                            selectedValue={susValues.sus10}
                                            onValueChange={handleSUSChange}
                                        />
                                    </div>
                                </div>
                            ) : method.method_id === 2 ? (
                                <div key={index} className="Questionnaire-TAM">
                                    <hr />
                                    <h3 className="text-center text-2xl font-bold mb-4">
                                        Questionnaire TAM
                                    </h3>

                                    <div className="mb-3">
                                        <h5 className="font-weight-bold">
                                            1. Saya tidak mengalami kesulitan
                                            menggunakan{" "}
                                            <strong>{surveys.theme}</strong>.
                                        </h5>
                                        <RadioQuestion
                                            name="tam1"
                                            selectedValue={tamValues.tam1}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-weight-bold">
                                            2. Dengan adanya{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            dapat mencapai tujuan pekerjaan
                                            saya.
                                        </h5>
                                        <RadioQuestion
                                            name="tam2"
                                            selectedValue={tamValues.tam2}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            3. Secara keseluruhan Saya merasa{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            mudah dipahami.
                                        </h5>
                                        <RadioQuestion
                                            name="tam3"
                                            selectedValue={tamValues.tam3}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            4.{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            menjadikan pekerjaan saya lebih
                                            mudah.
                                        </h5>
                                        <RadioQuestion
                                            name="tam4"
                                            selectedValue={tamValues.tam4}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            5. Menggunakan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            dapat meningkatkan kemampuan saya.
                                        </h5>
                                        <RadioQuestion
                                            name="tam5"
                                            selectedValue={tamValues.tam5}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            6. Secara keseluruhan saya merasa{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            memiliki banyak manfaat.
                                        </h5>
                                        <RadioQuestion
                                            name="tam6"
                                            selectedValue={tamValues.tam6}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            7. Saya menerima penerapan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini
                                        </h5>
                                        <RadioQuestion
                                            name="tam7"
                                            selectedValue={tamValues.tam7}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            8. Saya menolak untuk menggunkan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            selain ini
                                        </h5>
                                        <RadioQuestion
                                            name="tam8"
                                            selectedValue={tamValues.tam8}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            9. Secara keseluruhan saya menikmati
                                            penggunaan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini
                                        </h5>
                                        <RadioQuestion
                                            name="tam9"
                                            selectedValue={tamValues.tam9}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            10. Saya berharap{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini akan selalu digunakan di masa
                                            depan.
                                        </h5>
                                        <RadioQuestion
                                            name="tam10"
                                            selectedValue={tamValues.tam10}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            11. Saya termotivasi untuk tetap
                                            menggunakan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            untuk dimasa yang akan datang.
                                        </h5>
                                        <RadioQuestion
                                            name="tam11"
                                            selectedValue={tamValues.tam11}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            12. Saya selalu menggunakan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini dalam kondisi apapun.
                                        </h5>
                                        <RadioQuestion
                                            name="tam12"
                                            selectedValue={tamValues.tam12}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            13. Saya menggunakan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini sesuai dengan prosedur yang
                                            telah diberikan.
                                        </h5>
                                        <RadioQuestion
                                            name="tam13"
                                            selectedValue={tamValues.tam13}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            14. Saya menggunakan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini secara jujur sesuai ketentuan
                                            dan prosedur.
                                        </h5>
                                        <RadioQuestion
                                            name="tam14"
                                            selectedValue={tamValues.tam14}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="font-semibold">
                                            15. Saya menggunakan{" "}
                                            <strong> {surveys.theme} </strong>{" "}
                                            ini sesuai dengan durasi waktu yang
                                            telah ditentukan secara real time.
                                        </h5>
                                        <RadioQuestion
                                            name="tam15"
                                            selectedValue={tamValues.tam15}
                                            onValueChange={handleTAMChange}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div key={index}>Eror Method</div>
                            )
                        )}
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
