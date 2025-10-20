import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchClients } from "../../features/clients/clientsSlice";
import { fetchProjectsByClient } from "../../features/projects/projectsSlice";
import { fetchEmployees, assignEmployee, fetchAllocations } from "../../features/allocation/allocationsSlice";

const ProjectAllocation = () => {
  const dispatch = useDispatch();

  // -------------------------
  // Redux state
  // -------------------------
  const { clients = [] } = useSelector((state) => state.clients);
  const { projects = [], loading: projectsLoading } = useSelector((state) => state.projects);
  const { employees = [], allocations = [] } = useSelector((state) => state.allocations);

  // -------------------------
  // Local state
  // -------------------------
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [allocationPercent, setAllocationPercent] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // role name

  // -------------------------
  // Initial data fetch
  // -------------------------
  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchEmployees());
    dispatch(fetchAllocations());
  }, [dispatch]);

  // -------------------------
  // Handle client selection
  // -------------------------
  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClientId(clientId);
    setSelectedProjectId(""); // reset project selection

    if (clientId) {
      dispatch(fetchProjectsByClient(clientId));
    }
  };

  // -------------------------
  // Handle allocation submit
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClientId || !selectedProjectId || !selectedEmployeeId || !allocationPercent || !selectedRole) return;

    const payload = {
      clientId: selectedClientId,
      projectId: selectedProjectId,
      employeeId: selectedEmployeeId,
      roleName: selectedRole, // use roleName instead of roleId
      allocationPercent: Number(allocationPercent),
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // example 1 month
      billable: true,
    };

    await dispatch(assignEmployee(payload));

    // Reset form
    setSelectedClientId("");
    setSelectedProjectId("");
    setSelectedEmployeeId("");
    setAllocationPercent("");
    setSelectedRole("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px", minHeight: "90vh", background: "#F5F5F5" }}>
          <h2 style={{ color: "#673AB7" }}>Project Allocation</h2>

          {/* Allocation Form */}
          <div style={formCard}>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              {/* Client Dropdown */}
              <select value={selectedClientId} onChange={handleClientChange} style={selectStyle} required>
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c.clientId} value={c.clientId}>
                    {c.clientName}
                  </option>
                ))}
              </select>

              {/* Project Dropdown */}
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                style={selectStyle}
                required
                disabled={!selectedClientId || projectsLoading}
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p.projectId} value={p.projectId}>
                    {p.projectName}
                  </option>
                ))}
              </select>

              {/* Employee Dropdown */}
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                style={selectStyle}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.employeeId} value={emp.employeeId}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>

              {/* Role Input */}
              <input
                type="text"
                placeholder="Role Name"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={inputStyle}
                required
              />

              {/* Allocation Percent */}
              <input
                type="number"
                placeholder="% Allocation"
                value={allocationPercent}
                onChange={(e) => setAllocationPercent(e.target.value)}
                style={inputStyle}
                required
              />

              <button type="submit" style={submitBtn}>
                Assign
              </button>
            </form>
          </div>

          {/* Allocations Table */}
          <div style={{ marginTop: 30 }}>
            <h3>Existing Allocations</h3>
            {allocations.length === 0 ? (
              <p>No allocations found</p>
            ) : (
              allocations.map((a) => {
                const project = projects.find((p) => p.projectId === a.projectId) || {};
                const client = clients.find((c) => c.clientId === a.clientId) || {};
                const employee = employees.find((e) => e.employeeId === a.employeeId) || {};

                return (
                  <div key={a.assignmentId} style={allocationCard}>
                    <p>
                      <strong>Client:</strong> {client.clientName || "Unknown"}
                    </p>
                    <p>
                      <strong>Project:</strong> {project.projectName || "Unknown"}
                    </p>
                    <p>
                      <strong>Employee:</strong> {employee.firstName} {employee.lastName}
                    </p>
                    <p>
                      <strong>Role:</strong> {a.role?.roleName || "Unknown"}
                    </p>
                    <p>
                      <strong>Allocation %:</strong> {a.allocationPercent}%
                    </p>
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

export default ProjectAllocation;

/* Styles */
const formCard = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
};
const selectStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  minWidth: 180,
};
const inputStyle = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  minWidth: 140,
};
const submitBtn = {
  background: "#673AB7",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
};
const allocationCard = {
  background: "#fff",
  padding: 12,
  borderRadius: 8,
  marginBottom: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};
