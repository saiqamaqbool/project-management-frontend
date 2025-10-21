import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchEmployees } from "../../features/employees/employeesSlice";
import { fetchAllLeaveRecords } from "../../features/Leaves/LeavesSlice";
import AddEmployeeForm from "../../components/Layout/Forms/AddEmployeeForm";
import LeaveApplicationForm from "../../components/Layout/Forms/LeaveApplicationForm";

const ITEMS_PER_PAGE = 5;

// Helper: calculate leave duration
const calculateLeaveDuration = (fromDateStr, toDateStr) => {
  if (!fromDateStr || !toDateStr) return 0;
  const fromDate = new Date(fromDateStr);
  const toDate = new Date(toDateStr);
  if (isNaN(fromDate) || isNaN(toDate)) return 0;
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const HRDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { employees: allEmployees, loading: empLoading } = useSelector(
    (state) => state.employees
  );
  const { allLeaveRecords: allLeaves, loading: leavesLoading } = useSelector(
    (state) => state.leaves
  );

  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const isFormVisible = showAddEmployee || showApplyLeave;

  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [leavesSearchTerm, setLeavesSearchTerm] = useState("");
  const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
  const [currentLeavesPage, setCurrentLeavesPage] = useState(1);
  const [showLeaveRecords, setShowLeaveRecords] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchAllLeaveRecords());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/leaves") {
      setShowAddEmployee(false);
      setShowApplyLeave(true);
    } else if (location.pathname === "/add-employee") {
      setShowAddEmployee(true);
      setShowApplyLeave(false);
    } else {
      setShowAddEmployee(false);
      setShowApplyLeave(false);
    }
  }, [location.pathname]);

  const closeAllForms = () => {
    dispatch(fetchEmployees());
    dispatch(fetchAllLeaveRecords());
    setShowAddEmployee(false);
    setShowApplyLeave(false);
    navigate("/dashboard");
  };

  // -------------------- Leaves Processing --------------------
  const { processedLeaves, totalLeavesByEmployee } = useMemo(() => {
    const employeeMap = allEmployees.reduce((map, emp) => {
      map[emp.employeeId] = { firstName: emp.firstName, lastName: emp.lastName };
      return map;
    }, {});
    const totalLeavesMap = {};
    const processed = allLeaves.map((leave) => {
      const empInfo =
        employeeMap[leave.employeeId] || { firstName: "Unknown", lastName: "Employee" };
      const duration = calculateLeaveDuration(leave.fromDate, leave.toDate);
      totalLeavesMap[leave.employeeId] =
        (totalLeavesMap[leave.employeeId] || 0) + duration;
      return {
        ...leave,
        employeeName: `${empInfo.firstName} ${empInfo.lastName}`,
        duration,
      };
    });
    return { processedLeaves: processed, totalLeavesByEmployee: totalLeavesMap };
  }, [allLeaves, allEmployees]);

  // -------------------- Employee Table Processing --------------------
  const { paginatedEmployees, totalEmployeePages } = useMemo(() => {
    const mergedEmployees = allEmployees.map((emp) => ({
      ...emp,
      leavesTaken: totalLeavesByEmployee[emp.employeeId] || 0,
    }));

    const filtered = mergedEmployees.filter((emp) => {
      if (!employeeSearchTerm) return true;
      const term = employeeSearchTerm.toLowerCase();
      return (
        String(emp.employeeId).includes(term) ||
        emp.firstName?.toLowerCase().includes(term) ||
        emp.lastName?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term)
      );
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentEmployeePage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedEmployees: paginated, totalEmployeePages: totalPages };
  }, [allEmployees, employeeSearchTerm, currentEmployeePage, totalLeavesByEmployee]);

  // -------------------- Leaves Pagination --------------------
  const { paginatedLeaves, totalLeavesPages } = useMemo(() => {
    const filtered = processedLeaves.filter((leave) => {
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

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentLeavesPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedLeaves: paginated, totalLeavesPages: totalPages };
  }, [processedLeaves, leavesSearchTerm, currentLeavesPage]);

  const PaginationControls = ({ currentPage, totalPages, setCurrentPage }) => (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span style={{ margin: "0 15px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>
    </div>
  );

  // -------------------- Render --------------------
  return (
    <div style={{ display: "flex", background: "#F5F5F5", minHeight: "100vh" }}>
      <Sidebar role="hr" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px" }}>
          {showAddEmployee && <AddEmployeeForm closeForm={closeAllForms} />}
          {showApplyLeave && <LeaveApplicationForm closeForm={closeAllForms} />}

          {!isFormVisible && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2 style={{ color: "#673AB7", margin: 0 }}>
                  HR Dashboard (Employee Overview)
                </h2>

                {/* ✅ Employee Search Bar - Top Right */}
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={employeeSearchTerm}
                  onChange={(e) => {
                    setEmployeeSearchTerm(e.target.value);
                    setCurrentEmployeePage(1);
                  }}
                  style={{
                    width: "250px",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              {empLoading ? (
                <p>Loading employee data...</p>
              ) : (
                <>
                  <EmployeeTable paginatedEmployees={paginatedEmployees} />
                  <PaginationControls
                    currentPage={currentEmployeePage}
                    totalPages={totalEmployeePages}
                    setCurrentPage={setCurrentEmployeePage}
                  />
                </>
              )}

              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button
                  onClick={() => setShowLeaveRecords(!showLeaveRecords)}
                  style={{
                    background: "#673AB7",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {showLeaveRecords ? "Hide Leave Records ▲" : "Show Leave Records ▼"}
                </button>
              </div>

              {showLeaveRecords && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "30px",
                      marginBottom: "10px",
                    }}
                  >
                    <h3 style={{ color: "#3F51B5", margin: 0 }}>
                      All Leave Records
                    </h3>

                    {/* ✅ Leave Records Search Bar - Top Right */}
                    <input
                      type="text"
                      placeholder="Search leave records..."
                      value={leavesSearchTerm}
                      onChange={(e) => {
                        setLeavesSearchTerm(e.target.value);
                        setCurrentLeavesPage(1);
                      }}
                      style={{
                        width: "250px",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>

                  <AllLeaveRecordsTable paginatedLeaves={paginatedLeaves} />
                  <PaginationControls
                    currentPage={currentLeavesPage}
                    totalPages={totalLeavesPages}
                    setCurrentPage={setCurrentLeavesPage}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------- Employee Table --------------------
const EmployeeTable = ({ paginatedEmployees }) => {
  const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #f0f0f0" };
  const thStyle = {
    padding: "12px 15px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  return (
    <table
      style={{
        width: "100%",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderCollapse: "collapse",
      }}
    >
      <thead style={{ background: "#EDE7F6", color: "#333" }}>
        <tr>
          <th style={thStyle}>Employee ID</th>
          <th style={thStyle}>First Name</th>
          <th style={thStyle}>Last Name</th>
          <th style={thStyle}>Role(s)</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Leaves Taken</th>
        </tr>
      </thead>
      <tbody>
        {paginatedEmployees.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
              No employees found.
            </td>
          </tr>
        ) : (
          paginatedEmployees.map((emp) => (
            <tr key={emp.employeeId} style={{ textAlign: "center", background: "white" }}>
              <td style={tdStyle}>{emp.employeeId}</td>
              <td style={tdStyle}>{emp.firstName}</td>
              <td style={tdStyle}>{emp.lastName}</td>
              <td style={tdStyle}>{emp.roles?.map((r) => r.roleName).join(", ") || "N/A"}</td>
              <td style={tdStyle}>{emp.email}</td>
              <td style={tdStyle}>{emp.leavesTaken || 0}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

// -------------------- All Leave Records Table --------------------
const AllLeaveRecordsTable = ({ paginatedLeaves }) => {
  const tdStyle = { padding: "12px 15px", borderBottom: "1px solid #f0f0f0" };
  const thStyle = {
    padding: "12px 15px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  return (
    <table
      style={{
        width: "100%",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderCollapse: "collapse",
        marginTop: "10px",
      }}
    >
      <thead style={{ background: "#E8EAF6", color: "#333" }}>
        <tr>
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
        {paginatedLeaves.length === 0 ? (
          <tr>
            <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>
              No leave records found.
            </td>
          </tr>
        ) : (
          paginatedLeaves.map((leave) => (
            <tr key={leave.leaveId} style={{ textAlign: "center", background: "white" }}>
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
  );
};

export default HRDashboard;
