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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch allocations."
      );
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
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign employee."
      );
    }
  }
);

// Fetch employees
export const fetchEmployees = createAsyncThunk(
  "allocations/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${EMPLOYEE_API_URL}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employees."
      );
    }
  }
);

// ---------------- Slice ----------------
const allocationsSlice = createSlice({
  name: "allocations",
  initialState: {
    allocations: [],
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

    // ✅ NEW: Clear allocations when user logs out
    clearAllocations: (state) => {
      state.allocations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllocations.fulfilled, (state, action) => {
        state.loading = false;
        state.allocations = action.payload;
      })
      .addCase(fetchAllocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.allocations.push(action.payload);
        state.newAssignment = action.payload;
      })
      .addCase(assignEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.newAssignment = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      });
  },
});

// ✅ Export new clearAllocations action
export const { clearAllocationStatus, clearAllocations } = allocationsSlice.actions;

export default allocationsSlice.reducer;
