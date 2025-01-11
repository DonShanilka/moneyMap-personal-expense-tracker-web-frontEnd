import React from 'react';
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import ExpensesPage from "../pages/expensesPage/ExpensesPage";

const route = [
    {
        name: 'dashboard',
        path: '/dashboard',
        element: <DashboardPage />,
        key: 'dashboard'
    },
    {
        name: 'expenses',
        path: '/expenses',
        element: <ExpensesPage />,
        key: 'expenses'
    }

]

export default route