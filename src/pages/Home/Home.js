import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const roles = [
  { name: "Sales", color: "#9B30FF", img: "./images/Sales.jpg" },
  { name: "Finance", color: "#8A2BE2", img: "./images/Finance.jpg" },
  { name: "Engineering", color: "#7B1FA2", img: "./images/Engineering.jpg" },
  { name: "HR", color: "#6A0DAD", img: "./images/HR.jpg" },
];

const Home = ({ setRole }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  // when a role is clicked
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };
 
  // login function
  const handleLogin = async (e) => {
    e.preventDefault();
 
    const userRole =
      selectedRole === "Sales"
        ? "Sales Manager"
        : selectedRole === "Finance"
        ? "Finance Manager"
        : selectedRole === "Engineering"
        ? "Engineer Manager"
        : selectedRole === "HR"
        ? "HR Manager"
        : "";
 
    try {
      const response = await axios.post("https://localhost:7243/api/User/login", {
        email,
        password,
        userRole,
      });
 
      const { role, name } = response.data;
 
      // normalize role name for frontend routing
      const normalizedRole = role.toLowerCase().includes("sales")
        ? "sales"
        : role.toLowerCase().includes("finance")
        ? "finance"
        : role.toLowerCase().includes("engineer")
        ? "engineering"
        : role.toLowerCase().includes("hr")
        ? "hr"
        : "";
 
      // store in local storage
      localStorage.setItem("userRole", normalizedRole);
      localStorage.setItem("userName", name);
      setRole(normalizedRole);
 
      toast.success(`logged in successfully`);
 
      // navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials or role");
    }
  };
 
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
      }}
    >
      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundImage: "url(/images/banner.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "36px",
            fontWeight: "700",
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          Welcome to Project Management
        </h1>
      </div>
 
      {/* If no role selected → show role cards */}
      {!selectedRole && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "50px 20px",
          }}
        >
          <h2 style={{ marginBottom: "30px", color: "#4A148C" }}>
            Select Your Department
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "30px",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            {roles.map((r) => (
              <div
                key={r.name}
                onClick={() => handleSelectRole(r.name)}
                style={{
                  background: r.color,
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "30px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0px 10px 25px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0px 5px 15px rgba(0,0,0,0.2)";
                }}
              >
                <img
                  src={r.img}
                  alt={r.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "15px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #fff",
                    background: "#fff",
                  }}
                />
                <h2 style={{ fontSize: "22px", fontWeight: "600" }}>{r.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* If role selected → show login form */}
      {selectedRole && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <h2 style={{ color: "#4A148C", marginBottom: "20px" }}>
            {selectedRole} Login
          </h2>
          <form
            onSubmit={handleLogin}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
              width: "100%",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#6A0DAD",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("")}
              style={{
                background: "transparent",
                color: "#6A0DAD",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                marginTop: "10px",
              }}
            >
              Back to Role Selection
            </button>
          </form>
        </div>
      )}
 
      {/* Footer */}
      <footer
        style={{
          height: "60px",
          background: "#6A0DAD",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          fontSize: "14px",
        }}
      >
        &copy; 2025 Project Management System. All rights reserved.
      </footer>
    </div>
  );
};
 
export default Home;
