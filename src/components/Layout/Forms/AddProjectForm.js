
import React, { useState } from "react";

const AddProjectForm = ({ onSubmit, closeForm }) => {
  const [project, setProject] = useState({ projectId: "", projectName: "", projectDescription: "", startDate: "", endDate: "" });

  const handleChange = (e) => setProject({ ...project, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(project); // Dispatch Redux action
    setProject({ projectId: "", projectName: "", projectDescription: "", startDate: "", endDate: "" }); // Clear form
    closeForm(); // Close form
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add Project</h2>
      <input name="projectId" value={project.projectId} onChange={handleChange} placeholder="Project ID" required style={inputStyle} />
      <input name="projectName" value={project.projectName} onChange={handleChange} placeholder="Project Name" required style={inputStyle} />
      <textarea name="projectDescription" value={project.projectDescription} onChange={handleChange} placeholder="Project Description" required style={textAreaStyle} />
      <input name="startDate" type="date" value={project.startDate} onChange={handleChange} required style={inputStyle} />
      <input name="endDate" type="date" value={project.endDate} onChange={handleChange} required style={inputStyle} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button type="submit" style={submitBtn}>Add Project</button>
        <button type="button" onClick={closeForm} style={cancelBtn}>Cancel</button>
      </div>
    </form>
  );
};

export default AddProjectForm;

// Styles
const formStyle = { background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)", minWidth: "350px" };
const inputStyle = { width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" };
const textAreaStyle = { width: "100%", height: "80px", marginBottom: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" };
const submitBtn = { background: "#4CAF50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "8px", cursor: "pointer" };
const cancelBtn = { background: "#ccc", color: "#333", padding: "10px 15px", border: "none", borderRadius: "8px", cursor: "pointer" };
