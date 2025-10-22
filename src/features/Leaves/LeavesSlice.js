
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
const API_URL = 'https://localhost:7243/api';
 
// ------------------------------------
// Async Thunks
// ------------------------------------
 
// 🚀 UPDATED THUNK: POST /api/HR/leave (for submitting a new leave)
export const submitLeaveApplication = createAsyncThunk(
  'leaves/submitApplication',
  async (leaveData, { rejectWithValue }) => {
    try {
      // Use the confirmed base URL for POST: /api/HR/leave
      const response = await axios.post(`${API_URL}/HR/leave`, leaveData);
      return response.data;
    } catch (error) {
      // Log the error details to help debug submission failure
      console.error("Leave Submission Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || 'Failed to submit leave application. Check backend POST route.');
    }
  }
);
 
// GET /api/HR/leave/{EmployeeId}/count
export const fetchEmployeeLeaveCount = createAsyncThunk(
  'leaves/fetchEmployeeLeaveCount',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/HR/leave/${employeeId}/count`);
      return { employeeId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leave count.');
    }
  }
);
 
// 🚀 UPDATED THUNK: GET /api/HR/leave (for the global leave table)
export const fetchAllLeaveRecords = createAsyncThunk(
    'leaves/fetchAllRecords',
    async (_, { rejectWithValue }) => {
        try {
            // Use the confirmed base URL for GET: /api/HR/leave
            const response = await axios.get(`${API_URL}/HR/leave`);
            return response.data;
        } catch (error) {
            console.error("Error fetching all leave records:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch all leave records. Check the backend connection.");
        }
    }
);
 
 
// ------------------------------------
// Slice Definition
// ------------------------------------
const leavesSlice = createSlice({
  name: 'leaves',
  initialState: {
    allLeaveRecords: [],
    loading: false,
    error: null,
    newApplication: null,
  },
  reducers: {
    clearLeaveStatus: (state) => {
      state.error = null;
      state.newApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
        // Fetch All Leave Records (GET /api/HR/leave)
        .addCase(fetchAllLeaveRecords.pending, (state) => { state.loading = true; state.error = null; })
        .addCase(fetchAllLeaveRecords.fulfilled, (state, action) => {
            state.loading = false;
            state.allLeaveRecords = action.payload;
        })
        .addCase(fetchAllLeaveRecords.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.allLeaveRecords = [];
        })
       
        // Submit Leave Application (POST /api/HR/leave)
        .addCase(submitLeaveApplication.pending, (state) => { state.loading = true; state.error = null; state.newApplication = null; })
        .addCase(submitLeaveApplication.fulfilled, (state, action) => {
            state.loading = false;
            state.newApplication = action.payload;
        })
        .addCase(submitLeaveApplication.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.newApplication = null;
        })
  },
});
 
export const { clearLeaveStatus } = leavesSlice.actions;
export default leavesSlice.reducer;