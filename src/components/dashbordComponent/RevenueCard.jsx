import React from 'react'

function RevenueCard() {
    return (
        <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Revenue</h2>
            <p className="text-2xl font-bold">$134K</p>
            <div className="text-gray-500 text-sm">Today</div>
            {/* Add line chart for revenue trends here */}
        </div>
    )
}

export default RevenueCard