
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";

import { fetchProjects, addProject } from "../../features/projects/projectsSlice";
import { fetchClients, addClient } from "../../features/clients/clientsSlice";

import AddProjectForm from "../../components/Layout/Forms/AddProjectForm";
import AddClientForm from "../../components/Layout/Forms/AddClientForm";

const SalesDashboard = () => {
  const dispatch = useDispatch();
  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { clients, loading: clientsLoading } = useSelector((state) => state.clients);

  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showAddClientForm, setShowAddClientForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  // ✅ Function to handle adding a new project
  const handleAddProject = async (projectData) => {
    await dispatch(addProject(projectData));
    dispatch(fetchProjects()); // Refresh list
  };

  // ✅ Function to handle adding a new client
  const handleAddClient = async (clientData) => {
    await dispatch(addClient(clientData));
    dispatch(fetchClients()); // Refresh list
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        role="sales"
        onAddProject={() => setShowAddProjectForm(true)}
        onAddClient={() => setShowAddClientForm(true)}
      />

      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px", background: "#F5F5F5", minHeight: "90vh" }}>
          <h2 style={{ color: "#673AB7", marginBottom: "20px" }}>Sales Dashboard</h2>

          {/* ✅ Add Project Form */}
          {showAddProjectForm && (
            <AddProjectForm
              onSubmit={handleAddProject}
              closeForm={() => setShowAddProjectForm(false)}
            />
          )}

          {/* ✅ Add Client Form */}
          {showAddClientForm && (
            <AddClientForm
              onSubmit={handleAddClient}
              closeForm={() => setShowAddClientForm(false)}
            />
          )}

          {/* Clients Section */}
          <h3 style={{ color: "#4CAF50", marginTop: "30px" }}>Clients</h3>
          {clientsLoading ? (
            <p>Loading clients...</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {clients.length === 0 ? (
                <p>No clients found.</p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    style={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      width: "250px",
                    }}
                  >
                    <p><strong>ID:</strong> {client.clientId}</p>
                    <p><strong>Name:</strong> {client.clientName}</p>
                    <p><strong>Email:</strong> {client.clientEmail}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Projects Section */}
          <h3 style={{ color: "#FF9800", marginTop: "30px" }}>Projects</h3>
          {projectsLoading ? (
            <p>Loading projects...</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {projects.length === 0 ? (
                <p>No projects found.</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      width: "300px",
                    }}
                  >
                    <p><strong>ID:</strong> {project.projectId}</p>
                    <p><strong>Name:</strong> {project.projectName}</p>
                    <p><strong>Description:</strong> {project.projectDescription}</p>
                    <p><strong>Start:</strong> {project.startDate}</p>
                    <p><strong>End:</strong> {project.endDate}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
