import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from '../pages/loginPage/LoginPage.jsx';
import RegisterPage from '../pages/registerPage/RegisterPage.jsx';
import '../index.css';
import SideBar from "../common/sideBar/SideBar.jsx";
import DashboardPage from "../pages/dashboardPage/DashboardPage.jsx";
import ExpensesPage from "../pages/expensesPage/ExpensesPage.jsx";
import { useEffect, useState } from "react";


function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userEmail')) {
      setLogin(true);
    }
  }, []);

  return (
    <Router>
      <div>
        {login ? (
          <SideBar />
        ) : (
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App
