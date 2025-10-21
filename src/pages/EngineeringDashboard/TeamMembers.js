// src/pages/EngineeringDashboard/TeamDashboard.js
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { ChevronRight, ChevronDown } from "lucide-react";

const TeamDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [projectAssignments, setProjectAssignments] = useState({});

  // Fetch Clients, Projects, Employees initially
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [projectRes, clientRes, employeeRes] = await Promise.all([
          fetch("https://localhost:7243/api/EngineeringManager/projects"),
          fetch("https://localhost:7243/api/Client"),
          fetch("https://localhost:7243/api/EngineeringManager/employees"),
        ]);
        const [projectsData, clientsData, employeesData] = await Promise.all([
          projectRes.json(),
          clientRes.json(),
          employeeRes.json(),
        ]);

        const formattedProjects = projectsData.map((p) => ({
          projectId: p.projectId,
          projectName: p.projectName,
          clientId: p.clientId,
          projectDescription: p.description || "No description available",
        }));

        setProjects(formattedProjects);
        setClients(clientsData);
        setEmployees(employeesData);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch assignments per project
  useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        const assignmentMap = {};
        for (const project of projects) {
          const res = await fetch(
            `https://localhost:7243/api/EngineeringManager/projects/${project.projectId}/assignments`
          );
          if (res.ok) {
            const data = await res.json();
            assignmentMap[project.projectId] = data;
          } else {
            assignmentMap[project.projectId] = [];
          }
        }
        setProjectAssignments(assignmentMap);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    if (projects.length > 0) {
      fetchAllAssignments();
    }
  }, [projects]);

  const toggleExpand = (projectId) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Build project tree with assigned employees
  const projectTree = projects.map((project) => {
    const client =
      clients.find((c) => Number(c.clientId) === Number(project.clientId)) ||
      {};
    const assignments = projectAssignments[project.projectId] || [];

    const assignedEmployees = assignments.map((a) => {
      const emp =
        employees.find(
          (e) => Number(e.employeeId) === Number(a.employeeId)
        ) || {};
      return {
        id: a.assignmentId || `${project.projectId}-${a.employeeId}`,
        name:
          emp.firstName && emp.lastName
            ? `${emp.firstName} ${emp.lastName}`
            : "Unknown Employee",
        role: a.roleName || a.role?.roleName || "Unknown Role",
        allocationPercent: a.allocationPercent || 0,
        clientName: client.clientName || "Unknown Client",
      };
    });

    return {
      ...project,
      assignedEmployees,
    };
  });

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1, marginLeft: "0px" }}>
        <Navbar />
        <div
          style={{
            padding: "28px",
            minHeight: "calc(100vh - 70px)",
            background: "#F5F5F5",
          }}
        >
          <h2 style={{ color: "#673AB7", marginBottom: 16 }}>Team Dashboard</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {projectTree.length === 0 ? (
              <div style={emptyCard}>No projects found</div>
            ) : (
              projectTree.map((project) => {
                const isExpanded = expandedProjects.includes(project.projectId);
                return (
                  <div
                    key={project.projectId}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                      padding: 18,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleExpand(project.projectId)}
                    >
                      {isExpanded ? (
                        <ChevronDown size={18} color="#673AB7" />
                      ) : (
                        <ChevronRight size={18} color="#673AB7" />
                      )}
                      <h3 style={{ margin: "0 0 0 8px", color: "#4A148C" }}>
                        {project.projectName}
                      </h3>
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: 12, marginLeft: 10 }}>
                        <p style={{ color: "#444" }}>
                          {project.projectDescription}
                        </p>

                        {project.assignedEmployees.length === 0 ? (
                          <div style={{ color: "#777" }}>No employees assigned</div>
                        ) : (
                          project.assignedEmployees.map((a) => (
                            <div
                              key={a.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "#FAF7FF",
                                padding: "8px 10px",
                                borderRadius: 8,
                                marginBottom: 8,
                              }}
                            >
                              <div>
                                <div style={{ fontWeight: 600 }}>{a.name}</div>
                                <div style={{ fontSize: 12, color: "#555" }}>
                                  Client: {a.clientName} | Role: {a.role}
                                </div>
                              </div>
                              <div style={{ fontWeight: 700, color: "#673AB7" }}>
                                {a.allocationPercent}%
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;

// ---------------- Styles ----------------
const emptyCard = {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  color: "#777",
};
