import React from "react";
import { Link } from "@inertiajs/inertia-react";

const MAX_WORDS = 20; // Ganti dengan jumlah kata maksimum yang Anda inginkan

const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
};

const CardSurvey = ({ survey }) => {
    const truncatedDescription = truncateText(survey.description, MAX_WORDS);

    return (
        <Link href={`/form/${survey.id}`} className="text-dark text-decoration-none">
            <div className="card">
                <img
                    src={
                        survey.image.length > 0
                            ? survey.image
                            : "/assets/images/image.png"
                    }
                    className="card-img-top"
                    alt={survey.title}
                    style={{ objectFit: "cover", height: "200px" }} // Menyesuaikan tinggi gambar
                />
                <div className="card-body">
                    <h5 className="card-title">{survey.title}</h5>
                    <p className="card-text">{truncatedDescription}</p>
                </div>
            </div>
        </Link>
    );
};

export default CardSurvey;

// <div className="col-md-3 col-6 mb-4">
//   <div className="card border-0 h-100 rounded-3 shadow-sm survey-card">
//     <div className="card-image">
//       {survey.image ? (
//         <img src={survey.image} className="w-100 rounded-top" alt={survey.title} />
//       ) : (
//         <img src="/assets/images/default-image.png" className="w-100 rounded-top" alt="Placeholder" />
//       )}
//     </div>
//     <div className="card-body h-100">
//       <h6 className="card-title text-center">{survey.title}</h6>
//       <p className="card-text">{truncatedDescription}</p>
//     </div>
//     <div className="card-footer">
//       <div className="row justify-content-between">
//         <div className="col-md-6 col-12 text-start">{survey.theme}</div>
//         <div className="col-md-6 col-12 text-end">{survey.created_at}</div>
//       </div>
//     </div>
//   </div>
// </div>
//     );
// };

// export default CardSurvey;
