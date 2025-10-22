// src/pages/EngineeringDashboard/EngineeringDashboard.js
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import axios from "axios";

const EngineeringDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsAndClients = async () => {
      try {
        // ✅ Fetch all projects
        const projectRes = await axios.get(
          "https://localhost:7243/api/EngineeringManager/projects"
        );

        // ✅ Ensure project description is mapped properly
        const projectData = projectRes.data.map((p) => ({
          ...p,
          projectDescription:
            p.projectDescription || p.description || "No description available",
        }));

        setProjects(projectData);

        // ✅ Fetch all clients
        const clientRes = await axios.get("https://localhost:7243/api/Client");
        setClients(clientRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsAndClients();
  }, []);

  // ✅ Combine projects with client names
  const projectsWithClientNames = projects.map((p) => {
    const client = clients.find((c) => Number(c.clientId) === Number(p.clientId));
    return {
      ...p,
      clientName: client ? client.clientName : "Unknown Client",
    };
  });

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
          <h2
            style={{
              color: "#4A148C",
              marginBottom: "24px",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.3px",
            }}
          >
            Engineering Dashboard
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
          ) : projectsWithClientNames.length === 0 ? (
            <div style={emptyCard}>No projects found</div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "24px",
              }}
            >
              {projectsWithClientNames.map((project) => (
                <div key={project.projectId} style={cardStyle}>
                  <div style={{ marginBottom: "12px" }}>
                    <h3
                      style={{
                        margin: "0 0 6px 0",
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
                        margin: 0,
                        lineHeight: "1.5",
                      }}
                    >
                      {project.projectDescription || "No description available"}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <div style={infoRow}>
                      <span style={infoLabel}>Client:</span>
                      <span style={infoValue}>{project.clientName}</span>
                    </div>
                    {/* <div style={infoRow}>
                      <span style={infoLabel}>Status:</span>
                      <span style={{ ...infoValue, color: "#6A0DAD" }}>
                        {project.status || "Not Available"}
                      </span>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
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
  cursor: "default",
};
cardStyle["&:hover"] = {
  transform: "translateY(-4px)",
  boxShadow: "0 10px 28px rgba(0, 0, 0, 0.08)",
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
