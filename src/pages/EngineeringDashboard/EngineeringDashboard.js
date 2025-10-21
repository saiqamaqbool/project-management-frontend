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
        // Fetch all projects
        const projectRes = await axios.get("https://localhost:7243/api/EngineeringManager/projects");
        setProjects(projectRes.data);

        // Fetch all clients
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

  // Combine projects with client names
  const projectsWithClientNames = projects.map((p) => {
    const client = clients.find((c) => Number(c.clientId) === Number(p.clientId));
    return {
      ...p,
      clientName: client ? client.clientName : "Unknown Client",
    };
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
            ) : projectsWithClientNames.length === 0 ? (
              <div style={emptyCard}>No projects found</div>
            ) : (
              projectsWithClientNames.map((project) => (
                <div key={project.projectId} style={cardStyle}>
                  <div style={{ marginBottom: 8 }}>
                    <h3 style={{ margin: 0, color: "#4A148C" }}>{project.projectName}</h3>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Description: {project.projectDescription || "No description"}
                    </div>
                    <div style={{ fontSize: 12, color: "#444", marginTop: 4 }}>
                      Client: <strong>{project.clientName}</strong>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: "#673AB7" }}>
                      {project.status || "Not Available"}
                    </span>
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

const emptyCard = {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  color: "#777",
};
