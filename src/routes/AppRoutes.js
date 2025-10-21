import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SalesDashboard from "../pages/SalesDashboard/SalesDashboard";
import FinanceDashboard from "../pages/FinanceDashboard/FinanceDashboard";
import EngineeringDashboard from "../pages/EngineeringDashboard/EngineeringDashboard";
import ProjectAllocation from "../pages/EngineeringDashboard/projectAllocation";
import TeamMembers from "../pages/EngineeringDashboard/TeamMembers";
import HRDashboard from "../pages/HRDashboard/HRDashboard";
import Home from "../pages/Home/Home";
 
const AppRoutes = ({ role, setRole }) => {
  return (
    <Routes>
      {/* Public / landing page */}
      <Route path="/" element={<Home setRole={setRole} />} />
 
      {/* Sales */}
      {role === "sales" && (
        <>
          <Route path="/dashboard" element={<SalesDashboard />} />
          <Route path="/add-project" element={<SalesDashboard view="addProject" />} />
          <Route path="/add-client" element={<SalesDashboard view="addClient" />} />
        </>
      )}
 
      {/* Finance */}
      {role === "finance" && (
        <>
          <Route path="/dashboard" element={<FinanceDashboard />} />
          <Route path="/invoices" element={<FinanceDashboard />} />
          <Route path="/payments" element={<FinanceDashboard />} />
        </>
      )}
 
      {/* Engineering */}
      {role === "engineering" && (
        <>
          <Route path="/dashboard" element={<EngineeringDashboard />} />
          <Route path="/allocation" element={<ProjectAllocation />} />
          <Route path="/team" element={<TeamMembers />} />
        </>
      )}
 
      {/* HR */}
      {role === "hr" && (
        <>
          <Route path="/dashboard" element={<HRDashboard />} />
          <Route path="/leaves" element={<HRDashboard />} />          {/* Opens LeaveApplicationForm */}
          <Route path="/add-employee" element={<HRDashboard />} />   {/* Opens AddEmployeeForm */}
        </>
      )}
 
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
 
export default AppRoutes;