import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import {
  fetchFinanceData,
  generateInvoices,
} from "../../features/Finance/financeSlice";
import { fetchInvoices } from "../../features/invoices/invoicesSlice";
import { Card, CardContent, Menu, MenuItem, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { invoices = [], loading, error } = useSelector(
    (state) => state.invoice || {}
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const isInvoicePage = location.pathname.includes("invoices");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://localhost:7243/api/Finance/Projects");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };
    fetchProjects();
    dispatch(fetchFinanceData());
  }, [dispatch]);

  useEffect(() => {
    if (isInvoicePage) {
      const doGenAndFetch = async () => {
        try {
          await dispatch(generateInvoices()).unwrap();
        } catch (err) {
          console.error("Generate invoices failed:", err);
        } finally {
          dispatch(fetchInvoices());
        }
      };
      doGenAndFetch();
    }
  }, [dispatch, isInvoicePage]);

  // ✅ Filter projects by search term
  const filteredProjects = projects.filter((proj) =>
    proj.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuOpen = (event, projectId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  const handleExportExcel = async () => {
    if (!selectedProjectId) return;
    try {
      const res = await axios.get(
        `https://localhost:7243/api/Finance/ExportExcel/${selectedProjectId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Project_${selectedProjectId}_Invoices.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      handleMenuClose();
    } catch (err) {
      console.error("Excel export failed:", err);
    }
  };

  const handleExportPdf = async () => {
    if (!selectedProjectId) return;
    try {
      const res = await axios.get(
        `https://localhost:7243/api/Finance/ExportPdf/${selectedProjectId}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Project_${selectedProjectId}_Invoices.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      handleMenuClose();
    } catch (err) {
      console.error("PDF export failed:", err);
    }
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
                <Card style={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <CardContent>
                    <h3>Total Projects</h3>
                    <p style={{ fontSize: "28px", color: "#6A0DAD" }}>
                      {projects.length}
                    </p>
                  </CardContent>
                </Card>

                <Card style={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <CardContent>
                    <h3>Invoices Generated</h3>
                    <p style={{ fontSize: "28px", color: "#008080" }}>
                      {invoices.length}
                    </p>
                  </CardContent>
                </Card>

                <Card style={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <CardContent>
                    <h3>Active Revenue</h3>
                    <p style={{ fontSize: "28px", color: "#FF6347" }}>
                      ₹{projects.reduce((acc, p) => acc + (p.dailyRate || 0), 0)}
                    </p>
                  </CardContent>
                </Card>
              </div>

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
                    <Bar dataKey="earnings" fill="#6A0DAD" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontWeight: "600" }}>Invoices</h2>
                {/* ✅ Search bar filters projects */}
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    outline: "none",
                    fontSize: "14px",
                    width: "300px",
                  }}
                />
              </div>

              <h3 style={{ marginBottom: "20px" }}>Active Projects</h3>
              {filteredProjects.length === 0 ? (
                <p>No projects found.</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                  }}
                >
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.projectId}
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                        padding: "20px",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
                    >
                      <h3 style={{ color: "#4A148C", marginBottom: "12px" }}>
                        {proj.projectName}
                      </h3>
                      <p><strong>Description:</strong> {proj.description}</p>
                      <p><strong>Start Date:</strong> {proj.startDate?.split("T")[0]}</p>
                      <p><strong>End Date:</strong> {proj.endDate?.split("T")[0]}</p>
                      <p><strong>Daily Rate:</strong> ₹{proj.dailyRate}</p>

                      <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <Button
                          variant="contained"
                          onClick={(e) => handleMenuOpen(e, proj.projectId)}
                          style={{
                            background: "#6A0DAD",
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "10px 16px",
                            width: "100%",
                            fontWeight: 600,
                          }}
                        >
                          Export Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ✅ MUI Menu for Export */}
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleExportExcel}>Export as Excel</MenuItem>
                <MenuItem onClick={handleExportPdf}>Export as PDF</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
