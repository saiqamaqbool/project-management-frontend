import React from "react";
import { Link } from "react-router-dom";
// FiPlus is good for both Add Employee and Apply Leave
import { FiHome, FiUser, FiDollarSign, FiCpu, FiBriefcase, FiPlus, FiCalendar } from "react-icons/fi";

// 1. ACCEPT THE NEW PROP: onApplyLeave
const Sidebar = ({ role, onAddEmployee, onAddClient, onAddProject, onApplyLeave }) => {
  let menuItems = [];

  switch (role) {
    case "sales":
      menuItems = [
        { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
        {
          name: "Add Project",
          icon: <FiBriefcase />,
          action: () => onAddProject && onAddProject(),
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

        // 2. MODIFIED: "Leave Management" is now an ACTION item
        // This will display the LeaveApplicationForm in the dashboard
        {
          name: "Apply for Leave",
          icon: <FiCalendar />, // Changed icon for clarity
          action: () => onApplyLeave && onApplyLeave(),
        },

        {
          name: "Add Employee",
          icon: <FiPlus />,
          action: () => onAddEmployee && onAddEmployee(),
        },
        // We can optionally keep the management link if needed, but it's redundant with the button
        // { name: "Leave Management", icon: <FiUser />, path: "/leaves" },
      ];
      break;

    default:
      menuItems = [{ name: "Dashboard", icon: <FiHome />, path: "/dashboard" }];
  }

  return (
    <div
      style={{
        width: "250px",
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
            {/* Renders as a Link if 'path' exists */}
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
              // Renders as an actionable Div if 'action' exists
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