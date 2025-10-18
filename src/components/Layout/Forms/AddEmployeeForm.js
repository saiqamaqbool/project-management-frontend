
import React, { useState } from "react";

const AddEmployeeForm = ({ closeForm, onSubmit }) => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    employeeName: "",
    role: "",
    email: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Call the onSubmit prop from HRDashboard
      await onSubmit(employee);

      // Reset form fields
      setEmployee({
        employeeId: "",
        employeeName: "",
        role: "",
        email: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        minWidth: "350px",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#6A0DAD" }}>Add Employee</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Employee ID</label>
        <input
          type="text"
          name="employeeId"
          value={employee.employeeId}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Employee Name</label>
        <input
          type="text"
          name="employeeName"
          value={employee.employeeName}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Role</label>
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">Select Role</option>
          <option value="QA">QA</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Fullstack Developer">Fullstack Developer</option>
          <option value="Data Scientist">Data Scientist</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="submit"
          style={{ background: "#6A0DAD", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer" }}
        >
          Add Employee
        </button>
        <button
          type="button"
          onClick={closeForm}
          style={{ background: "#ccc", color: "#333", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
