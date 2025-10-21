import React from "react";
 
const Navbar = ({ user }) => {
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
        // borderRadius: "0 0 20px 20px",
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
        <div style={{ textAlign: "center" }}>
          <img
            src={user?.profilePic || "https://img.freepik.com/premium-photo/financial-advisor-digital-avatar-generative-ai_934475-9119.jpg?w=360"}
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
            Edit Profile
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
 