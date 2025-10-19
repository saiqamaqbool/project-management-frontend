// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import Sidebar from "../../components/Layout/Sidebar";
// // import Navbar from "../../components/Layout/Navbar";
// // import { fetchEmployees, addEmployee, updateEmployeeLeave } from "../../features/employees/employeesSlice";
// // import { toast } from "react-toastify";
// // import AddEmployeeForm from "../../components/Layout/Forms/AddEmployeeForm";
 
// // const HRDashboard = () => {
// //   const dispatch = useDispatch();
// //   const { employees = [], loading } = useSelector((state) => state.employees);
 
// //   const [showAddEmployee, setShowAddEmployee] = useState(false);
// //   const [selectedEmployee, setSelectedEmployee] = useState(null);
// //   const [leaveTaken, setLeaveTaken] = useState("");
// //   const [leavePending, setLeavePending] = useState("");
 
// //   useEffect(() => {
// //     dispatch(fetchEmployees());
// //   }, [dispatch]);
 
// //   // ✅ Handle Leave Update
// //   const handleAdjustLeave = async () => {
// //     if (!selectedEmployee) {
// //       toast.error("Please select an employee first!");
// //       return;
// //     }
 
// //     try {
// //       await dispatch(updateEmployeeLeave({
// //         id: selectedEmployee.id,
// //         leavesTaken: Number(leaveTaken),
// //         leavesPending: Number(leavePending),
// //       })).unwrap();
 
// //       toast.success("Leave balance updated!");
 
// //       // Reset state to close form
// //       setSelectedEmployee(null);
// //       setLeaveTaken("");
// //       setLeavePending("");
// //     } catch (error) {
// //       toast.error("Failed to update leave balance!");
// //     }
// //   };
 
// //   // ✅ Handle Add Employee
// //   const handleAddEmployee = async (employeeData) => {
// //     try {
// //       await dispatch(addEmployee(employeeData)).unwrap();
// //       toast.success("Employee added successfully!");
// //       setShowAddEmployee(false); // Close form after success
// //     } catch (error) {
// //       toast.error("Failed to add employee!");
// //     }
// //   };
 
// //   return (
// //     <div style={{ display: "flex", background: "#F5F5F5", minHeight: "100vh" }}>
// //       <Sidebar role="hr" onAddEmployee={() => setShowAddEmployee(true)} />
 
// //       <div style={{ flex: 1 }}>
// //         <Navbar />
 
// //         <div style={{ padding: "20px" }}>
// //           {showAddEmployee ? (
// //             <AddEmployeeForm closeForm={() => setShowAddEmployee(false)} onSubmit={handleAddEmployee} />
// //           ) : (
// //             <>
// //               <h2 style={{ color: "#673AB7", marginBottom: "20px" }}>HR Dashboard</h2>
 
// //               {loading ? (
// //                 <p>Loading employees...</p>
// //               ) : (
// //                 <table style={{ width: "100%", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderCollapse: "collapse" }}>
// //                   <thead style={{ background: "#EDE7F6", color: "#333" }}>
// //                     <tr>
// //                       <th style={thStyle}>Employee ID</th>
// //                       <th style={thStyle}>Name</th>
// //                       <th style={thStyle}>Role</th>
// //                       <th style={thStyle}>Email</th>
// //                       <th style={thStyle}>Leaves Taken</th>
// //                       <th style={thStyle}>Leaves Pending</th>
// //                       <th style={thStyle}>Actions</th>
// //                     </tr>
// //                   </thead>
 
// //                   <tbody>
// //                     {employees.length === 0 ? (
// //                       <tr>
// //                         <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
// //                           No employees found
// //                         </td>
// //                       </tr>
// //                     ) : (
// //                       employees.map((emp) => (
// //                         <tr key={emp.id} style={{ textAlign: "center", background: selectedEmployee?.id === emp.id ? "#EDE7F6" : "white" }}>
// //                           <td style={tdStyle}>{emp.employeeId}</td>
// //                           <td style={tdStyle}>{emp.employeeName}</td>
// //                           <td style={tdStyle}>{emp.role}</td>
// //                           <td style={tdStyle}>{emp.email}</td>
// //                           <td style={tdStyle}>{emp.leavesTaken || 0}</td>
// //                           <td style={tdStyle}>{emp.leavesPending || 0}</td>
// //                           <td style={tdStyle}>
// //                             <button onClick={() => setSelectedEmployee(emp)} style={editBtn}>
// //                               Adjust Leave
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))
// //                     )}
// //                   </tbody>
// //                 </table>
// //               )}
 
