//import react
import React from "react";
import LayoutAccount from "../../../Layouts/Account";
import Search from "../../../Components/Search";
import Delete from "../../../Components/Delete";
import Pagination from "../../../Components/Pagination";
import { Head, usePage, Link } from "@inertiajs/inertia-react";


export default function surveyIndex() {
    //destruct props "surveys"
    const { auth, surveys } = usePage().props;
    
    return (
        <>
            <Head>
                <title>Surveys - Survey Platform</title>
            </Head>
            <LayoutAccount>
                <div className="row mt-5">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3 col-12 mb-2">
                                <Link
                                    href="/account/surveys/create"
                                    className="btn btn-md btn-success border-0 shadow w-100"
                                    type="button"
                                >
                                    <i className="fa fa-plus-circle me-2"></i>
                                    Tambah
                                </Link>
                            </div>
                            <div className="col-md-9 col-12 mb-2">
                                <Search URL={"/account/Surveys"} />
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
                                                    style={{ width: "5%" }}
                                                >
                                                    No.
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "10%" }}
                                                >
                                                    Survey Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "10%" }}
                                                >
                                                    Theme
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "25%" }}
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "15%" }}
                                                >
                                                    Updated At
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "20%" }}
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
                                                (survey, index) => (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            {++index +
                                                                (surveys.current_page -
                                                                    1) *
                                                                    surveys.per_page}
                                                        </td>
                                                        <td>{survey.title}</td>
                                                        <td>{survey.theme}</td>
                                                        <td>
                                                            {survey.description}
                                                        </td>
                                                        <td>
                                                            {survey.updated_at}
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
                                                            <Link
                                                                href={`/account/surveys/${survey.id}/edit`}
                                                                className="btn btn-primary btn-sm m-2"
                                                            >
                                                                <i className="fa fa-pencil-alt"></i>
                                                            </Link>
                                                            <Delete
                                                                URL={
                                                                    "/account/surveys"
                                                                }
                                                                id={survey.id}
                                                            />
                                                            <Link
                                                                href={`/`}
                                                                className="btn btn-success btn-sm m-2"
                                                            >
                                                                <i class="fas fa-share"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
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
