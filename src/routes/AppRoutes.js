import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SalesDashboard from '../pages/SalesDashboard/SalesDashboard';
import FinanceDashboard from '../pages/FinanceDashboard/FinanceDashboard';
import EngineeringDashboard from '../pages/EngineeringDashboard/EngineeringDashboard';
import HRDashboard from '../pages/HRDashboard/HRDashboard';
import Home from '../pages/Home/Home';

const AppRoutes = ({ role, setRole }) => {
  return (
    <Routes>
      {/* Home Page Route */}
      <Route path="/" element={<Home setRole={setRole} />} />

      {/* Conditional Role Dashboards */}
      {role === 'sales' && (
        <Route path="/dashboard" element={<SalesDashboard />} />
      )}
      {role === 'finance' && (
        <Route path="/dashboard" element={<FinanceDashboard />} />
      )}
      {role === 'engineering' && (
        <Route path="/dashboard" element={<EngineeringDashboard />} />
      )}
      {role === 'hr' && <Route path="/dashboard" element={<HRDashboard />} />}

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;

