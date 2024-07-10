import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function CardCategory({ category }) {
    return (
        <>
            <Link
                href={`/categories/${category.slug}`}
                className="text-decoration-none text-dark"
            >
                <div className="card border-0 rounded-3 shadow-sm category">
                    <div className="card-body text-center">
                        <div
                            style={{
                                width: "100%",
                                height: "135px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={
                                    category.image
                                        ? category.image
                                        : "/assets/images/image.png"
                                }
                                className="card-img-top"
                                alt={category.name}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                                loading="lazy"
                            />
                        </div>
                        <p
                            className="card-title text-center title-book mt-3"
                            style={{
                                height: "25px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {category.name}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
}