// //               {selectedEmployee && (
// //                 <div style={{ marginTop: "30px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "60%" }}>
// //                   <h3 style={{ color: "#673AB7" }}>Adjust Leave for {selectedEmployee.employeeName}</h3>
 
// //                   <div style={{ margin: "10px 0" }}>
// //                     <label>Leaves Taken This Month:</label>
// //                     <input type="number" value={leaveTaken} onChange={(e) => setLeaveTaken(e.target.value)} style={inputStyle} />
// //                   </div>
 
// //                   <div style={{ margin: "10px 0" }}>
// //                     <label>Leaves Pending:</label>
// //                     <input type="number" value={leavePending} onChange={(e) => setLeavePending(e.target.value)} style={inputStyle} />
// //                   </div>
 
// //                   <button onClick={handleAdjustLeave} style={saveBtn}>Save Changes</button>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
 
// // export default HRDashboard;
 
// // // 🎨 Styles
// // const thStyle = { padding: "12px 15px", textAlign: "center", borderBottom: "1px solid #ddd" };
// // const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #f0f0f0" };
// // const editBtn = { background: "#FF9800", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" };
// // const saveBtn = { background: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", marginTop: "10px", cursor: "pointer" };
// // const inputStyle = { width: "100%", padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" };
 
 
 
 
// // src/pages/HRDashboard/HRDashboard.js
 
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Sidebar from "../../components/Layout/Sidebar";
// import Navbar from "../../components/Layout/Navbar";
// // Only import the necessary thunks
// import { fetchEmployees } from "../../features/employees/employeesSlice";
// import { toast } from "react-toastify";
// import AddEmployeeForm from "../../components/Layout/Forms/AddEmployeeForm";
 
// const HRDashboard = () => {
//     const dispatch = useDispatch();
//     const { employees = [], loading } = useSelector((state) => state.employees);
 
//     const [showAddEmployee, setShowAddEmployee] = useState(false);
//     // Removed all leave-related state: selectedEmployee, leaveTaken, leavePending
 
//     useEffect(() => {
//         dispatch(fetchEmployees());
//     }, [dispatch]);
 
//     // Removed handleAdjustLeave and handleAddEmployee (submission logic is now entirely in AddEmployeeForm)
 
//     return (
//         <div style={{ display: "flex", background: "#F5F5F5", minHeight: "100vh" }}>
//             <Sidebar role="hr" onAddEmployee={() => setShowAddEmployee(true)} />
 
//             <div style={{ flex: 1 }}>
//                 <Navbar />
 
//                 <div style={{ padding: "20px" }}>
//                     {showAddEmployee ? (
//                         // AddEmployeeForm handles its own submission using Redux, no 'onSubmit' prop needed
//                         <AddEmployeeForm closeForm={() => setShowAddEmployee(false)} />
//                     ) : (
//                         <>
//                             <h2 style={{ color: "#673AB7", marginBottom: "20px" }}>HR Dashboard (Employees)</h2>
 
//                             {loading ? (
//                                 <p>Loading employees...</p>
//                             ) : (
//                                 <table style={{ /* table styles */ }}>
//                                     <thead style={{ background: "#EDE7F6", color: "#333" }}>
//                                         <tr>
//                                             <th style={thStyle}>Employee ID</th>
//                                             <th style={thStyle}>First Name</th> {/* Updated */}
//                                             <th style={thStyle}>Last Name</th>  {/* Updated */}
//                                             <th style={thStyle}>Role</th>
//                                             <th style={thStyle}>Email</th>
//                                             {/* Assuming these are returned by GET /api/HR */}
//                                             <th style={thStyle}>Leaves Taken</th>
//                                             <th style={thStyle}>Leaves Pending</th>
//                                             {/* Removed Actions column */}
//                                         </tr>
//                                     </thead>
 
