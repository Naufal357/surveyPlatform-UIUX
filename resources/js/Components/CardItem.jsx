import React from "react";
import { Link } from "@inertiajs/inertia-react";

const CardItem = ({ type, data, link, maxTitleLength, surveyFilled = false }) => {
    maxTitleLength = maxTitleLength || 80; 

    const truncatedTitle =
        data.title.length > maxTitleLength
            ? data.title.substring(0, maxTitleLength) + "..."
            : data.title;

    return (
        <>
            {type === "survey" && (
                <Link href={link} className="text-dark text-decoration-none">
                    <div className={`card border-0 rounded-3 shadow-sm survey`}>
                        <div
                            style={{
                                width: "100%",
                                height: "200px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={
                                    data.image.length > 0
                                        ? data.image
                                        : "/assets/images/image.png"
                                }
                                alt={data.title}
                                className="img-fluid rounded mb-4 mx-auto d-block"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div className="card-body h-100">
                            <h6
                                className={`card-title text-center title-book`}
                                style={{
                                    height: "60px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {truncatedTitle}
                            </h6>
                        </div>
                    </div>
                </Link>
            )}
            {type === "article" && (
                <Link href={link} className="text-dark text-decoration-none">
                    <div className="card border-0 rounded-3 shadow-sm article">
                        <div
                            style={{
                                width: "100%",
                                height: "200px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={
                                    data.image.length > 0
                                        ? data.image
                                        : "/assets/images/image.png"
                                }
                                alt={data.title}
                                className="card-img-top"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div className="card-body h-100">
                            <h6
                                className="card-title text-center title-book"
                                style={{
                                    height: "60px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {truncatedTitle}
                            </h6>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default CardItem;
