import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({ name: "", email: "", profilePic: "" });
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // ✅ Clear storage & redirect to home
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/"); // ✅ Navigate to Home Dashboard
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    // ✅ Assign images based on role (from Home dashboard)
    const roleImages = {
      sales: "/images/Sales.jpg",
      finance: "/images/Finance.jpg",
      engineering: "/images/Engineering.jpg",
      hr: "/images/HR.jpg",
    };

    // ✅ Assign default email pattern
    const email = name ? `${name.toLowerCase().replace(" ", ".")}@abstract-group.com` : "user@abstract-group.com";

    setUser({
      name: name || "User",
      email,
      profilePic: roleImages[role?.toLowerCase()] || "/images/HR.jpg",
    });
  }, []);

  return (
    <div
      style={{
        height: "70px",
        width: "100%",
        background: "#b68cddff",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxHeight: "70px",
        }}
      >
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={handleMenuOpen}
        >
          <img
            src={user.profilePic}
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
          <div
            style={{
              fontSize: "12px",
              marginTop: "3px",
              whiteSpace: "nowrap",
            }}
          >
            {/* {user.name} */}
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
            <strong>{user.name}</strong>
          </MenuItem>
          <MenuItem>{user.email}</MenuItem>
          <MenuItem
            onClick={handleLogout}
            style={{ color: "red", fontWeight: "600" }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
