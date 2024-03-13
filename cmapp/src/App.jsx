import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import PolicyApplication from './pages/PolicyApplication';
import ClaimApplication from './pages/ClaimApplication';
import PolicyRequestsPage from './pages/PolicyRequestsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/policies" element={<PolicyApplication />} />
        <Route path="/policy-requests" element={<PolicyRequestsPage />} />
        <Route path="/claims" element={<ClaimApplication />} />
      </Routes>
    </Router>
  );
};

export default App;
