import React, { useState } from 'react';
import { Home, Coins, LogOut, Menu, X } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import route from '../../routes/route';
import DashboardPage from '../../pages/dashboardPage/DashboardPage';

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { title: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { title: 'Expenses', icon: <Coins size={20} />, path: '/expenses' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        window.location.href = '/login'; 
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`fixed inset-y-0 left-0 bg-white w-64 shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-center h-16 bg-teal-600">
                    <h1 className="text-white text-xl font-bold">MoneyMap</h1>
                </div>
                <nav className="mt-6 px-4">
                    <div className="space-y-2">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors duration-200 group"
                            >
                                <div className="flex items-center">
                                    <span className="text-gray-500 group-hover:text-teal-600">
                                        {item.icon}
                                    </span>
                                    <span className="ml-3 font-medium group-hover:text-teal-600">
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors duration-200 group"
                    >
                        <span className="text-gray-500 group-hover:text-teal-600">
                            <LogOut size={20} />
                        </span>
                        <span className="ml-3 font-medium group-hover:text-teal-600">
                            Logout
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            {
                                route.map((val) => (
                                    <Route path={val.path} element={val.element} key={val.key} />
                                ))
                            }
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SideBar;
