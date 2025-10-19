import React, { useState } from "react";
import axios from "axios";

const AddClientForm = ({ onSubmit, closeForm }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:7243/api/SalesManager/add-client",
        formData
      );
      if (response.status === 200) {
        onSubmit(response.data);
        closeForm();
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(err.response.data.message || "Client already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginBottom: "10px" }}>Add Client</h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      <input
        type="text"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        placeholder="Client Name"
        required
        style={inputStyle}
      />

      <input
        type="email"
        name="clientEmail"
        value={formData.clientEmail}
        onChange={handleChange}
        placeholder="Client Email"
        required
        style={inputStyle}
      />

      <div style={buttonContainer}>
        <button type="submit" style={submitBtn}>Add</button>
        <button type="button" onClick={closeForm} style={cancelBtn}>Cancel</button>
      </div>
    </form>
  );
};

export default AddClientForm;

// 🎨 Styles
const formStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  minWidth: "350px",
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "space-between",
};

const submitBtn = {
  background: "#4CAF50",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#ccc",
  color: "#333",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
