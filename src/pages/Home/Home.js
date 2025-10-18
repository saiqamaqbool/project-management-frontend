import React from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  { name: "Sales", color: "#9B30FF", img: "https://via.placeholder.com/100?text=Sales" },
  { name: "Finance", color: "#8A2BE2", img: "https://via.placeholder.com/100?text=Finance" },
  { name: "Engineering", color: "#7B1FA2", img: "https://via.placeholder.com/100?text=Eng" },
  { name: "HR", color: "#6A0DAD", img: "https://via.placeholder.com/100?text=HR" },
];

const Home = ({ setRole }) => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setRole(role.toLowerCase());
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Banner Section */}
      {/* <div
        style={{
          width: "100%",
          height: "200px",
          backgroundImage: "url('https://via.placeholder.com/1200x200?text=Company+Banner')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "36px", fontWeight: "700", textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}>
          Welcome to Project Management
        </h1>
      </div>

      {/* Main Content */}
    <div
  style={{
    width: "100%",
    height: "200px",
    backgroundImage: "url(/images/banner.png)", // <-- note the leading slash
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <h1 style={{
    color: "#fff",
    fontSize: "36px",
    fontWeight: "700",
    textShadow: "2px 2px 6px rgba(0,0,0,0.5)"
  }}>
    Welcome to Project Management
  </h1>
</div>
<div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px 20px",
        }}
      >
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
              onClick={() => handleSelect(r.name)}
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
                e.currentTarget.style.boxShadow = "0px 10px 25px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0px 5px 15px rgba(0,0,0,0.2)";
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
