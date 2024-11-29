import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const LineChart = ({ mode }) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: 'Dataset 1',
                data: [20, 10, 15, 21, 9, 19, 25, 30, 15, 24, 12],
                borderColor: 'rgba(75, 192, 192, 1)', // لون الحدود
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // لون الخلفية
                fill: true,
                tension: 0.1,
            },
            {
                label: 'Dataset 2',
                data: [30, 25, 20, 25, 19, 29, 35, 20, 25, 18, 22],
                borderColor: 'rgba(255, 99, 132, 1)', // لون الحدود للخط الثاني
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // لون الخلفية للخط الثاني
                fill: true,
                tension: 0.1,
            },
            {
                label: 'Dataset 3',
                data: [10, 15, 20, 15, 25, 20, 30, 15, 20, 10, 15],
                borderColor: 'rgba(255, 206, 86, 1)', // لون الحدود للخط الثالث
                backgroundColor: 'rgba(255, 206, 86, 0.2)', // لون الخلفية للخط الثالث
                fill: true,
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true, maintainAspectRatio: false
    };

    return (
        <div className={`p-4 rounded-3 bg-card ${!mode && "shadow"}`}>
            <Line data={data} height={340} options={options} />
        </div>
    );
};

export default LineChart;
