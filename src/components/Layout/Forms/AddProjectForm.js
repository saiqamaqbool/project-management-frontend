import React, { useState } from "react";

const AddProjectForm = ({ onSubmit, closeForm }) => {
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    dailyRate: "",
  });

  const handleChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert startDate and endDate to full ISO strings
    const startISO = project.startDate ? new Date(project.startDate).toISOString() : null;
    const endISO = project.endDate ? new Date(project.endDate).toISOString() : null;

    const payload = {
      ...project,
      startDate: startISO,
      endDate: endISO,
      dailyRate: project.dailyRate ? parseFloat(project.dailyRate) : null,
    };

    await onSubmit(payload);

    // Reset form
    setProject({
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      dailyRate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add Project</h2>

      <input
        name="projectName"
        value={project.projectName}
        onChange={handleChange}
        placeholder="Project Name"
        required
        style={inputStyle}
      />

      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="Project Description"
        required
        style={textAreaStyle}
      />

      <input
        name="startDate"
        type="date"
        value={project.startDate}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="endDate"
        type="date"
        value={project.endDate}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        name="dailyRate"
        type="number"
        value={project.dailyRate}
        onChange={handleChange}
        placeholder="Daily Rate (optional)"
        style={inputStyle}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button type="submit" style={submitBtn}>
          Add Project
        </button>
        <button type="button" onClick={closeForm} style={cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;

const formStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  minWidth: "350px",
  marginBottom: "20px",
};
const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const textAreaStyle = {
  width: "100%",
  height: "80px",
  marginBottom: "10px",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const submitBtn = {
  background: "#FF9800",
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
