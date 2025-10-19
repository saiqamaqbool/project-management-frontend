import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../features/projects/projectsSlice';
import { fetchEmployees } from '../../features/employees/employeesSlice';
import Sidebar from '../../components/Layout/Sidebar';
import Navbar from '../../components/Layout/Navbar';
import { toast } from 'react-toastify';

const EngineeringDashboard = () => {
  const dispatch = useDispatch();
  const { projects, loading: projectsLoading } = useSelector((state) => state.projects);
  const { employees, loading: employeesLoading } = useSelector((state) => state.employees);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [allocationPercent, setAllocationPercent] = useState('');

  useEffect(() => {
    dispatch(fetchAllProjects()); // ✅ updated
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAllocate = () => {
    if (!selectedProject || !selectedEmployee || !allocationPercent) {
      toast.error('Please select project, employee, and enter allocation %');
      return;
    }

    toast.success(`Allocated ${allocationPercent}% of ${selectedEmployee} to ${selectedProject.name}`);
    setSelectedEmployee('');
    setAllocationPercent('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role="engineering" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: '20px', background: '#F5F5F5', minHeight: '90vh' }}>
          <h2>Engineering Manager Dashboard</h2>

          {projectsLoading || employeesLoading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h3>Select Project</h3>
                <select
                  onChange={(e) => {
                    const proj = projects.find((p) => p.id === parseInt(e.target.value));
                    setSelectedProject(proj);
                  }}
                  defaultValue=""
                  style={{ padding: '8px', width: '250px', borderRadius: '5px' }}
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProject && (
                <>
                  <h3>Allocate Employees to: {selectedProject.name}</h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <select
                      value={selectedEmployee}
                      onChange={(e) => setSelectedEmployee(e.target.value)}
                      style={{ padding: '8px', width: '200px', borderRadius: '5px' }}
                    >
                      <option value="">-- Select Employee --</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.name}>
                          {emp.name} ({emp.role})
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={allocationPercent}
                      onChange={(e) => setAllocationPercent(e.target.value)}
                      placeholder="% Allocation"
                      style={{ padding: '8px', width: '150px', borderRadius: '5px' }}
                    />

                    <button
                      onClick={handleAllocate}
                      style={{
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Allocate
                    </button>
                  </div>

                  <div style={{ marginTop: '30px' }}>
                    <h4>Currently Assigned Employees (mock view)</h4>
                    <ul>
                      {employees.slice(0, 3).map((emp) => (
                        <li key={emp.id}>
                          {emp.name} — QA / Dev / {emp.role} (example)
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngineeringDashboard;
