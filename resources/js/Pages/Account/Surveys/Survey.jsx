import React from "react";
import LayoutAccount from "../../../Layouts/Account";
import hasAnyPermission from "../../../Utils/Permissions";
import Search from "../../../Components/Search";
import Delete from "../../../Components/Delete";
import Pagination from "../../../Components/Pagination";
import Swal from "sweetalert2";
import { Head, usePage, Link } from "@inertiajs/inertia-react";

export default function SurveyIndex() {
    const { auth, surveys } = usePage().props;

    function limitWords(text, limit) {
        const words = text.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + "...";
        }
        return text;
    }

    return (
        <>
            <Head>
                <title>Surveys - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="row">
                            {hasAnyPermission(["surveys.create"]) && (
                                <div className="col-md-3 col-12 mb-2">
                                    <Link
                                        href="/account/surveys/create"
                                        className="btn btn-md btn-success border-0 shadow w-100"
                                        type="button"
                                    >
                                        <i className="fa fa-plus-circle me-2"></i>
                                        Add
                                    </Link>
                                </div>
                            )}
                            <div className="col-md-9 col-12 mb-2">
                                <Search URL={"/account/surveys/"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow-sm border-top-success">
                            <div className="card-header">
                                <span className="font-weight-bold">
                                    <i className="fa fa-folder"></i> Surveys
                                    Directory
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped table-hovered">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    style={{ width: "2%" }}
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "10%" }}
                                                >
                                                    Survey Name
                                                </th>
                                                {hasAnyPermission([
                                                    "surveys.index.full",
                                                ]) && (
                                                    <th
                                                        scope="col"
                                                        style={{ width: "10%" }}
                                                    >
                                                        Creator Name
                                                    </th>
                                                )}
                                                <th
                                                    scope="col"
                                                    style={{ width: "10%" }}
                                                >
                                                    Theme
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "31%" }}
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "12%" }}
                                                >
                                                    Updated At
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "10%" }}
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {surveys.data.map(
                                                (survey, index) => {
                                                    const surveyUrl = `http://127.0.0.1:8000/form/${survey.slug}`;

                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-center">
                                                                {++index +
                                                                    (surveys.current_page -
                                                                        1) *
                                                                        surveys.per_page}
                                                            </td>
                                                            <td>
                                                                {survey.title}
                                                            </td>
                                                            {hasAnyPermission([
                                                                "surveys.index.full",
                                                            ]) && (
                                                                <td>
                                                                    {`${survey.user.first_name} ${survey.user.surname}`}
                                                                </td>
                                                            )}
                                                            <td>
                                                                {survey.theme}
                                                            </td>
                                                            <td>
                                                                {limitWords(
                                                                    survey.description,
                                                                    70
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    survey.updated_at
                                                                }
                                                            </td>
                                                            <td className="text-center">
                                                                <img
                                                                    src={
                                                                        survey.image
                                                                    }
                                                                    className="rounded-3"
                                                                    width={"50"}
                                                                />
                                                            </td>
                                                            <td className="text-center">
                                                                {hasAnyPermission(
                                                                    [
                                                                        "surveys.edit",
                                                                    ]
                                                                ) && (
                                                                    <Link
                                                                        href={`/account/surveys/${survey.id}/edit`}
                                                                        className="btn btn-primary btn-sm m-2"
                                                                    >
                                                                        <i className="fa fa-pencil-alt"></i>
                                                                    </Link>
                                                                )}
                                                                {hasAnyPermission(
                                                                    [
                                                                        "surveys.delete",
                                                                    ]
                                                                ) && (
                                                                    <Delete
                                                                        URL={
                                                                            "/account/surveys"
                                                                        }
                                                                        id={
                                                                            survey.id
                                                                        }
                                                                    />
                                                                )}
                                                                <button
                                                                    className="btn btn-success btn-sm m-2"
                                                                    onClick={() => {
                                                                        Swal.fire(
                                                                            {
                                                                                title: "Bagikan Survey",
                                                                                html: `<p>Salin URL di bawah :</p><input id="urlInput" type="text" value="${surveyUrl}" readOnly>`,
                                                                                showCancelButton: true,
                                                                                showConfirmButton: false,
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    <i className="fas fa-share-alt"></i>{" "}
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary btn-sm m-2"
                                                                    onClick={() =>
                                                                        window.open(
                                                                            surveyUrl
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa fa-external-link-alt"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <Pagination
                                    links={surveys.links}
                                    align={"end"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAccount>
        </>
    );
}
