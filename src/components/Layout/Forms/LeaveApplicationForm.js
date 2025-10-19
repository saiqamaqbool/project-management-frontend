import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeLeaveCounts, fetchEmployees } from "../../../features/employees/employeesSlice";
import { submitLeaveApplication, fetchEmployeeLeaveCount, clearLeaveStatus, fetchAllLeaveRecords } from "../../../features/Leaves/LeavesSlice";
import { toast } from "react-toastify";
 
const LeaveApplicationForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const { loading, error, newApplication } = useSelector((state) => state.leaves);
  // 🚀 GET ALL EMPLOYEES FROM THE STORE
  const { employees } = useSelector((state) => state.employees);
 
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: "Annual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });
 
  // 🚀 Fetch employees on mount if not already there,
  // though HRDashboard does this, it's safer to ensure.
  useEffect(() => {
    if (employees.length === 0) {
        dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);
 
  // Handle success logic (remains the same)
  useEffect(() => {
    // ... (Your existing useEffect logic for handling newApplication and error) ...
    const handleLeaveSuccess = async () => {
        if (!newApplication) return;
 
        const employeeId = Number(formData.employeeId);
 
        try {
            const countResult = await dispatch(fetchEmployeeLeaveCount(employeeId)).unwrap();
            dispatch(updateEmployeeLeaveCounts({
                employeeId: employeeId,
                leavesTaken: countResult.leavesTaken,
                leavesPending: countResult.leavesPending,
            }));
           
            toast.success(`Leave submitted and approved for Employee ${employeeId}.`);
           
        } catch (e) {
            toast.warn(`Leave submitted successfully, but failed to fetch the updated count from the API.`);
        } finally {
            dispatch(clearLeaveStatus());
            dispatch(fetchAllLeaveRecords());
            dispatch(fetchEmployees());
            closeForm();
        }
    };
   
    if (newApplication) {
        handleLeaveSuccess();
    }
   
    if (error) {
        toast.error(`Submission Error: ${error}`);
        dispatch(clearLeaveStatus());
    }
  }, [newApplication, error, dispatch, closeForm, formData.employeeId]);
 
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!formData.employeeId) {
        toast.error("Please select an employee.");
        return;
    }
 
    const leavePayload = {
      leaveId: 0,
      // 🚀 Ensure employeeId is passed as a Number
      employeeId: Number(formData.employeeId),
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason,
    };
   
    dispatch(submitLeaveApplication(leavePayload));
  };
 
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
      <h2 style={{ color: "#6A0DAD", marginBottom: "20px" }}>Apply for Leave</h2>
 
      {/* 🚀 CHANGED TO SELECT DROPDOWN */}
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Employee</label>
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
            <option key={emp.employeeId} value={emp.employeeId}>
              {emp.employeeId} - {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
        {employees.length === 0 && (
            <p style={{color: 'red', marginTop: '5px'}}>Error: No employees loaded. Please check employee fetching.</p>
        )}
      </div>
      {/* END SELECT DROPDOWN */}
     
      <div style={{ marginBottom: "15px" }}><label style={{ display: "block", marginBottom: "5px" }}>Leave Type</label><select name="leaveType" value={formData.leaveType} onChange={handleChange} required style={inputStyle}> <option value="Annual Leave">Annual Leave</option><option value="Sick Leave">Sick Leave</option><option value="Unpaid Leave">Unpaid Leave</option></select></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <div style={{ width: "48%" }}><label style={{ display: "block", marginBottom: "5px" }}>From Date</label><input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required style={inputStyle} /></div>
        <div style={{ width: "48%" }}><label style={{ display: "block", marginBottom: "5px" }}>To Date</label><input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required style={inputStyle} /></div>
      </div>
      <div style={{ marginBottom: "20px" }}><label style={{ display: "block", marginBottom: "5px" }}>Reason</label><textarea name="reason" value={formData.reason} onChange={handleChange} required rows="4" style={inputStyle} /></div>
 
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button type="submit" disabled={loading} style={buttonStyle(loading)}>
          {loading ? "Submitting..." : "Submit & Approve Leave"}
        </button>
        <button type="button" onClick={closeForm} style={buttonStyle(loading, true)} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
};
 
export default LeaveApplicationForm;