import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WaveChart = ({ mode }) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Wave Data',
                data: [0, 20, 50, 20, 0, 20, 50, 20], // يمكن تعديل هذه القيم لتكون أكثر تشابهاً مع الموجات
                borderColor: 'rgba(75, 192, 192, 1)', // لون الخط
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // لون خلفية الخط
                fill: true,
                tension: 0.4, // تأثير التوتر لجعل الخط يبدو مائلاً أكثر
            },
        ],
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };
    return (
        <div className={`p-4 rounded-3 bg-card ${!mode && "shadow"}`}>
            <Line data={data} height={340} options={options} />
        </div>
    );
};

export default WaveChart;
