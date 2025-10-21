import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  clearEmployeeStatus,
  fetchEmployees,
} from "../../../features/employees/employeesSlice";
import { toast } from "react-toastify";

const AddEmployeeForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const { loading, error, newEmployee } = useSelector(
    (state) => state.employees
  );

  const [formData, setFormData] = useState({
    employeeId: 0, // Still included for backend, just not shown
    firstName: "",
    lastName: "",
    selectedRole: "", // No default, to force role selection
    email: "",
  });

  // ------------------------------------
  // Success/Error Handling
  // ------------------------------------
  useEffect(() => {
    if (newEmployee) {
      toast.success(`Employee ${newEmployee.employeeId} added successfully!`);
      dispatch(clearEmployeeStatus());

      // Refresh the employee list after adding
      dispatch(fetchEmployees());
      closeForm();
    }

    if (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error.message || "Failed to add employee.";
      toast.error(`Error: ${errorMessage}`);
      dispatch(clearEmployeeStatus());
    }
  }, [newEmployee, error, dispatch, closeForm]);

  // ------------------------------------
  // Handlers
  // ------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeePayload = {
      employeeId: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      roles: [{ roleName: formData.selectedRole }],
      leavesTaken: 0,
      leavesPending: 0,
    };

    dispatch(addEmployee(employeePayload));
  };

  // ------------------------------------
  // Styling
  // ------------------------------------
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    boxSizing: "border-box",
  };
  const formContainerStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
    maxWidth: "500px",
    margin: "20px auto",
  };
  const buttonStyle = (isLoading, isCancel = false) => ({
    background: isCancel ? "#ccc" : isLoading ? "#9B70BD" : "#6A0DAD",
    color: isCancel ? "#333" : "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: isLoading ? "not-allowed" : "pointer",
    marginLeft: isCancel ? "10px" : "0",
  });

  // ------------------------------------
  // Render
  // ------------------------------------
  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h2 style={{ color: "#6A0DAD", marginBottom: "20px" }}>
        Add New Employee (HR)
      </h2>

      {/* ✅ Employee ID is now hidden, but still part of formData */}
      <input type="hidden" name="employeeId" value={formData.employeeId} />

      {/* First Name */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="Enter employee's first name"
          style={inputStyle}
        />
      </div>

      {/* Last Name */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Enter employee's last name"
          style={inputStyle}
        />
      </div>

      {/* Role */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Role</label>
        <select
          name="selectedRole"
          value={formData.selectedRole}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="QA">QA</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
          <option value="Agile Lead">Agile Lead</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Business Analyst">Business Analyst</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="Data Engineer">Data Engineer</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Finance Executive">Finance Executive</option>
          <option value="Sales Executive">Sales Executive</option>
        </select>
      </div>

      {/* Email */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter employee's email address"
          style={inputStyle}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" disabled={loading} style={buttonStyle(loading)}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
        <button
          type="button"
          onClick={closeForm}
          style={buttonStyle(loading, true)}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
