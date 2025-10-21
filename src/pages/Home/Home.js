import React from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  { name: "Sales", color: "#9B30FF", img: "https://img.freepik.com/premium-photo/financial-advisor-digital-avatar-generative-ai_934475-9119.jpg?w=360" },
  { name: "Finance", color: "#8A2BE2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kbKOMlZMkSb0DToHVQIkAKpBRTs9jpEAjw&s"},
  { name: "Engineering", color: "#7B1FA2", img: "data:image/jpeg;base64,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"},
  { name: "HR", color: "#6A0DAD", img: "data:image/jpeg;base64,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"  },
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
