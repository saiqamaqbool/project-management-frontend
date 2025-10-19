import React, { useState } from "react";
 
// Assuming 'user' prop contains: { userName, email, userRole, profilePic }
const Navbar = ({ user }) => {
    // 🚀 State to toggle the visibility of the profile details dropdown
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
 
    // Placeholder data if the user object is not fully populated (for testing)
    const defaultUser = {
        userName: "Guest",
        email: "guest@pms.com",
        userRole: "Viewer",
        profilePic: "https://via.placeholder.com/50",
    };
 
    // Use actual user data if available, otherwise use default
    const currentUser = user || defaultUser;
 
    const toggleProfileDropdown = () => {
        setShowProfileDropdown(prev => !prev);
    };
 
    // --------------------------------------------------------------------
    // STYLES
    // --------------------------------------------------------------------
    const profileContainerStyle = {
        // Make the whole profile area clickable and styled like a button
        cursor: "pointer",
        padding: "5px 10px",
        borderRadius: "10px",
        transition: "background-color 0.2s",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        position: "relative", // Crucial for positioning the dropdown
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };
 
    const dropdownStyle = {
        position: "absolute",
        top: "75px", // Position below the Navbar
        right: "20px",
        background: "#fff",
        color: "#333",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
        width: "250px",
        textAlign: "left",
    };
 
    const infoTextStyle = {
        margin: "5px 0",
        fontSize: "14px",
    };
 
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
 
            {/* Right: Profile Section (Clickable) */}
            <div
                onClick={toggleProfileDropdown}
                // Use a standard div wrapper here since we can't use ':hover' in inline styles
                style={profileContainerStyle}
                // Optional: Use onMouseEnter/onMouseLeave for hover effect if desired
            >
                {/* Profile Image */}
                <img
                    src={currentUser.profilePic || "https://via.placeholder.com/50"}
                    alt="Profile"
                    style={{
                        width: "40px", // Slightly smaller image
                        height: "40px",
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        objectFit: "cover",
                        display: "block",
                    }}
                />
               
                {/* 🚀 User Name (Replaces "Edit Profile") */}
                <div
                    style={{
                        fontSize: "16px", // Larger font size for name
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        marginRight: "5px",
                    }}
                >
                    Hello, {currentUser.userName.split(' ')[0]}
                </div>
 
                {/* 🚀 Profile Dropdown/Details Modal */}
                {showProfileDropdown && (
                    <div style={dropdownStyle}>
                        <h4 style={{ color: "#8A2BE2", margin: "0 0 10px 0", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Profile Details</h4>
                       
                        <p style={infoTextStyle}>
                            <strong>Name:</strong> {currentUser.userName}
                        </p>
                        <p style={infoTextStyle}>
                            <strong>Email:</strong> {currentUser.email}
                        </p>
                        <p style={infoTextStyle}>
                            <strong>Role:</strong> {currentUser.userRole}
                        </p>
                        <hr style={{ margin: "10px 0", border: "0", borderTop: "1px solid #eee" }}/>
                        <button
                            // In a real app, this would dispatch a LOGOUT action
                            style={{ width: '100%', padding: '8px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the dropdown from immediately closing
                                alert('Logging out...'); // Replace with actual logout logic
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
 
export default Navbar;