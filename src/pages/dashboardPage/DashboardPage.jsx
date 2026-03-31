import React from 'react'
import PieChartComponent from '../../components/dashbordComponent/PieChartComponent'
import CategoryCard from '../../components/dashbordComponent/catogorycard/CategoryCard'
import BarChart from '../../components/dashbordComponent/barchartComponent/BarChart'
import TotalExpensesCard from '../../components/dashbordComponent/totalexpensescard/TotalExpensesCard'

function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="w-full">
                <CategoryCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <TotalExpensesCard />
                <PieChartComponent />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <BarChart />
            </div>
        </div>
    );
}

export default DashboardPage