import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SalesDashboard from '../pages/SalesDashboard/SalesDashboard';
import FinanceDashboard from '../pages/FinanceDashboard/FinanceDashboard';
import EngineeringDashboard from '../pages/EngineeringDashboard/EngineeringDashboard';
import HRDashboard from '../pages/HRDashboard/HRDashboard';
import Home from '../pages/Home/Home';
// import ProjectAllocation from "../pages/EngineeringDashboard/ProjectAllocation";
import ProjectAllocation from "../pages/EngineeringDashboard/projectAllocation";
// import TeamMembers from "../pages/EngineeringDashboard/TeamMembers";
import TeamMembers from "../pages/EngineeringDashboard/TeamMembers";
 
const AppRoutes = ({ role, setRole }) => {
  return (
    <Routes>
      <Route path="/" element={<Home setRole={setRole} />} />
 
      {role === 'sales' && <Route path="/dashboard" element={<SalesDashboard />} />}
      {role === 'finance' && <Route path="/dashboard" element={<FinanceDashboard />} />}
     
      {/* {role === 'engineering' && (
        <>
          <Route path="/dashboard" element={<EngineeringDashboard />} />
          <Route path="/engineering/allocation" element={<EngineeringDashboard view="allocation" />} />
          <Route path="/engineering/team" element={<EngineeringDashboard view="team" />} />
        </>
      )} */}

       {role === 'finance' && (
        <>
          {/* Shows static graphs */}
          <Route path="/dashboard" element={<FinanceDashboard />} />
          {/* Shows invoices (same component handles conditional rendering) */}
          <Route path="/invoices" element={<FinanceDashboard />} />
        </>
      )}
      {role === "engineering" && (
  <>
    <Route path="/dashboard" element={<EngineeringDashboard />} />
    <Route path="/allocation" element={<ProjectAllocation />} />
    <Route path="/team" element={<TeamMembers />} />
  </>
)}
 
      {role === 'hr' && <Route path="/dashboard" element={<HRDashboard />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
 
export default AppRoutes;