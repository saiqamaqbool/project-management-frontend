import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import axios from "axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({ name: "", email: "", profilePic: "" });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here (e.g., clearing token/localStorage)
    handleMenuClose();
  };

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://localhost:7243/api/User");
        // Assuming response.data contains { name, email, profilePic }
        setUser({
          name: response.data.name,
          email: response.data.email,
          profilePic: response.data.profilePic || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div
      style={{
        height: "70px",
        width: "100%",
        background: "#8A2BE2",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        fontFamily: "Poppins, sans-serif",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Left: App Name */}
      <div style={{ fontSize: "22px", fontWeight: "600" }}>
        Project Management
      </div>

      {/* Right: Profile Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", maxHeight: "70px" }}>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={handleMenuOpen}>
          <img
            src={
              user.profilePic ||
              "https://img.freepik.com/premium-photo/financial-advisor-digital-avatar-generative-ai_934475-9119.jpg?w=360"
            }
            alt="Profile"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #fff",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div style={{ fontSize: "12px", marginTop: "3px", whiteSpace: "nowrap" }}>
            {user.name || "Edit Profile"}
          </div>
        </div>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem>
            <strong>{user.name || "Username"}</strong>
          </MenuItem>
          <MenuItem>{user.email || "user@example.com"}</MenuItem>
          <MenuItem onClick={handleLogout} style={{ color: "red" }}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
