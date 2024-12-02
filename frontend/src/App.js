import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import EmployeePage from './pages/EmployeePage'; // Import EmployeePage

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" exact element={<LoginPage />} />
                <Route path="/employees" element={<EmployeePage />} />
            </Routes>
        </Router>
    );
}

export default App;
