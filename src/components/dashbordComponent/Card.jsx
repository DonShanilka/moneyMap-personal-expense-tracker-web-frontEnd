import React from 'react';

const Card = ({ icon, count, label, subtitle }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center w-full sm:w-56">
            <div className="text-3xl bg-green-100 text-green-600 rounded-full p-4 mb-4">
                {icon}
            </div>
            <h2 className="text-2xl font-bold">{count}</h2>
            <p className="text-lg font-semibold">{label}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    );
};

export default Card;
