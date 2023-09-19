import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const SUSPieChart = ({ data }) => {
    return (
        <div className="chart-container">
            {data.labels && data.datasets && (
                <Pie
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
            )}
        </div>
    );
};

export default SUSPieChart;
