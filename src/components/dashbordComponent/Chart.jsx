import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Chart() {

    const data = [
        { name: 'Jan', uv: 400 },
        { name: 'Feb', uv: 300 },
        { name: 'Mar', uv: 500 },
    ];

    return (
        <div>
            <ResponsiveContainer width="100%" height={100}>
                <LineChart data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <XAxis dataKey="name" />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart