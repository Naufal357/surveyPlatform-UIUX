import React, { useState } from "react";
import LayoutAccount from "../../../Layouts/Account";
import ButtonCRUD from "../../../Components/ButtonCRUD";
import AuthField from "../../../Components/AuthField";
import CustomDatePicker from "../../../Components/DatePicker";
import { Head, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

export default function UserCreate() {
    const { errors, roles, categories } = usePage().props;

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [profession, setProfession] = useState("");
    const [educationalBackground, setEducationalBackground] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [rolesData, setRolesData] = useState([]);
    const [userPrefsData, setUserPrefsData] = useState([]);

    const handleCheckboxRolesChange = (e) => {
        let data = rolesData;
        data.push(e.target.value);

        setRolesData(data);
    };

    const handleCheckboxUserPrefsChange = (e) => {
        let data = userPrefsData;
        data.push(parseInt(e.target.value, 10));

        setUserPrefsData(data);
    };

    const storeUser = async (e) => {
        e.preventDefault();

        if (e.nativeEvent.submitter.getAttribute("type") === "Cancel") {
            handleReset();
            return;
        }

        Inertia.post(
            "/account/users",
            {
                //data
                first_name: firstName,
                surname: surname,
                email: email,
                gender: gender,
                birth_date: birthDate,
                profession: profession,
                educational_background: educationalBackground,
                password: password,
                password_confirmation: passwordConfirmation,
                roles: rolesData,
                user_prefs: userPrefsData,
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
                },
            }
        );
    };

    const handleReset = () => {
        setFirstName("");
        setSurname("");
        setEmail("");
        setGender("");
        setBirthDate(null);
        setProfession("");
        setEducationalBackground("");
        setPassword("");
        setPasswordConfirmation("");
        setRolesData([]);
        setUserPrefsData([]);
    };

    return (
        <>
            <Head>
                <title>Create Users - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-users"></i> Add New User
                                </span>
                            </div>
                            <div className="card-body">
                                <form onSubmit={storeUser}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
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
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
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
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
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
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <AuthField
                                                    icon="fas fa-venus-mars"
                                                    label="Gender"
                                                    value={gender}
                                                    onChange={(e) =>
                                                        setGender(
                                                            e.target.value
                                                        )
                                                    }
                                                    options={["Male", "Female"]}
                                                    error={errors.gender}
                                                    fieldselect="true"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <AuthField
                                                    icon="fas fa-user-tie"
                                                    label="Profession"
                                                    value={profession}
                                                    onChange={(e) =>
                                                        setProfession(
                                                            e.target.value
                                                        )
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
                                                        "other",
                                                    ]}
                                                    error={errors.profession}
                                                    fieldselect="true"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <AuthField
                                                    icon="fas fa-user-graduate"
                                                    label="Educational Background"
                                                    value={
                                                        educationalBackground
                                                    }
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
                                                    error={
                                                        errors.educationalBackground
                                                    }
                                                    fieldselect="true"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <CustomDatePicker
                                        label="Birth Date"
                                        icon="fas fa-calendar-alt"
                                        selectedDate={birthDate}
                                        onChange={(date) => setBirthDate(date)}
                                        error={errors.birthDate}
                                        required
                                    />

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
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
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
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
                                    </div>

                                    <div className="mb-3">
                                        <label className="fw-bold">Roles</label>
                                        <br />
                                        {roles.map((role, index) => (
                                            <div
                                                className="form-check form-check-inline"
                                                key={index}
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={role.name}
                                                    onChange={
                                                        handleCheckboxRolesChange
                                                    }
                                                    id={`check-${role.id}`}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`check-${role.id}`}
                                                >
                                                    {role.name}
                                                </label>
                                            </div>
                                        ))}

                                        <div className="mb-3">
                                            <label className="fw-bold">
                                                Preference Categories
                                            </label>
                                            <br />
                                            {categories.map(
                                                (category, index) => (
                                                    <div
                                                        className="form-check form-check-inline"
                                                        key={index}
                                                    >
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value={category.id}
                                                            defaultChecked={userPrefsData.some(
                                                                (category_id) =>
                                                                    category_id ===
                                                                        category.id ??
                                                                    true
                                                            )}
                                                            onChange={
                                                                handleCheckboxUserPrefsChange
                                                            }
                                                            id={`check-${category.id}`}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`check-${category.id}`}
                                                        >
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

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
