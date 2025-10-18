import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchProjects } from "../../features/projects/projectsSlice";
import FinanceProjectTable from "../../components/Tables/FinanceProjectTable";

const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="finance" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div
          style={{
            padding: "20px",
            background: "#F5F5F5",
            minHeight: "90vh",
          }}
        >
          <h2 style={{ color: "#2196F3" }}>Finance Dashboard</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Track budgets, payments, and project expenses
          </p>

          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <FinanceProjectTable projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
