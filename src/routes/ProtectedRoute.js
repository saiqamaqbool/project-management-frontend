import React from "react";
import { Navigate } from "react-router-dom";
 
const ProtectedRoute = ({ allowedRole, children }) => {
  const role = localStorage.getItem("userRole");
  if (role?.toLowerCase() === allowedRole.toLowerCase()) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
 
export default ProtectedRoute;