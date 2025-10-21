import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiDollarSign, FiCpu, FiBriefcase, FiPlus, FiSettings, FiHelpCircle } from "react-icons/fi";

const Sidebar = ({ role, onAddEmployee, onAddClient, onAddProject }) => {
  let menuItems = [];

  switch (role) {
    case "sales":
      menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
        { name: "Add Client", icon: <FiUser />, action: () => onAddClient && onAddClient() },
      ];
      break;

    case "finance":
      menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
        { name: "Invoices", icon: <FiDollarSign />, path: "/invoices" },
        { name: "Project Payments", icon: <FiDollarSign />, path: "/payments" },
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
        { name: "Add Employee", icon: <FiPlus />, action: () => onAddEmployee && onAddEmployee() },
      ];
      break;

    default:
      menuItems = [{ name: "Dashboard", icon: <FiHome />, path: "/dashboard" }];
  }

  // Add extra creative items to all roles
  const extraItems = [
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
    { name: "Help", icon: <FiHelpCircle />, path: "/help" },
  ];

  menuItems = [...menuItems, ...extraItems];

  return (
    <div
      style={{
        width: "200px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #6A0DAD, #8A2BE2)",
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
        {menuItems.map((item) => (
          <li key={item.name} style={{ marginBottom: "20px" }}>
            {item.path ? (
              <Link
                to={item.path}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  borderRadius: "12px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {item.icon} <span>{item.name}</span>
              </Link>
            ) : (
              <div
                onClick={item.action}
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 15px",
                  borderRadius: "12px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {item.icon} <span>{item.name}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
