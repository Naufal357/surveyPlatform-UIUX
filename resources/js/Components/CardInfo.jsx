import React from "react";

const InfoCard = ({ icon, background, value, title }) => {
    const isBackgroundHashed = background.startsWith("#");

    return (
        <div className="col-12 col-lg-3 mb-4 mx-auto">
            <div className={`card border-0 rounded shadow-sm overflow-hidden`}>
                <div className="card-body p-0 d-flex align-items-center">
                    <div
                        className={`py-4 px-5 mfe-3 text-value ${
                            isBackgroundHashed ? background : `bg-${background}`
                        }`}
                        style={{
                            width: "130px",
                            backgroundColor: isBackgroundHashed
                                ? background
                                : `#${background}`,
                        }}
                    >
                    <i className={`fas ${icon} fa-2x text-white`}></i>
                    </div>
                    <div>
                        <div>{value}</div>
                        <div className="text-muted text-uppercase font-weight-bold small">
                            {title}
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    );
};

export default InfoCard;
