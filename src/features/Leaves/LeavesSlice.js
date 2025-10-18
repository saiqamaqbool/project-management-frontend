import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // replace with your backend

// Fetch leaves for all employees
export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async () => {
  const response = await axios.get(`${BASE_URL}/leaves`);
  return response.data;
});

// Adjust leave for an employee
export const adjustLeave = createAsyncThunk('leaves/adjustLeave', async ({ employeeId, leaveData }) => {
  const response = await axios.put(`${BASE_URL}/leaves/${employeeId}`, leaveData);
  return response.data;
});

const leavesSlice = createSlice({
  name: 'leaves',
  initialState: {
    leaves: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => { state.loading = true; })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(adjustLeave.fulfilled, (state, action) => {
        const index = state.leaves.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.leaves[index] = action.payload;
        }
      });
  },
});

export default leavesSlice.reducer;
