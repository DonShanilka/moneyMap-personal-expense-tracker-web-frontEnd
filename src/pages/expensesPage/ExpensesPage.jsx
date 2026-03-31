import React, { useState } from 'react'
import ExpensesTable from '../../components/table/ExpensesTable'
import AddButton from '../../components/add/AddButton'

function ExpensesPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
                <AddButton onRefresh={handleRefresh} />
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <ExpensesTable refreshTrigger={refreshTrigger} />
            </div>
        </div>
    );
}

export default ExpensesPage