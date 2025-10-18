// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api'; // replace with your backend

// export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
//   const response = await axios.get(`${BASE_URL}/projects`);
//   return response.data;
// });

// export const addProject = createAsyncThunk('projects/addProject', async (projectData) => {
//   const response = await axios.post(`${BASE_URL}/projects`, projectData);
//   return response.data;
// });
// export const updateProjectPaymentStatus = createAsyncThunk(
//   'projects/updatePaymentStatus',
//   async ({ projectId, paymentStatus }) => {
//     const response = await axios.put(`http://localhost:5000/api/projects/${projectId}/payment`, {
//       paymentStatus,
//     });
//     return response.data;
//   }
// );

// const projectsSlice = createSlice({
//   name: 'projects',
//   initialState: {
//     projects: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProjects.pending, (state) => { state.loading = true; })
//       .addCase(fetchProjects.fulfilled, (state, action) => {
//         state.loading = false;
//         state.projects = action.payload;
//       })
//       .addCase(fetchProjects.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default projectsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all projects
export const fetchProjects = createAsyncThunk("projects/fetch", async () => {
  const response = await axios.get("http://localhost:5002/projects");
  return response.data;
});

// Add a new project
export const addProject = createAsyncThunk("projects/add", async (project) => {
  const response = await axios.post("http://localhost:5002/projects", project);
  return response.data;
});

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projects: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => { state.loading = false; })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

export default projectsSlice.reducer;
// export { fetchProjects, addProject };
