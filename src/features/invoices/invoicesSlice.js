import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://localhost:7243/api/Finance";

// 🔹 Fetch all projects and their assignments together
export const fetchInvoices = createAsyncThunk("invoice/fetchAll", async () => {
  try {
    // Step 1: Fetch all projects
    const projectResponse = await axios.get(`${BASE_URL}/Projects`);
    const projects = projectResponse.data || [];

    // Step 2: For each project, get its assignments
    const allAssignments = await Promise.all(
      projects.map(async (project) => {
        try {
          const assignResponse = await axios.get(
            `${BASE_URL}/projects/${project.projectId}/assignments`
          );
          // Combine project + assignment info for dashboard
          return assignResponse.data.map((a) => ({
            projectId: project.projectId,
            projectName: project.projectName,
            description: project.description,
            startDate: project.startDate,
            endDate: project.endDate,
            dailyRate: project.dailyRate,
            ...a,
          }));
        } catch {
          return []; // in case some projects have no assignments
        }
      })
    );

    // Step 3: Flatten all assignment arrays into one
    return allAssignments.flat();
  } catch (error) {
    throw error.response?.data || "Failed to fetch invoices/projects";
  }
});

// (Optional placeholder for adding/updating invoices)
export const addInvoice = createAsyncThunk("invoice/add", async (invoice) => {
  const response = await axios.post(`${BASE_URL}/invoices`, invoice);
  return response.data;
});

export const updateInvoice = createAsyncThunk(
  "invoice/update",
  async (invoice) => {
    const response = await axios.put(`${BASE_URL}/invoices/${invoice.id}`, invoice);
    return response.data;
  }
);

export const deleteInvoice = createAsyncThunk("invoice/delete", async (id) => {
  await axios.delete(`${BASE_URL}/invoices/${id}`);
  return id;
});

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchInvoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // add/update/delete (unchanged)
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.invoices.push(action.payload);
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const idx = state.invoices.findIndex(
          (inv) => inv.id === action.payload.id
        );
        if (idx !== -1) state.invoices[idx] = action.payload;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (inv) => inv.id !== action.payload
        );
      });
  },
});

export default invoiceSlice.reducer;
