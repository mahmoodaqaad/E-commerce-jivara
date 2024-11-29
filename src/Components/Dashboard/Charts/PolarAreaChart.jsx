import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PolarAreaChart = ({ mode }) => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Votes',
                data: [11, 16, 7, 3, 14, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
        <div className={`p-4 rounded-3 bg-card  ${!mode && "shadow"}`}>
            <PolarArea data={data} height={340} options={options} />
        </div>
    );
};

export default PolarAreaChart;
