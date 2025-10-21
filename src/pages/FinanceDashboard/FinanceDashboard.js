import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { fetchFinanceData, generateInvoices } from "../../features/Finance/financeSlice";
import { fetchInvoices } from "../../features/invoices/invoicesSlice";
import { Card, CardContent } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
 
const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
 
  //  pull invoices from invoiceSlice instead of financeSlice
  const { invoices = [], loading, error } = useSelector((state) => state.invoice || {});
 
  const [searchTerm, setSearchTerm] = useState("");
 
  const isInvoicePage = location.pathname.includes("invoices");
 
  // Fetch base finance data once
  // useEffect(() => {
  //   dispatch(fetchFinanceData());
  // }, [dispatch]);
 
  // //  When user goes to /invoices, generate + fetch them
  // useEffect(() => {
  //   if (isInvoicePage) {
  //     dispatch(generateInvoices());
  //     dispatch(fetchInvoices());
  //   }
  // }, [dispatch, isInvoicePage]);
  useEffect(() => {
  // load base finance data first
  dispatch(fetchFinanceData());
}, [dispatch]);
 
useEffect(() => {
  // when the user navigates to /finance/invoices, generate then fetch
  if (isInvoicePage) {
    const doGenAndFetch = async () => {
      try {
        // generateInvoices returns created invoices (per our thunk)
        await dispatch(generateInvoices()).unwrap(); // unwrap catches/throws errors
      } catch (err) {
        console.error("generateInvoices failed:", err);
      } finally {
        dispatch(fetchInvoices()); // always try to fetch the latest
      }
    };
    doGenAndFetch();
  }
}, [dispatch, isInvoicePage]);
 
 
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.employeeEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const handleSendInvoice = (invoice) => {
    alert(
      ` Invoice sent to client (${invoice.clientId})\nEmployee: ${invoice.employeeName}\nProject: ${invoice.projectName}\nTotal: ₹${invoice.totalPay}`
    );
  };
 
  if (loading)
    return <div style={{ textAlign: "center", marginTop: 100 }}>Loading...</div>;
  if (error)
    return <div style={{ textAlign: "center", marginTop: 100 }}>{error}</div>;
 
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9f9fb" }}>
      <Sidebar role="finance" />
 
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
 
        <div style={{ padding: "30px" }}>
          {!isInvoicePage ? (
            // FINANCE OVERVIEW PAGE
            <>
              <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
                Finance Overview
              </h2>
 
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                  marginBottom: "40px",
                }}
              >
                <Card
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent>
                    <h3>Total Revenue</h3>
                    <p style={{ fontSize: "28px", color: "#6A0DAD" }}>
                      ₹12,45,000
                    </p>
                  </CardContent>
                </Card>
 
                <Card
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent>
                    <h3>Pending Payments</h3>
                    <p style={{ fontSize: "28px", color: "#FF6347" }}>
                      ₹1,20,000
                    </p>
                  </CardContent>
                </Card>
 
                <Card
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent>
                    <h3>Invoices Generated</h3>
                    <p style={{ fontSize: "28px", color: "#008080" }}>
                      {invoices.length}
                    </p>
                  </CardContent>
                </Card>
              </div>
 
              {/* Chart */}
              <div style={{ marginTop: "40px" }}>
                <h3>Earnings Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Jan", earnings: 4000 },
                      { name: "Feb", earnings: 3000 },
                      { name: "Mar", earnings: 5000 },
                      { name: "Apr", earnings: 4200 },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="earnings"
                      fill="#6A0DAD"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            // INVOICE PAGE
            <>
              <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
                Invoices
              </h2>
 
              <input
                type="text"
                placeholder="Search by employee name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  marginBottom: "30px",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
 
              {filteredInvoices.length === 0 ? (
                <p>No invoices to show.</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {filteredInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                        padding: "20px",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "translateY(-4px)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateY(0px)")
                      }
                    >
                      <h3 style={{ color: "#4A148C", marginBottom: "12px" }}>
                        {inv.projectName}
                      </h3>
                      <p>
                        <strong>Employee:</strong> {inv.employeeName}
                      </p>
                      <p>
                        <strong>Email:</strong> {inv.employeeEmail}
                      </p>
                      <p>
                        <strong>Working Days:</strong> {inv.workingDays}
                      </p>
                      <p>
                        <strong>Rate/Day:</strong> ₹{inv.ratePerDay}
                      </p>
                      <p>
                        <strong>Total Pay:</strong> ₹{inv.totalPay}
                      </p>
 
                      <button
                        onClick={() => handleSendInvoice(inv)}
                        style={{
                          background: "#6A0DAD",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          padding: "10px 16px",
                          cursor: "pointer",
                          width: "100%",
                          fontWeight: 600,
                          transition: "0.3s",
                          marginTop: "10px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#8A2BE2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#6A0DAD")
                        }
                      >
                        Send Invoice
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default FinanceDashboard;