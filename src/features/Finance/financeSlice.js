import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
 
const endpoints = {
  employees: "http://localhost:5000/employees",
  projects: "http://localhost:5002/projects",
  allocations: "http://localhost:5003/allocations",
  invoices: "http://localhost:5004/invoices"
};
 
//  Fetch employees, projects, and allocations
export const fetchFinanceData = createAsyncThunk(
  "finance/fetchAll",
  async () => {
    const [empRes, projRes, allocRes] = await Promise.all([
      axios.get(endpoints.employees),
      axios.get(endpoints.projects),
      axios.get(endpoints.allocations)
    ]);
 
    return {
      employees: empRes.data || [],
      projects: projRes.data || [],
      allocations: allocRes.data || []
    };
  }
);
 
export const generateInvoices = createAsyncThunk(
  "finance/generateInvoices",
  async (_, { getState }) => {
    const state = getState().finance;
    const { employees = [], projects = [], allocations = [] } = state;
 
    const invoices = allocations.map((alloc) => {
      const employee = employees.find((e) => e.employeeId === alloc.employeeId);
      const project = projects.find((p) => p.projectId === alloc.projectId);
      if (!employee || !project) return null;
//  everyone! here is the logic of leaves i have hardcoded it 30 days
      const workingDays = 30 - (employee.leavesTaken || 0);
      const rate = Number(project.RatePerDay || project.ratePerDay || 0);
      const total = workingDays * rate;
 
      return {
        id: `${alloc.employeeId}-${alloc.projectId}`,
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        employeeEmail: employee.email,
        projectName: project.projectName,
        projectId: project.projectId,
        clientId: alloc.clientId || null,
        workingDays,
        ratePerDay: rate,
        totalPay: total,
        allocationPercent: alloc.allocationPercent || 0,
        createdAt: new Date().toISOString()
      };
    }).filter(Boolean);
     
    const created = await Promise.all(
      invoices.map((inv) => axios.post("http://localhost:5004/invoices", inv).then(res => res.data))
    );
 
   
    return created;
 
 
  }
);
 
const financeSlice = createSlice({
  name: "finance",
  initialState: {
    employees: [],
    projects: [],
    allocations: [],
    invoices: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.projects = action.payload.projects;
        state.allocations = action.payload.allocations;
      })
      .addCase(fetchFinanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generateInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(generateInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
 
export default financeSlice.reducer;