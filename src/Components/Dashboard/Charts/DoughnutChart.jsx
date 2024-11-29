import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const DoughnutChart = ({ mode }) => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: 'Votes',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className={`p-4 rounded-3 bg-card ${!mode && "shadow"}`}>
            <Doughnut data={data} height={340} options={options} />
        </div>
    );
};

export default DoughnutChart;
