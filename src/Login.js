import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👁️ eye icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7243/api/User/login", {
        email,
        password,
        userRole,
      });

      const { role, name } = response.data;

      // Save to local storage
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);

      // Navigate based on role
      switch (role.toLowerCase()) {
        case "sales manager":
          navigate("/sales");
          break;
        case "finance manager":
          navigate("/finance");
          break;
        case "engineer manager":
        case "engineering manager":
          navigate("/engineering");
          break;
        case "hr manager":
          navigate("/hr");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Invalid credentials or role.");
    }
  };

  // Reset email & password when role changes
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", paddingRight: "30px" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#666",
            }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <br />

        <select value={userRole} onChange={handleRoleChange} required>
          <option value="">Select Role</option>
          <option value="Sales Manager">Sales Manager</option>
          <option value="Finance Manager">Finance Manager</option>
          <option value="Engineer Manager">Engineer Manager</option>
          <option value="HR Manager">HR Manager</option>
        </select>
        <br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
