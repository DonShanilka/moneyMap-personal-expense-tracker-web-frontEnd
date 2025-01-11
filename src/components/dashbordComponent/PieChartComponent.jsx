import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import '../dashbordComponent/dashbordStyle/picechart.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PieChartComponent = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) {
                    console.error('No user email found in localStorage');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/api/getCategorySum/${userEmail}`);
                console.log('Response data:', response.data); // Debugging log

                const totalSum = response.data.reduce((sum, item) => sum + item.value, 0);

                const normalizedData = response.data.map(item => ({
                    ...item,
                    value: totalSum ? Math.round((item.value / totalSum) * 100) : 0 // Convert each value to an integer percentage
                }));

                setChartData(normalizedData);
                console.log(normalizedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center p-4 w-80 customPossition">
            {chartData.length > 0 ? (
                <PieChart width={300} height={300}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="category" 
                        label={({ category, value }) => `${value}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default PieChartComponent;
