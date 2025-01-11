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
        localStorage.removeItem('token');
        window.location.reload(); // Optional: refresh page or redirect
    };

    return (
        <div className="h-full">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Section */}
                <div className="flex items-center justify-center h-16 bg-teal-600">
                    <h1 className="text-white text-xl font-bold">Your Logo</h1>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 px-4">
                    <div className="space-y-2">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
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

                {/* Bottom Section */}
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <Link
                        to="/logout"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-colors duration-200 group"
                    >
                        <span className="text-gray-500 group-hover:text-teal-600">
                            <LogOut size={20} />
                        </span>
                        <span onClick={handleLogout} className="ml-3 font-medium group-hover:text-teal-600">
                            Logout
                        </span>
                    </Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:ml-64 p-8 absolute top-0 left-0 w-10/12">
                <div className="max-w-4xl mx-auto w-full">
                    <Routes>
                        <Route path='*' element={<DashboardPage />} />
                        {
                            route.map((val) => (
                                <Route path={val.path} element={val.element} key={val.key} />
                            ))
                        }
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
