// src/features/allocations/allocationsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7243/api/EngineeringManager";
const EMPLOYEE_API_URL = "https://localhost:7243/api/HR";

// ---------------- Async Thunks ----------------

// Fetch all allocations
export const fetchAllocations = createAsyncThunk(
  "allocations/fetchAllocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/allocations`);
      return response.data; // backend returns array of allocations with projectId, employeeName, clientId, roleName, allocationPercent
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch allocations.");
    }
  }
);

// Assign an employee to a project
export const assignEmployee = createAsyncThunk(
  "allocations/assignEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/assign`, {
        projectId: payload.projectId,
        employeeId: payload.employeeId,
        role: { roleName: payload.roleName },
        allocationPercent: payload.allocationPercent,
        startDate: payload.startDate,
        endDate: payload.endDate,
        billable: payload.billable ?? true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to assign employee.");
    }
  }
);

// Fetch employees for dropdown
export const fetchEmployees = createAsyncThunk(
  "allocations/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${EMPLOYEE_API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch employees.");
    }
  }
);

// Fetch roles for dropdown
export const fetchRoles = createAsyncThunk(
  "allocations/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/employees/byRoleName`);
      return response.data; // [{ roleName: "Software Engineer" }, { roleName: "QA Engineer" }]
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch roles.");
    }
  }
);

// ---------------- Slice ----------------
const allocationsSlice = createSlice({
  name: "allocations",
  initialState: {
    allocations: [],  // directly used in dashboard
    employees: [],
    roles: [],
    loading: false,
    error: null,
    newAssignment: null,
  },
  reducers: {
    clearAllocationStatus: (state) => {
      state.error = null;
      state.newAssignment = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch allocations
    builder
      .addCase(fetchAllocations.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllocations.fulfilled, (state, action) => { state.loading = false; state.allocations = action.payload; })
      .addCase(fetchAllocations.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    // Assign employee
    builder
      .addCase(assignEmployee.pending, (state) => { state.loading = true; state.error = null; state.newAssignment = null; })
      .addCase(assignEmployee.fulfilled, (state, action) => { state.loading = false; state.allocations.push(action.payload); state.newAssignment = action.payload; })
      .addCase(assignEmployee.rejected, (state, action) => { state.loading = false; state.error = action.payload; state.newAssignment = null; });

    // Fetch employees
    builder
      .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload; })
      .addCase(fetchEmployees.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    // Fetch roles
    builder
      .addCase(fetchRoles.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRoles.fulfilled, (state, action) => { state.loading = false; state.roles = action.payload; })
      .addCase(fetchRoles.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearAllocationStatus } = allocationsSlice.actions;
export default allocationsSlice.reducer;
