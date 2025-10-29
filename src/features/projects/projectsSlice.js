// src/features/projects/projectsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------------------
// Async Thunks
// ------------------------------------

// Fetch all projects (SalesManager endpoint)
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get("https://localhost:7243/api/SalesManager/projects");
    return response.data;
  }
);

// Fetch projects by client
export const fetchProjectsByClient = createAsyncThunk(
  "projects/fetchProjectsByClient",
  async (clientId) => {
    const response = await axios.get(
      `https://localhost:7243/api/SalesManager/clients/${clientId}/projects`
    );
    return response.data;
  }
);

// Add project
export const addProject = createAsyncThunk(
  "projects/addProject",
  async ({ clientId, project }) => {
    const response = await axios.post(
      `https://localhost:7243/api/SalesManager/add-project/${clientId}`,
      project
    );
    return response.data;
  }
);

// ------------------------------------
// Slice
// ------------------------------------
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
    },
    addProjectLocal: (state, action) => {
      state.projects.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchProjectsByClient
      .addCase(fetchProjectsByClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsByClient.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjectsByClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addProject
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProjects, addProjectLocal } = projectsSlice.actions;
export default projectsSlice.reducer;
