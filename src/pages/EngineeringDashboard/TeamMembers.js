// src/pages/EngineeringDashboard/TeamMembers.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";
import { ChevronRight, ChevronDown } from "lucide-react";

import {
  fetchProjects,
  fetchProjectsByClient,
} from "../../features/projects/projectsSlice";
import {
  fetchClients
} from "../../features/clients/clientsSlice";
import {
  fetchAllocations,
  fetchEmployees
} from "../../features/allocation/allocationsSlice";

const TeamMembers = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projects || {});
  const { clients } = useSelector((state) => state.clients || {});
  const { employees, allocations } = useSelector((state) => state.allocations || {});
  
  const [expandedProjects, setExpandedProjects] = useState([]);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
    dispatch(fetchEmployees());
    dispatch(fetchAllocations());
  }, [dispatch]);

  // Toggle expand/collapse per project
  const toggleExpand = (projectId) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Build project tree with assignments
  const projectTree = projects.map((project) => {
    const client = clients.find((c) => c.clientId === project.clientId);
    const assignedAllocations = allocations.filter(
      (a) => Number(a.projectId) === Number(project.projectId)
    );

    const assignedEmployees = assignedAllocations.map((alloc) => {
      const emp = employees.find((e) => Number(e.employeeId) === Number(alloc.employeeId)) || {};
      return {
        name: emp.firstName ? `${emp.firstName} ${emp.lastName}` : "Unknown",
        role: alloc.role?.roleName || "Unknown",
        allocationPercent: alloc.allocationPercent || 0,
      };
    });

    return {
      ...project,
      clientName: client?.clientName || "Unknown",
      assignedEmployees,
    };
  });

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1, marginLeft: "0px" }}>
        <Navbar />
        <div style={{ padding: "20px", background: "#F5F5F5", minHeight: "90vh" }}>
          <h2 style={{ color: "#673AB7", marginBottom: "20px" }}>Team Members</h2>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>
            {projectTree.map((project) => {
              const isExpanded = expandedProjects.includes(project.projectId);
              return (
                <div key={project.projectId} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    onClick={() => toggleExpand(project.projectId)}
                  >
                    {isExpanded ? <ChevronDown size={18} color="#673AB7" /> : <ChevronRight size={18} color="#673AB7" />}
                    <span style={{ fontWeight: "bold", marginLeft: "8px" }}>{project.projectName}</span>
                  </div>

                  {isExpanded && (
                    <div style={{ marginLeft: "25px", marginTop: "5px" }}>
                      <p><strong>Client:</strong> {project.clientName}</p>
                      <p><strong>Description:</strong> {project.projectDescription || "No description"}</p>
                      <ul style={{ marginTop: "5px" }}>
                        {project.assignedEmployees.length === 0 ? (
                          <li style={{ color: "gray" }}>No employees assigned</li>
                        ) : (
                          project.assignedEmployees.map((emp, idx) => (
                            <li key={idx}>
                              {emp.name} <span style={{
                                background: "#EDE7F6",
                                color: "#4A148C",
                                padding: "2px 6px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                marginLeft: "6px"
                              }}>{emp.role}</span> - {emp.allocationPercent}%
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
