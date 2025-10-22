 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
// Using 'localhost' to resolve common certificate/CORS issues
const API_URL = "https://localhost:7243/api";
 
// ------------------------------------
// Async Thunks
// ------------------------------------
 
export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/HR`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employees.");
    }
  }
);
 
export const addEmployee = createAsyncThunk(
  "employees/add",
  async (employeePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/HR/employee`, employeePayload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add employee.");
    }
  }
);
 
// ------------------------------------
// Slice Definition
// ------------------------------------
const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
    newEmployee: null,
  },
  reducers: {
    clearEmployeeStatus: (state) => {
      state.error = null;
      state.newEmployee = null;
    },
   
    // Logic: Reducer to instantly update leaves taken/pending for one employee
    updateEmployeeLeaveCounts: (state, action) => {
      const { employeeId, leavesTaken, leavesPending } = action.payload;
      const targetId = Number(employeeId);
     
      const employee = state.employees.find(emp => Number(emp.employeeId) === targetId);
     
      if (employee) {
        employee.leavesTaken = leavesTaken;
        employee.leavesPending = leavesPending;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload; })
      .addCase(fetchEmployees.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
 
      // Add Employee
      .addCase(addEmployee.pending, (state) => { state.loading = true; state.error = null; state.newEmployee = null; })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
        state.newEmployee = action.payload;
      })
      .addCase(addEmployee.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.newEmployee = null; });
  },
});
 
export const { clearEmployeeStatus, updateEmployeeLeaveCounts } = employeesSlice.actions;
export default employeesSlice.reducer;