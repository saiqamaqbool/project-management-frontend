import React, { useState } from "react";

const AddClientForm = ({ onSubmit, closeForm }) => {
  const [client, setClient] = useState({ clientId: "", clientName: "", clientEmail: "" });

  const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(client); // Dispatch Redux action
    setClient({ clientId: "", clientName: "", clientEmail: "" }); // Clear form
    closeForm(); // Close form
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add Client</h2>
      <input name="clientId" value={client.clientId} onChange={handleChange} placeholder="Client ID" required style={inputStyle} />
      <input name="clientName" value={client.clientName} onChange={handleChange} placeholder="Client Name" required style={inputStyle} />
      <input name="clientEmail" value={client.clientEmail} onChange={handleChange} placeholder="Client Email" type="email" required style={inputStyle} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button type="submit" style={submitBtn}>Add Client</button>
        <button type="button" onClick={closeForm} style={cancelBtn}>Cancel</button>
      </div>
    </form>
  );
};

export default AddClientForm;

// Styles
const formStyle = { background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)", minWidth: "350px" };
const inputStyle = { width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" };
const submitBtn = { background: "#4CAF50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "8px", cursor: "pointer" };
const cancelBtn = { background: "#ccc", color: "#333", padding: "10px 15px", border: "none", borderRadius: "8px", cursor: "pointer" };
