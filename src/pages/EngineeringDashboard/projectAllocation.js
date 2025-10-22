import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchClients } from "../../features/clients/clientsSlice";
import { fetchProjectsByClient } from "../../features/projects/projectsSlice";
import {
  fetchEmployees,
  assignEmployee,
  fetchAllocations,
} from "../../features/allocation/allocationsSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectAllocation = () => {
  const dispatch = useDispatch();

  const { clients = [] } = useSelector((state) => state.clients);
  const { projects = [], loading: projectsLoading } = useSelector(
    (state) => state.projects
  );
  const { employees = [], allocations = [] } = useSelector(
    (state) => state.allocations
  );

  const [roles, setRoles] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [allocationPercent, setAllocationPercent] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [clientCache, setClientCache] = useState({});

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchEmployees());
    dispatch(fetchAllocations());

    fetch("https://localhost:7243/api/EngineeringManager/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClientId(clientId);
    setSelectedProjectId("");
    if (clientId) dispatch(fetchProjectsByClient(clientId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedClientId ||
      !selectedProjectId ||
      !selectedEmployeeId ||
      !allocationPercent ||
      !selectedRole
    )
      return;

    const payload = {
      clientId: selectedClientId,
      projectId: selectedProjectId,
      employeeId: selectedEmployeeId,
      roleName: selectedRole,
      allocationPercent: Number(allocationPercent),
      startDate: new Date().toISOString(),
      endDate: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).toISOString(),
      billable: true,
    };

    try {
      const result = await dispatch(assignEmployee(payload)).unwrap();
      toast.success("Employee assigned successfully!");
    } catch (err) {
      // ✅ Show backend message (e.g., when total allocation exceeds 100%)
      const errorMessage =
        err?.message ||
        err?.response?.data?.message ||
        "Employee exceeds his 100% allocation";
      toast.error(errorMessage);
    }

    // ✅ Refresh allocations and related data
    await dispatch(fetchAllocations());
    await dispatch(fetchClients());
    await dispatch(fetchProjectsByClient(selectedClientId));
    await dispatch(fetchEmployees());

    // Reset form
    setSelectedClientId("");
    setSelectedProjectId("");
    setSelectedEmployeeId("");
    setAllocationPercent("");
    setSelectedRole("");
  };

  // ✅ Helper to fetch client name from backend if not in Redux
  const fetchClientNameIfMissing = async (clientId) => {
    if (!clientId || clientCache[clientId]) return;
    try {
      const res = await fetch(
        `https://localhost:7243/api/SalesManager/clients/${clientId}`
      );
      if (!res.ok) return;
      const clientData = await res.json();
      setClientCache((prev) => ({
        ...prev,
        [clientId]: clientData.clientName,
      }));
    } catch (err) {
      console.error("Error fetching client:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />

        <div
          style={{
            padding: "20px",
            minHeight: "90vh",
            background: "#F5F5F5",
          }}
        >
          <h2 style={{ color: "#673AB7" }}>Project Allocation</h2>

          {/* Allocation Form */}
          <div style={formCard}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <select
                value={selectedClientId}
                onChange={handleClientChange}
                style={selectStyle}
                required
              >
                <option value="">Select Client</option>
                {clients.map((c) => (
                  <option key={c.clientId} value={c.clientId}>
                    {c.clientName}
                  </option>
                ))}
              </select>

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

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={inputStyle}
                required
              >
                <option value="">Select Role</option>
                {Array.from(new Set(roles.map((r) => r.roleName))).map(
                  (roleName) => (
                    <option key={roleName} value={roleName}>
                      {roleName}
                    </option>
                  )
                )}
              </select>

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

          {/* Allocations List */}
          <div style={{ marginTop: 30 }}>
            <h3>Current Allocations</h3>
            {allocations.length === 0 ? (
              <p>No allocations found</p>
            ) : (
              allocations.map((a) => {
                const project =
                  projects.find(
                    (p) => Number(p.projectId) === Number(a.projectId)
                  ) || {};
                let client =
                  clients.find(
                    (c) => Number(c.clientId) === Number(a.clientId)
                  ) || {};

                if (!client.clientName) {
                  fetchClientNameIfMissing(a.clientId);
                }

                const clientName =
                  client.clientName || clientCache[a.clientId] || "Unknown Client";

                const employee =
                  employees.find(
                    (e) => Number(e.employeeId) === Number(a.employeeId)
                  ) || {};

                return (
                  <div
                    key={a.assignmentId || `${a.projectId}-${a.employeeId}`}
                    style={allocationCard}
                  >
                    {/* <p>
                      <strong>Client:</strong> {clientName}
                    </p> */}
                    <p>
                      <strong>Project:</strong>{" "}
                      {project.projectName || "Unknown Project"}
                    </p>
                    <p>
                      <strong>Employee:</strong> {employee.firstName}{" "}
                      {employee.lastName}
                    </p>
                    <p>
                      <strong>Role:</strong>{" "}
                      {a.roleName || a.role?.roleName || "Unknown"}
                    </p>
                    <p>
                      <strong>Allocation:</strong> {a.allocationPercent}%
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

// ---------------- Styles ----------------
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
