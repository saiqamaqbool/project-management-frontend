// src/pages/EngineeringDashboard/EngineeringDashboard.js
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import axios from "axios";
import { X } from "lucide-react";

const EngineeringDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projectAssignments, setProjectAssignments] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ New state for search

  // ✅ Fetch projects, clients, and employees
  useEffect(() => {
    const fetchProjectsAndClients = async () => {
      try {
        const [projectRes, clientRes, employeeRes] = await Promise.all([
          axios.get("https://localhost:7243/api/EngineeringManager/projects"),
          axios.get("https://localhost:7243/api/Client"),
          axios.get("https://localhost:7243/api/EngineeringManager/employees"),
        ]);

        const projectData = projectRes.data.map((p) => ({
          ...p,
          projectDescription:
            p.projectDescription || p.description || "No description available",
        }));

        setProjects(projectData);
        setClients(clientRes.data);
        setEmployees(employeeRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndClients();
  }, []);

  // ✅ Fetch employee assignments for each project
  useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        const assignmentMap = {};
        for (const project of projects) {
          const res = await axios.get(
            `https://localhost:7243/api/EngineeringManager/projects/${project.projectId}/assignments`
          );
          assignmentMap[project.projectId] = res.data;
        }
        setProjectAssignments(assignmentMap);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    if (projects.length > 0) fetchAllAssignments();
  }, [projects]);

  // ✅ Combine project and client details
  const projectsWithClientNames = projects.map((p) => {
    const client = clients.find((c) => Number(c.clientId) === Number(p.clientId));
    return {
      ...p,
      clientName: client ? client.clientName : "Unknown Client",
    };
  });

  // ✅ Filter projects by search term
  const filteredProjects = projectsWithClientNames.filter((p) =>
    p.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Build assigned employee list
  const getAssignedEmployees = (projectId) => {
    const assignments = projectAssignments[projectId] || [];
    return assignments.map((a) => {
      const emp =
        employees.find((e) => Number(e.employeeId) === Number(a.employeeId)) || {};
      return {
        id: a.assignmentId || `${projectId}-${a.employeeId}`,
        name:
          emp.firstName && emp.lastName
            ? `${emp.firstName} ${emp.lastName}`
            : "Unknown Employee",
        role: a.roleName || a.role?.roleName || "Unknown Role",
      };
    });
  };

  const handleCardClick = (project) => {
    const assignedEmployees = getAssignedEmployees(project.projectId);
    setSelectedProject({ ...project, assignedEmployees });
  };

  const closePopup = () => setSelectedProject(null);

  return (
    <div style={{ display: "flex", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div
          style={{
            padding: "32px",
            minHeight: "calc(100vh - 70px)",
            background: "#F3F4F6",
          }}
        >
          {/* ✅ Header with search bar on right */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                color: "#4A148C",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.3px",
                margin: 0,
              }}
            >
              Engineering Dashboard
            </h2>

            <input
              type="text"
              placeholder="Search by project name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
                width: "240px",
                outline: "none",
              }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
          ) : filteredProjects.length === 0 ? (
            <div style={emptyCard}>No projects found</div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.projectId}
                  style={{
                    ...cardStyle,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(project)}
                >
                  <h3
                    style={{
                      margin: "0 0 6px 8px",
                      color: "#2C2C2C",
                      fontSize: "20px",
                      fontWeight: 600,
                    }}
                  >
                    {project.projectName}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: "8px 0 0 8px",
                      lineHeight: "1.5",
                    }}
                  >
                    {project.projectDescription}
                  </p>
                  <div style={{ marginTop: "12px", marginLeft: "8px" }}>
                    <div style={infoRow}>
                      <span style={infoLabel}>Client:</span>
                      <span style={infoValue}>{project.clientName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Popup Modal */}
      {selectedProject && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ color: "#4A148C", margin: 0 }}>
                {selectedProject.projectName}
              </h2>
              <X onClick={closePopup} size={22} style={{ cursor: "pointer", color: "#444" }} />
            </div>
            <p style={{ marginTop: "10px", color: "#555" }}>
              {selectedProject.projectDescription}
            </p>
            <div style={{ marginTop: "10px" }}>
              <strong>Client:</strong> {selectedProject.clientName}
            </div>

            <h3 style={{ marginTop: "16px", color: "#333" }}>Assigned Employees</h3>
            {selectedProject.assignedEmployees.length === 0 ? (
              <p style={{ color: "#777", fontSize: "14px" }}>No employees assigned</p>
            ) : (
              <ul style={{ paddingLeft: "18px", marginTop: "8px" }}>
                {selectedProject.assignedEmployees.map((emp) => (
                  <li key={emp.id} style={{ marginBottom: "6px" }}>
                    <strong>{emp.name}</strong> — {emp.role}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringDashboard;

// ---------------- Styles ----------------
const cardStyle = {
  background: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
  padding: "20px 22px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
};

const infoLabel = {
  color: "#555",
  fontWeight: 500,
};

const infoValue = {
  color: "#333",
  fontWeight: 600,
};

const emptyCard = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  color: "#777",
  textAlign: "center",
  fontSize: "16px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const popupStyle = {
  background: "#fff",
  borderRadius: "12px",
  padding: "24px",
  width: "480px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  animation: "fadeIn 0.3s ease",
};
