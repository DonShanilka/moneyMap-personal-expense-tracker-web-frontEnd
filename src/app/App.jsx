import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from '../pages/loginPage/LoginPage.jsx';
import RegisterPage from '../pages/registerPage/RegisterPage.jsx';
import '../index.css';  // Import Tailwind here
import SideBar from "../common/sideBar/SideBar.jsx";
import DashboardPage from "../pages/dashboardPage/DashboardPage.jsx";
import ExpensesPage from "../pages/expensesPage/ExpensesPage.jsx";
import { useEffect, useState } from "react";


function App() {

  const [login, setLogin] = useState(false)
  console.log(setLogin);

  useEffect(() => {
    console.log(localStorage.getItem);

    if (localStorage.getItem('token')) {
      setLogin(true)
    }
  }, [])

  return (
    <div>
      {
        login ?
          <Router>
            <SideBar />
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/expenses" />
              {/* Add additional routes as needed */}
            </Routes>
          </Router>
          :
          <Router>
            <Routes>
              <Route path="*" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Router>
      }
    </div>
  )
}

export default App
