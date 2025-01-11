import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../barchartComponent/barchart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get userEmail from localStorage
                const userEmail = localStorage.getItem('userEmail');

                if (!userEmail) {
                    console.error('No user email found in localStorage');
                    return;
                }

                // Pass userEmail as a query parameter
                const response = await axios.get(`http://localhost:3000/api/getLast7DaysData/${userEmail}`, {
                    params: { userEmail },
                });

                const data = response.data;

                // Extract categories and totals
                const labels = data.map(item => item.category);
                const totals = data.map(item => item.total);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total Expenses (Last 7 Days)',
                            data: totals,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                '#b3ffcc',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                            ],
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Category-wise Expense Summary for Last 7 Days',
            },
        },
    };

    return (
        <div className="possitionBarchart w-2/4">
            {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
        </div>
    );
};

export default BarChart;