//                                     <tbody>
//                                         {employees.length === 0 ? (
//                                             <tr><td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>No employees found</td></tr>
//                                         ) : (
//                                             employees.map((emp) => (
//                                                 <tr key={emp.employeeId} style={{ textAlign: "center", background: "white" }}>
//                                                     <td style={tdStyle}>{emp.employeeId}</td>
//                                                     <td style={tdStyle}>{emp.firstName}</td> {/* Updated */}
//                                                     <td style={tdStyle}>{emp.lastName}</td>  {/* Updated */}
//                                                     {/* Access roleName from the roles array */}
//                                                     <td style={tdStyle}>{emp.roles?.map(r => r.roleName).join(', ') || 'N/A'}</td>
//                                                     <td style={tdStyle}>{emp.email}</td>
//                                                     <td style={tdStyle}>{emp.leavesTaken || 0}</td>
//                                                     <td style={tdStyle}>{emp.leavesPending || 0}</td>
//                                                 </tr>
//                                             ))
//                                         )}
//                                     </tbody>
//                                 </table>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
 
// export default HRDashboard;
 
// // 🎨 Styles (kept for completeness)
// const thStyle = { padding: "12px 15px", textAlign: "center", borderBottom: "1px solid #ddd" };
// const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #f0f0f0" };
 
// src/pages/HRDashboard/HRDashboard.js
 
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchEmployees } from "../../features/employees/employeesSlice";
import { fetchAllLeaveRecords } from "../../features/Leaves/LeavesSlice";
import AddEmployeeForm from "../../components/Layout/Forms/AddEmployeeForm";
import LeaveApplicationForm from "../../components/Layout/Forms/LeaveApplicationForm";
 
const ITEMS_PER_PAGE = 5;
 
