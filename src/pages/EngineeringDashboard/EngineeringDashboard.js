// src/pages/EngineeringDashboard/EngineeringDashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchProjects } from "../../features/projects/projectsSlice";
import { fetchClients } from "../../features/clients/clientsSlice";
import { fetchAllocations } from "../../features/allocation/allocationsSlice"; // Updated path

const EngineeringDashboard = () => {
  const dispatch = useDispatch();

  // Redux state
  const { projects } = useSelector((state) => state.projects || {});
  const { clients } = useSelector((state) => state.clients || {});
  const { allocations, loading } = useSelector((state) => state.allocations || {});

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
    dispatch(fetchAllocations());
  }, [dispatch]);

  // Prepare project cards with assignments
  const projectCards = projects.map((project) => {
    // Find allocations for this project
    const assigned = allocations
      .filter((a) => a.projectId === project.projectId)
      .map((a) => {
        // Employee info is part of allocation object from backend
        const cli = clients.find((c) => c.clientId === a.clientId) || {};
        return {
          id: a.assignmentId,
          employeeName: a.employeeName || "Unknown",
          clientName: cli.clientName || "Unknown",
          roleName: a.role?.roleName || "Unknown",
          allocationPercent: a.allocationPercent,
        };
      });

    // Use client from first allocation (or fallback from project)
    const clientName =
      assigned.length > 0
        ? assigned[0].clientName
        : clients.find((c) => c.clientId === project.clientId)?.clientName || "Unknown";

    return { ...project, assignedEmployees: assigned, clientName };
  });

  return (
    <div style={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: 28, minHeight: "calc(100vh - 70px)", background: "#F5F5F5" }}>
          <h2 style={{ color: "#673AB7", marginBottom: 16 }}>Engineering Dashboard</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {loading ? (
              <div>Loading...</div>
            ) : projectCards.length === 0 ? (
              <div style={emptyCard}>No projects found</div>
            ) : (
              projectCards.map((project) => (
                <div key={project.projectId} style={cardStyle}>
                  <div style={{ marginBottom: 8 }}>
                    <h3 style={{ margin: 0, color: "#4A148C" }}>{project.projectName}</h3>
                    <div style={{ fontSize: 12, color: "#666" }}>Project ID: {project.projectId}</div>
                    <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>Client: {project.clientName}</div>
                  </div>

                  <p style={{ color: "#444", marginTop: 8 }}>
                    {project.projectDescription || "No description"}
                  </p>

                  <div style={{ marginTop: 12 }}>
                    <strong>Assigned Employees</strong>
                    {project.assignedEmployees.length === 0 ? (
                      <div style={{ color: "#777", marginTop: 8 }}>No employees assigned</div>
                    ) : (
                      project.assignedEmployees.map((a) => (
                        <div key={a.id} style={assignedCard}>
                          <div>
                            {a.employeeName}{" "}
                            <span style={roleTag}>{a.roleName}</span>
                          </div>
                          <div style={{ fontWeight: 700, color: "#673AB7" }}>{a.allocationPercent}%</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringDashboard;

// ---------------- Styles ----------------
const cardStyle = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  padding: 18,
  minHeight: 140,
};

const assignedCard = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 10px",
  background: "#FAF7FF",
  borderRadius: 8,
  marginBottom: 8,
};

const emptyCard = {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  color: "#777",
};

const roleTag = {
  background: "#EDE7F6",
  color: "#4A148C",
  padding: "2px 6px",
  borderRadius: 4,
  fontSize: 11,
  marginLeft: 6,
};
