import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ mode }) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2, 3, 15, 10],
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // لون الخلفية
            },
            {
                label: 'Dataset 2',
                data: [2, 3, 20, 5, 1, 4, 9, 12],
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // لون الخلفية للعمود الثاني
            },
            {
                label: 'Dataset 3',
                data: [5, 8, 15, 10, 20, 5, 10, 6],
                backgroundColor: 'rgba(255, 206, 86, 0.6)', // لون الخلفية للعمود الثالث
            },
            {
                label: 'Dataset 4',
                data: [3, 10, 8, 6, 4, 15, 9, 8],
                backgroundColor: 'rgba(153, 102, 255, 0.6)', // لون الخلفية للعمود الرابع
            },
        ],
    };

    const options = {
        responsive: true, maintainAspectRatio: false
    };

    return (
        <div className={`p-4 rounded-3 bg-card ${!mode && "shadow"}`}>
            <Bar data={data} height={340} options={options} />
        </div>
    );
};

export default BarChart;
