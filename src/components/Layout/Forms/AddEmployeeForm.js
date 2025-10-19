// import React, { useState } from "react";
 
// const AddEmployeeForm = ({ closeForm, onSubmit }) => {
//   const [employee, setEmployee] = useState({
//     employeeId: "",
//     employeeName: "",
//     role: "",
//     email: "",
//   });
 
//   const handleChange = (e) => {
//     setEmployee({ ...employee, [e.target.name]: e.target.value });
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // ✅ Call the onSubmit prop from HRDashboard
//       await onSubmit(employee);
 
//       // Reset form fields
//       setEmployee({
//         employeeId: "",
//         employeeName: "",
//         role: "",
//         email: "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
 
//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         background: "#fff",
//         padding: "30px",
//         borderRadius: "15px",
//         boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
//         minWidth: "350px",
//       }}
//     >
//       <h2 style={{ marginBottom: "20px", color: "#6A0DAD" }}>Add Employee</h2>
 
//       <div style={{ marginBottom: "15px" }}>
//         <label>Employee ID</label>
//         <input
//           type="text"
//           name="employeeId"
//           value={employee.employeeId}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//       </div>
 
//       <div style={{ marginBottom: "15px" }}>
//         <label>Employee Name</label>
//         <input
//           type="text"
//           name="employeeName"
//           value={employee.employeeName}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//       </div>
 
//       <div style={{ marginBottom: "15px" }}>
//         <label>Role</label>
//         <select
//           name="role"
//           value={employee.role}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         >
//           <option value="">Select Role</option>
//           <option value="QA">QA</option>
//           <option value="Frontend Developer">Frontend Developer</option>
//           <option value="Backend Developer">Backend Developer</option>
//           <option value="Fullstack Developer">Fullstack Developer</option>
//           <option value="Data Scientist">Data Scientist</option>
//         </select>
//       </div>
 
//       <div style={{ marginBottom: "15px" }}>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={employee.email}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//       </div>
 
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <button
//           type="submit"
//           style={{ background: "#6A0DAD", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer" }}
//         >
//           Add Employee
//         </button>
//         <button
//           type="button"
//           onClick={closeForm}
//           style={{ background: "#ccc", color: "#333", padding: "10px 20px", border: "none", borderRadius: "10px", cursor: "pointer" }}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };
 
// export default AddEmployeeForm;
 
 
 
// src/components/Layout/Forms/AddEmployeeForm.js
 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, clearEmployeeStatus, fetchEmployees } from "../../../features/employees/employeesSlice";
import { toast } from "react-toastify";
 
const AddEmployeeForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const { loading, error, newEmployee } = useSelector((state) => state.employees);
 
  const [formData, setFormData] = useState({
    employeeId: 0,
    firstName: "",
    lastName: "",
    // Note: Assuming 'Role' in the form maps to a single 'roleName' or 'roleId'
    // For simplicity, we use an array of objects for the payload,
    // which is typical for a one-to-many relationship (Employee has many Roles).
    // Adjust the `roles` structure if your API expects something different.
    selectedRole: "QA", // Default to one role
    email: "",
  });
 
  // ------------------------------------
  // Success/Error Handling
  // ------------------------------------
  useEffect(() => {
    if (newEmployee) {
      toast.success(`Employee ${newEmployee.employeeId} added successfully!`);
      dispatch(clearEmployeeStatus());
     
      // Refresh the main employee list in the HR Dashboard
      dispatch(fetchEmployees());
     
      closeForm();
    }
   
    if (error) {
      // Check if error is a string (from slice) or an object (from backend)
      const errorMessage = typeof error === 'string' ? error : error.message || "Failed to add employee.";
      toast.error(`Error: ${errorMessage}`);
      dispatch(clearEmployeeStatus());
    }
  }, [newEmployee, error, dispatch, closeForm]);
 
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    // 🚀 Prepare the payload structure based on your likely API requirements
    const employeePayload = {
      // API usually ignores 0, but setting it here for explicit structure
      employeeId: 0,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
     
      // Assumes roles is an array of objects with a roleName property
      roles: [{ roleName: formData.selectedRole }],
     
      // Set default leaves count (API should handle this, but safer to include if needed)
      leavesTaken: 0,
      leavesPending: 0,
    };
   
    // Dispatch the thunk to add the employee
    dispatch(addEmployee(employeePayload));
  };
 
  // ------------------------------------
  // Styling (Copied from Leave Form)
  // ------------------------------------
  const inputStyle = { width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px", boxSizing: "border-box" };
  const formContainerStyle = { background: "#fff", padding: "30px", borderRadius: "15px", boxShadow: "0px 4px 15px rgba(0,0,0,0.2)", maxWidth: "500px", margin: "20px auto" };
  const buttonStyle = (isLoading, isCancel = false) => ({
    background: isCancel ? "#ccc" : (isLoading ? "#9B70BD" : "#6A0DAD"),
    color: isCancel ? "#333" : "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: isLoading ? "not-allowed" : "pointer",
    marginLeft: isCancel ? "10px" : "0"
  });
 
  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h2 style={{ color: "#6A0DAD", marginBottom: "20px" }}>Add New Employee (HR)</h2>
 
      {/* Employee ID is typically set to 0 for auto-generation by the backend on POST */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Employee ID (Auto)</label>
        <input
          type="number"
          name="employeeId"
          value={0}
          disabled
          style={{...inputStyle, background: '#f5f5f5'}}
        />
      </div>
 
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
      </div>
 
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
      </div>
 
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Role</label>
        <select name="selectedRole" value={formData.selectedRole} onChange={handleChange} required style={inputStyle}>
          {/* Add more roles as needed from your database */}
          <option value="QA">QA</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Engineer">Engineer</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
 
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
      </div>
 
 
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" disabled={loading} style={buttonStyle(loading)}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
        <button type="button" onClick={closeForm} style={buttonStyle(loading, true)} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
};
 
export default AddEmployeeForm;

