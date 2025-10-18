
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchEmployees, addEmployee, updateEmployeeLeave } from "../../features/employees/employeesSlice";
import { toast } from "react-toastify";
import AddEmployeeForm from "../../components/Layout/Forms/AddEmployeeForm";

const HRDashboard = () => {
  const dispatch = useDispatch();
  const { employees = [], loading } = useSelector((state) => state.employees);

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveTaken, setLeaveTaken] = useState("");
  const [leavePending, setLeavePending] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // ✅ Handle Leave Update
  const handleAdjustLeave = async () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee first!");
      return;
    }

    try {
      await dispatch(updateEmployeeLeave({
        id: selectedEmployee.id,
        leavesTaken: Number(leaveTaken),
        leavesPending: Number(leavePending),
      })).unwrap();

      toast.success("Leave balance updated!");

      // Reset state to close form
      setSelectedEmployee(null);
      setLeaveTaken("");
      setLeavePending("");
    } catch (error) {
      toast.error("Failed to update leave balance!");
    }
  };

  // ✅ Handle Add Employee
  const handleAddEmployee = async (employeeData) => {
    try {
      await dispatch(addEmployee(employeeData)).unwrap();
      toast.success("Employee added successfully!");
      setShowAddEmployee(false); // Close form after success
    } catch (error) {
      toast.error("Failed to add employee!");
    }
  };

  return (
    <div style={{ display: "flex", background: "#F5F5F5", minHeight: "100vh" }}>
      <Sidebar role="hr" onAddEmployee={() => setShowAddEmployee(true)} />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "20px" }}>
          {showAddEmployee ? (
            <AddEmployeeForm closeForm={() => setShowAddEmployee(false)} onSubmit={handleAddEmployee} />
          ) : (
            <>
              <h2 style={{ color: "#673AB7", marginBottom: "20px" }}>HR Dashboard</h2>

              {loading ? (
                <p>Loading employees...</p>
              ) : (
                <table style={{ width: "100%", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#EDE7F6", color: "#333" }}>
                    <tr>
                      <th style={thStyle}>Employee ID</th>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Role</th>
                      <th style={thStyle}>Email</th>
                      <th style={thStyle}>Leaves Taken</th>
                      <th style={thStyle}>Leaves Pending</th>
                      <th style={thStyle}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {employees.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      employees.map((emp) => (
                        <tr key={emp.id} style={{ textAlign: "center", background: selectedEmployee?.id === emp.id ? "#EDE7F6" : "white" }}>
                          <td style={tdStyle}>{emp.employeeId}</td>
                          <td style={tdStyle}>{emp.employeeName}</td>
                          <td style={tdStyle}>{emp.role}</td>
                          <td style={tdStyle}>{emp.email}</td>
                          <td style={tdStyle}>{emp.leavesTaken || 0}</td>
                          <td style={tdStyle}>{emp.leavesPending || 0}</td>
                          <td style={tdStyle}>
                            <button onClick={() => setSelectedEmployee(emp)} style={editBtn}>
                              Adjust Leave
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {selectedEmployee && (
                <div style={{ marginTop: "30px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "60%" }}>
                  <h3 style={{ color: "#673AB7" }}>Adjust Leave for {selectedEmployee.employeeName}</h3>

                  <div style={{ margin: "10px 0" }}>
                    <label>Leaves Taken This Month:</label>
                    <input type="number" value={leaveTaken} onChange={(e) => setLeaveTaken(e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ margin: "10px 0" }}>
                    <label>Leaves Pending:</label>
                    <input type="number" value={leavePending} onChange={(e) => setLeavePending(e.target.value)} style={inputStyle} />
                  </div>

                  <button onClick={handleAdjustLeave} style={saveBtn}>Save Changes</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;

// 🎨 Styles
const thStyle = { padding: "12px 15px", textAlign: "center", borderBottom: "1px solid #ddd" };
const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #f0f0f0" };
const editBtn = { background: "#FF9800", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" };
const saveBtn = { background: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", marginTop: "10px", cursor: "pointer" };
const inputStyle = { width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" };
