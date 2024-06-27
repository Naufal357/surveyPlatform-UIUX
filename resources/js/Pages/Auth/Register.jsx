import React, { useState } from "react";
import Layout from "../../Layouts/Header";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AuthField from "../../Components/AuthField";
import CustomDatePicker from "../../Components/DatePicker";

export default function Register() {
    const { errors } = usePage().props;

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [profession, setProfession] = useState("");
    const [educationalBackground, setEducationalBackground] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const registerHandler = async (e) => {
        e.preventDefault();

        Inertia.post("/register/personaldata", {
            first_name: firstName,
            surname: surname,
            email: email,
            birth_date: birthDate,
            gender: gender,
            profession: profession,
            educational_background: educationalBackground,
            password: password,
            password_confirmation: passwordConfirmation,
        });
    };

    return (
        <>
            <Head>
                <title>Register Account - Survey Platform</title>
            </Head>
            <Layout footerVisible={false}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 mt-80">
                            <div className="text-center mb-4">
                                <img
                                    src="/assets/images/logo.png"
                                    width={"60"}
                                />
                                <h4>
                                    <h4>
                                        <strong>Survey</strong>{" "}
                                        <small>Platform</small>
                                    </h4>
                                </h4>
                            </div>
                            <div className="card border-0 rounded-3 shadow-sm border-top">
                                <div className="card-body">
                                    <div className="text-center">
                                        <h6 className="fw-bold">
                                            REGISTER ACCOUNT
                                        </h6>
                                        <hr />
                                    </div>
                                    <form onSubmit={registerHandler}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <AuthField
                                                    icon="fa fa-user"
                                                    label="First Name"
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) =>
                                                        setFirstName(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="First Name"
                                                    error={errors.firstName}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <AuthField
                                                    icon="fa fa-user"
                                                    label="Surname"
                                                    type="text"
                                                    value={surname}
                                                    onChange={(e) =>
                                                        setSurname(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Surname"
                                                    error={errors.surname}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <AuthField
                                            icon="fa fa-envelope"
                                            label="Email Address"
                                            type="text"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Email Address"
                                            error={errors.email}
                                            required
                                        />

                                        <AuthField
                                            icon="fas fa-venus-mars"
                                            label="Gender"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                            options={["Male", "Female"]}
                                            error={errors.gender}
                                            fieldselect="true"
                                            required
                                        />

                                        <AuthField
                                            icon="fas fa-user-tie"
                                            label="Profession"
                                            value={profession}
                                            onChange={(e) =>
                                                setProfession(e.target.value)
                                            }
                                            options={[
                                                "Government Employee",
                                                "Armed Forces",
                                                "Police",
                                                "Entrepreneur",
                                                "Private Workers",
                                                "Freelancer",
                                                "Homemaker",
                                                "Professor",
                                                "Student",
                                                "Other",
                                            ]}
                                            error={errors.profession}
                                            fieldselect="true"
                                            required
                                        />

                                        <AuthField
                                            icon="fas fa-user-graduate"
                                            label="Educational Background"
                                            value={educationalBackground}
                                            onChange={(e) =>
                                                setEducationalBackground(
                                                    e.target.value
                                                )
                                            }
                                            options={[
                                                "Elementary School",
                                                "Junior High School",
                                                "High School",
                                                "Associate's Degree",
                                                "Bachelor's Degree",
                                                "Master's Degree",
                                                "Doctorate Degree",
                                            ]}
                                            error={errors.educationalBackground}
                                            fieldselect="true"
                                            required
                                        />

                                        <CustomDatePicker
                                            label="Birth Date"
                                            icon="fas fa-calendar-alt"
                                            selectedDate={birthDate}
                                            onChange={(date) =>
                                                setBirthDate(date)
                                            }
                                            error={errors.birthDate}
                                            required
                                        />

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AuthField
                                                    icon="fa fa-lock"
                                                    label="Password"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Password"
                                                    error={errors.password}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <AuthField
                                                    icon="fa fa-lock"
                                                    label="Password Confirmation"
                                                    type="password"
                                                    value={passwordConfirmation}
                                                    onChange={(e) =>
                                                        setPasswordConfirmation(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Password Confirmation"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-style shadow-sm rounded-sm px-4 w-100"
                                            type="submit"
                                        >
                                            Next
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="register text-center mt-3">
                                Have an account?{" "}
                                <Link href="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
