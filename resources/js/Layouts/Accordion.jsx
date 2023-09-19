import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { CaretDownFill, CaretRightFill } from "react-bootstrap-icons";

const AccordionLayout = ({ title, children, defaultOpen = false }) => {
    // State untuk mengelola status accordion
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // Fungsi untuk mengganti status accordion
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    // Gaya untuk accordion
    const accordionStyle = {
        backgroundColor: isOpen ? "#e0e0e0" : "#f9f9f9",
        borderRadius: "4px",
        padding: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        fontFamily: "Arial, sans-serif",
    };

    // Gaya untuk judul accordion
    const titleStyle = {
        fontSize: "18px",
        fontWeight: "Bold",
        color: "#333",
    };

    // Gaya untuk ikon panah
    const iconStyle = {
        marginRight: "10px",
        transition: "transform 0.3s",
    };

    // Gaya hover untuk accordion
    const hoverStyle = {
        backgroundColor: "#e0e0e0",
    };

    return (
        <div
            className="accordion"
            style={accordionStyle}
            onClick={toggleAccordion}
        >
            <div className="card">
                <div className="card-header">
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
    );
};

export default AccordionLayout;
