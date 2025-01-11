import React from 'react';

const ExpenseCard = () => (
    <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Expenses</h2>
        <p className="text-2xl font-bold">$124K</p>
        <div className="text-gray-500 text-sm">This Month</div>
        {/* Add doughnut chart for expenses breakdown here */}
    </div>
);

export default ExpenseCard;
