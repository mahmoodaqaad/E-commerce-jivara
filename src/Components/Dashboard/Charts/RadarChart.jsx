import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, PolarAreaController, PointElement, LineElement, LinearScale, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(PolarAreaController, PointElement, LineElement, LinearScale, RadialLinearScale, Title, Tooltip, Legend);

const RadarChart = ({ mode }) => {
    const data = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Working', 'Playing'],
        datasets: [
            {
                label: 'Activities',
                data: [2, 3, 4, 5, 1],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className={`p-4 rounded-3  bg-card ${!mode && "shadow"}`}>
            <Radar data={data} height={340} options={options} />
        </div>
    );
};

export default RadarChart;
