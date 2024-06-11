import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";

const AccordionLayout = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const accordionStyle = {
        backgroundColor: isOpen ? "#e0e0e0" : "#f9f9f9",
        borderRadius: "4px",
        padding: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        fontFamily: "Arial, sans-serif",
    };

    const titleStyle = {
        fontSize: "18px",
        fontWeight: "Bold",
        color: "#333",
    };

    const iconStyle = {
        marginRight: "10px",
        transition: "transform 0.3s",
    };

    const hoverStyle = {
        backgroundColor: "#e0e0e0",
    };

    return (
        <div className="accordion" style={accordionStyle}>
            <div className="card">
                <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-header" onClick={toggleAccordion}>
                        <h5
                            className="mb-0 d-flex align-items-center justify-content-between"
                            style={titleStyle}
                        >
                            {title}
                            {isOpen ? (
                                <CaretDownFill size={20} style={iconStyle} />
                            ) : (
                                <CaretRightFill size={20} style={iconStyle} />
                            )}
                        </h5>
                    </div>
                    <Collapse in={isOpen}>
                        <div className="card-body">{children}</div>
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

export default AccordionLayout;
