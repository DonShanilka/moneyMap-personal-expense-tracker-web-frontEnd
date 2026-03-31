import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const PieChartComponent = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) return;

                const response = await axios.get(`http://localhost:3000/api/getCategorySum/${userEmail}`);
                
                const rawData = response.data || [];
                const totalSum = rawData.reduce((sum, item) => sum + Number(item.value || 0), 0);

                const normalizedData = rawData.map(item => ({
                    ...item,
                    value: totalSum ? Math.round((Number(item.value || 0) / totalSum) * 100) : 0 
                })).filter(item => item.value > 0);

                setChartData(normalizedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full min-h-[400px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Expenses by Category</h2>
            <div className="flex-1 w-full flex items-center justify-center">
                {loading ? (
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-gray-200 h-40 w-40"></div>
                    </div>
                ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="category"
                                label={({ value }) => `${value}%`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-400 italic">No expense data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PieChartComponent;
