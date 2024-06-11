import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function CardCategory({ category }) {
    return (
        <>
            <div className="col-2 mb-3">
                <Link
                    href={`/categories/${category.slug}`}
                    className="text-decoration-none text-dark"
                >
                    <div className="card border-0 rounded-3 h-100 shadow-sm">
                        <div className="card-body text-center">
                            <img
                                src={
                                    category.image
                                        ? category.image
                                        : "/assets/images/image.png"
                                }
                                className="card-img-top"
                                alt={category.name}
                                width="50px"
                            />
                            <p className="card-title mt-3">{category.name}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}
