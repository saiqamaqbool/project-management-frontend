import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import AddClientForm from "../../components/Layout/Forms/AddClientForm";
import AddProjectForm from "../../components/Layout/Forms/AddProjectForm";
import { fetchClients, addClient } from "../../features/clients/clientsSlice";
import {
  fetchProjectsByClient,
  addProject,
  addProjectLocal,
  clearProjects,
} from "../../features/projects/projectsSlice";

const SalesDashboard = () => {
  const dispatch = useDispatch();
  const { clients, loading: clientsLoading } = useSelector(
    (state) => state.clients
  );
  const { projects, loading: projectsLoading } = useSelector(
    (state) => state.projects
  );

  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(clearProjects());
  }, [dispatch]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    dispatch(fetchProjectsByClient(client.clientId));
  };

  const handleAddClient = async (clientData) => {
    try {
      const action = await dispatch(addClient(clientData));
      const newClient = action.payload;

      // ✅ After adding client, show all clients again
      setShowAddClientForm(false);
      setSelectedClient(null);
      dispatch(fetchClients());
    } catch (err) {
      console.error("Error adding client:", err);
    }
  };

  const handleAddProject = async (projectData) => {
    if (!selectedClient) return;

    try {
      const action = await dispatch(
        addProject({ clientId: selectedClient.clientId, project: projectData })
      );
      const newProject = action.payload;

      if (newProject) {
        dispatch(addProjectLocal(newProject));
      }

      // ✅ After adding project, hide form and reload all projects
      setShowAddProjectForm(false);
      await dispatch(fetchProjectsByClient(selectedClient.clientId));
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  const handleBackToClients = () => {
    setSelectedClient(null);
    setShowAddProjectForm(false);
    setShowAddClientForm(false);
    dispatch(clearProjects());
    setSearchTerm("");
  };

  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        role="sales"
        onAddClient={() => {
          setSelectedClient(null);
          setShowAddProjectForm(false);
          setShowAddClientForm(true); // ✅ open standalone AddClient view
        }}
        onAddProject={() => selectedClient && setShowAddProjectForm(true)}
      />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div
          style={{
            padding: "20px",
            background: "#F5F5F5",
            minHeight: "90vh",
          }}
        >
          {/* ✅ If AddClientForm is open, show ONLY that form */}
          {showAddClientForm ? (
            <div>
              <button
                onClick={handleBackToClients}
                style={{
                  marginBottom: "15px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "#ccc",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ← Back to Clients
              </button>

              <AddClientForm
                onSubmit={handleAddClient}
                closeForm={() => setShowAddClientForm(false)}
              />
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ color: "#673AB7" }}>Sales Dashboard</h2>
                {!selectedClient && (
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      minWidth: "200px",
                    }}
                  />
                )}
              </div>

              {!selectedClient && (
                <>
                  <h3 style={{ color: "#4CAF50" }}>Clients</h3>
                  {clientsLoading ? (
                    <p>Loading clients...</p>
                  ) : filteredClients.length === 0 ? (
                    <p>No clients found.</p>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "15px",
                      }}
                    >
                      {filteredClients.map((client) => (
                        <div
                          key={client.clientId}
                          onClick={() => handleClientClick(client)}
                          style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "250px",
                            cursor: "pointer",
                          }}
                        >
                          <p>
                            <strong>Name:</strong> {client.clientName}
                          </p>
                          <p>
                            <strong>Email:</strong> {client.clientEmail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {selectedClient && (
                <>
                  <button
                    onClick={handleBackToClients}
                    style={{
                      marginBottom: "15px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "#ccc",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ← Back to Clients
                  </button>

                  <div
                    style={{
                      background: "#E3F2FD",
                      padding: "20px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <p>
                      <strong>Name:</strong> {selectedClient.clientName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedClient.clientEmail}
                    </p>
                  </div>

                  {showAddProjectForm ? (
                    <AddProjectForm
                      onSubmit={handleAddProject}
                      closeForm={() => setShowAddProjectForm(false)}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => setShowAddProjectForm(true)}
                        style={{
                          marginBottom: "20px",
                          padding: "10px 15px",
                          borderRadius: "8px",
                          border: "none",
                          background: "#FF9800",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        + Add Project
                      </button>

                      <h3 style={{ color: "#FF9800" }}>Projects</h3>

                      {projectsLoading ? (
                        <p>Loading projects...</p>
                      ) : projects.length === 0 ? (
                        <p>No projects found for this client.</p>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "15px",
                          }}
                        >
                          {projects.map((project) => (
                            <div
                              key={project.projectId}
                              style={{
                                background: "#fff",
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                width: "300px",
                              }}
                            >
                              <p>
                                <strong>Name:</strong> {project.projectName}
                              </p>
                              <p>
                                <strong>Description:</strong>{" "}
                                {project.description}
                              </p>
                              <p>
                                <strong>Start:</strong>{" "}
                                {project.startDate?.split("T")[0]}
                              </p>
                              <p>
                                <strong>End:</strong>{" "}
                                {project.endDate?.split("T")[0]}
                              </p>
                              <p>
                                <strong>Daily Rate:</strong>{" "}
                                {project.dailyRate ? project.dailyRate : "N/A"}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
