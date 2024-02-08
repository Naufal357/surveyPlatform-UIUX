import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const calculatePercentage = (value, total) => {
        return ((value / total) * 100).toFixed(2) + "%";
    };

    const chartData = {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            hoverBackgroundColor: dataset.backgroundColor,
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dataset = data.datasets[context.datasetIndex];
                        const total = dataset.data.reduce(
                            (acc, value) => acc + value,
                            0
                        );
                        const value = dataset.data[context.dataIndex];
                        const percentage = calculatePercentage(value, total);
                        return `${
                            data.labels[context.dataIndex]
                        }: ${value} (${percentage})`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            {data.labels && data.datasets && (
                <Pie data={chartData} options={options} />
            )}
        </div>
    );
};

export default PieChart;
