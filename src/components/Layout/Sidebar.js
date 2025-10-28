import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiCpu,
  FiPlus,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";
import { TbCurrencyPound } from "react-icons/tb";

const Sidebar = ({ role, onAddEmployee, onAddClient, onAddProject, onDashboardClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  let menuItems = [];

  switch (role) {
    case "sales":
      menuItems = [
        {
          name: "Dashboard",
          icon: <FiHome />,
          action: () => onDashboardClick && onDashboardClick(), // ✅ Same as Back to Clients
        },
        {
          name: "Add Client",
          icon: <FiUser />,
          action: () => onAddClient && onAddClient(),
        },
      ];
      break;

    case "finance":
      menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
        { name: "Invoices", icon: <TbCurrencyPound />, path: "/invoices" },
      ];
      break;

    case "engineering":
      menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
        { name: "Project Allocation", icon: <FiCpu />, path: "/allocation" },
        { name: "Team Members", icon: <FiUser />, path: "/team" },
      ];
      break;

    case "hr":
      menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
        { name: "Leave Management", icon: <FiUser />, path: "/leaves" },
        { name: "Add Employee", icon: <FiPlus />, path: "/add-employee" },
      ];
      break;

    default:
      menuItems = [{ name: "Dashboard", icon: <FiHome />, path: "/dashboard" }];
  }

  const extraItems = [
    { name: "Logout", icon: <FiLogOut />, path: "/Logout" },
    { name: "Help", icon: <FiHelpCircle />, path: "/help" },
  ];

  menuItems = [...menuItems, ...extraItems];

  const handleClick = (item) => {
    setActive(item.path || item.name);
    if (item.path) navigate(item.path);
    else if (item.action) item.action();
  };

  return (
    <div
      style={{
        width: "200px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #c597e6ff, #7236abff)",
        color: "#fff",
        padding: "20px",
        boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "22px",
        }}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)} Panel
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map((item) => {
          const isActive = active === (item.path || item.name);
          return (
            <li key={item.name} style={{ marginBottom: "20px" }}>
              <div
                onClick={() => handleClick(item)}
                style={{
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: isActive ? "rgba(255,255,255,0.25)" : "transparent",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  !isActive &&
                  (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                  !isActive &&
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {item.icon} <span>{item.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