// Helper function: Calculates the number of days between two dates (inclusive)
const calculateLeaveDuration = (fromDateStr, toDateStr) => {
    if (!fromDateStr || !toDateStr) return 0;
   
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
 
    if (isNaN(fromDate) || isNaN(toDate)) return 0;
 
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 
    // Add 1 to make the period inclusive
    return diffDays + 1;
};
 
 
const HRDashboard = () => {
    const dispatch = useDispatch();
   
    // Select data from store
    const { employees: allEmployees, loading: empLoading } = useSelector((state) => state.employees);
    const { allLeaveRecords: allLeaves, loading: leavesLoading } = useSelector((state) => state.leaves);
 
    // Form and Pagination State
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [showApplyLeave, setShowApplyLeave] = useState(false);
    const isFormVisible = showAddEmployee || showApplyLeave;
 
    const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
    const [leavesSearchTerm, setLeavesSearchTerm] = useState('');
    const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
    const [currentLeavesPage, setCurrentLeavesPage] = useState(1);
   
    // Initial data fetch
    useEffect(() => {
        dispatch(fetchEmployees());
        dispatch(fetchAllLeaveRecords());
    }, [dispatch]);
 
    const closeAllForms = () => {
        dispatch(fetchEmployees());
        dispatch(fetchAllLeaveRecords());
        setShowAddEmployee(false);
        setShowApplyLeave(false);
    };
 
    // --------------------------------------------------------------------
    // DATA PROCESSING: Leaves (Joining Name & Calculating Duration)
    // --------------------------------------------------------------------
    const { processedLeaves, totalLeavesByEmployee } = useMemo(() => {
        // Create a map for quick employee name lookup
        const employeeMap = allEmployees.reduce((map, emp) => {
            map[emp.employeeId] = { firstName: emp.firstName, lastName: emp.lastName };
            return map;
        }, {});
 
        // Map to store total leaves taken per employee: { employeeId: totalDays }
        const totalLeavesMap = {};
 
        // 1. Process Leaves: Join Employee Name, calculate duration, and sum totals
        const processed = allLeaves.map(leave => {
            const empInfo = employeeMap[leave.employeeId] || { firstName: 'Unknown', lastName: 'Employee' };
            const duration = calculateLeaveDuration(leave.fromDate, leave.toDate);
 
            // 🚀 SUMMATION LOGIC: Aggregate total leaves per employee
            totalLeavesMap[leave.employeeId] = (totalLeavesMap[leave.employeeId] || 0) + duration;
            // -----------------------------------------------------------
 
            return {
                ...leave,
                employeeName: `${empInfo.firstName} ${empInfo.lastName}`,
                duration: duration,
            };
        });
       
        return {
            processedLeaves: processed,
            totalLeavesByEmployee: totalLeavesMap
        };
    }, [allLeaves, allEmployees]);
 
 
    // --------------------------------------------------------------------
    // DATA PROCESSING: Employees (Merging Total Leaves, Filtering & Pagination)
    // --------------------------------------------------------------------
    const { paginatedEmployees, totalEmployeePages } = useMemo(() => {
       
        // 1. Merge Leaves Taken Data
        const mergedEmployees = allEmployees.map(emp => ({
            ...emp,
            // 🚀 OVERWRITE/SET leavesTaken WITH CALCULATED SUM
            leavesTaken: totalLeavesByEmployee[emp.employeeId] || 0
            // leavesPending is left as whatever the API returned, or you can calculate it here
            // based on total entitlement (e.g., 20 - leavesTaken) if entitlement is known.
        }));
 
        // 2. Filtering
        const filtered = mergedEmployees.filter(emp => {
            if (!employeeSearchTerm) return true;
            const term = employeeSearchTerm.toLowerCase();
            return (
                String(emp.employeeId).includes(term) ||
                emp.firstName?.toLowerCase().includes(term) ||
                emp.lastName?.toLowerCase().includes(term) ||
                emp.email?.toLowerCase().includes(term)
            );
        });
 
        // 3. Pagination
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        const startIndex = (currentEmployeePage - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
 
        return {
            paginatedEmployees: paginated,
            totalEmployeePages: totalPages
        };
    }, [allEmployees, employeeSearchTerm, currentEmployeePage, totalLeavesByEmployee]);
 
 
    // --------------------------------------------------------------------
    // DATA PROCESSING: Leaves Filtering & Pagination (Separate for cleaner dependency)
    // --------------------------------------------------------------------
    const { paginatedLeaves, totalLeavesPages } = useMemo(() => {
         // Filtering on the already processedLeaves (which has the employeeName)
        const filtered = processedLeaves.filter(leave => {
            if (!leavesSearchTerm) return true;
            const term = leavesSearchTerm.toLowerCase();
            return (
                String(leave.leaveId).includes(term) ||
                String(leave.employeeId).includes(term) ||
                leave.employeeName.toLowerCase().includes(term) ||
                leave.leaveType?.toLowerCase().includes(term) ||
                leave.reason?.toLowerCase().includes(term)
            );
        });
 
        // Pagination
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        const startIndex = (currentLeavesPage - 1) * ITEMS_PER_PAGE;
        const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
 
        return {
            paginatedLeaves: paginated,
            totalLeavesPages: totalPages
        };
    }, [processedLeaves, leavesSearchTerm, currentLeavesPage]);
 
 
    // --------------------------------------------------------------------
    // START: Components & Styles (Unchanged)
    // --------------------------------------------------------------------
    const thStyle = { padding: "12px 15px", textAlign: "center", borderBottom: "1px solid #ddd" };
    const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #f0f0f0" };
 
    const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
            <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{ margin: '0 5px', padding: '8px 15px', border: '1px solid #6A0DAD', background: '#fff', color: '#6A0DAD', cursor: 'pointer', borderRadius: '5px' }}
            >
                Previous
            </button>
            <span style={{ margin: '0 15px' }}>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                style={{ margin: '0 5px', padding: '8px 15px', border: '1px solid #6A0DAD', background: '#fff', color: '#6A0DAD', cursor: 'pointer', borderRadius: '5px' }}
            >
                Next
            </button>
        </div>
    );
   
    // --------------------------------------------------------------------
    // EMPLOYEE TABLE (Now renders calculated leavesTaken)
    // --------------------------------------------------------------------
    const EmployeeTable = () => (
        <div>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                <input
                    type="text"
                    placeholder="Filter Employees (ID, Name, Email)"
                    value={employeeSearchTerm}
                    onChange={(e) => {
                        setEmployeeSearchTerm(e.target.value);
                        setCurrentEmployeePage(1);
                    }}
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>
 
            <table style={{ width: "100%", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderCollapse: "collapse" }}>
                <thead style={{ background: "#EDE7F6", color: "#333" }}>
                    <tr>
                        <th style={thStyle}>Employee ID</th>
                        <th style={thStyle}>First Name</th>
                        <th style={thStyle}>Last Name</th>
                        <th style={thStyle}>Role(s)</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Leaves Taken</th> {/* 🚀 NOW SHOWS CALCULATED SUM */}
                        <th style={thStyle}>Leaves Pending</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEmployees.length === 0 ? (
                        <tr><td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>{employeeSearchTerm ? "No matching employees found." : "No employees found."}</td></tr>
                    ) : (
                        paginatedEmployees.map((emp) => (
                            <tr key={emp.employeeId} style={{ textAlign: "center", background: "white" }}>
                                <td style={tdStyle}>{emp.employeeId}</td>
                                <td style={tdStyle}>{emp.firstName}</td>
                                <td style={tdStyle}>{emp.lastName}</td>
                                <td style={tdStyle}>{emp.roles?.map(r => r.roleName).join(', ') || 'N/A'}</td>
                                <td style={tdStyle}>{emp.email}</td>
                                <td style={tdStyle}>{emp.leavesTaken || 0}</td> {/* Renders the newly calculated sum */}
                                <td style={tdStyle}>{emp.leavesPending || 0}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
           
            <PaginationControls
                currentPage={currentEmployeePage}
                totalPages={totalEmployeePages}
                setCurrentPage={setCurrentEmployeePage}
            />
        </div>
    );
 
 
    // --------------------------------------------------------------------
    // LEAVE RECORDS TABLE (WITH JOINED NAME AND DURATION)
    // --------------------------------------------------------------------
    const AllLeaveRecordsTable = () => (
        <div style={{ marginTop: "40px" }}>
            {/* Note: processedLeaves.length is used here as the total count for filtering */}
            <h3 style={{ color: "#673AB7", marginBottom: "15px" }}>All Leave Records ({processedLeaves.length} total records)</h3>
 
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                <input
                    type="text"
                    placeholder="Filter Leaves (ID, Employee ID, Name, Type, Reason)"
                    value={leavesSearchTerm}
                    onChange={(e) => {
                        setLeavesSearchTerm(e.target.value);
                        setCurrentLeavesPage(1);
                    }}
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>
 
            <table style={{ width: "100%", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", borderCollapse: "collapse" }}>
                <thead style={{ background: "#E8EAF6", color: "#333" }}>
                    <tr>
                        <th style={thStyle}>Leave ID</th>
                        <th style={thStyle}>Employee ID</th>
                        <th style={thStyle}>Employee Name</th>
                        <th style={thStyle}>Type</th>
                        <th style={thStyle}>From Date</th>
                        <th style={thStyle}>To Date</th>
                        <th style={thStyle}>Days Taken</th>
                        <th style={thStyle}>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {leavesLoading ? (
                        <tr><td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>Loading leave records...</td></tr>
                    ) : paginatedLeaves.length === 0 ? (
                        <tr><td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>{leavesSearchTerm ? "No matching records found." : "No leave records found."}</td></tr>
                    ) : (
                        paginatedLeaves.map((leave) => (
                            <tr key={leave.leaveId} style={{ textAlign: "center", background: "white" }}>
                                <td style={tdStyle}>{leave.leaveId}</td>
                                <td style={tdStyle}>{leave.employeeId}</td>
                                <td style={tdStyle}>{leave.employeeName}</td>
                                <td style={tdStyle}>{leave.leaveType}</td>
                                <td style={tdStyle}>{leave.fromDate}</td>
                                <td style={tdStyle}>{leave.toDate}</td>
                                <td style={tdStyle}>{leave.duration}</td>
                                <td style={tdStyle}>{leave.reason}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
 
            <PaginationControls
                currentPage={currentLeavesPage}
                totalPages={totalLeavesPages}
                setCurrentPage={setCurrentLeavesPage}
            />
        </div>
    );
   
    // --------------------------------------------------------------------
    // END: Components
    // --------------------------------------------------------------------
 
 
    return (
        <div style={{ display: "flex", background: "#F5F5F5", minHeight: "100vh" }}>
            <Sidebar
                role="hr"
                onAddEmployee={() => { setShowApplyLeave(false); setShowAddEmployee(true); }}
                onApplyLeave={() => { setShowAddEmployee(false); setShowApplyLeave(true); }}
            />
 
            <div style={{ flex: 1 }}>
                <Navbar />
 
                <div style={{ padding: "20px" }}>
                   
                    {showAddEmployee && (<AddEmployeeForm closeForm={closeAllForms} />)}
                    {showApplyLeave && (<LeaveApplicationForm closeForm={closeAllForms} />)}
 
                    {!isFormVisible && (
                        <>
                            <h2 style={{ color: "#673AB7", marginBottom: "20px" }}>HR Dashboard (Employee Overview)</h2>
 
                            {empLoading ? (
                                <p>Loading employee data...</p>
                            ) : (
                                <EmployeeTable />
                            )}
                           
                            <AllLeaveRecordsTable />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
 
export default HRDashboard;