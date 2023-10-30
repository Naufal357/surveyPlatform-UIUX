import React from "react";
import { Link } from "@inertiajs/inertia-react";

const CardSurvey = ({ survey }) => {
    return (
        <Link
            href={`/form/${survey.id}`}
            className="text-dark text-decoration-none"
        >
            <div className="card border-0 h-100 rounded-3 shadow-sm">
                <img
                    src={
                        survey.image.length > 0
                            ? survey.image
                            : "/assets/images/image.png"
                    }
                    className="card-img-top"
                    alt={survey.title}
                    style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body h-100">
                    <h6 className="card-title text-center title-book">
                        {survey.title}
                    </h6>
                </div>
            </div>
        </Link>
    );
};

export default CardSurvey;
