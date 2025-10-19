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
// projectsSlice.js



// src/features/projects/projectsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Thunks are exported as they are declared
export const fetchAllProjects = createAsyncThunk(
  'projects/fetchAllProjects',
  async () => {
    const response = await axios.get('https://localhost:7243/api/SalesManager/projects');
    return response.data;
  }
);

export const fetchProjectsByClient = createAsyncThunk(
  'projects/fetchProjectsByClient',
  async (clientId) => {
    const response = await axios.get(`https://localhost:7243/api/SalesManager/clients/${clientId}/projects`);
    return response.data;
  }
);

export const addProject = createAsyncThunk(
  'projects/addProject',
  async ({ clientId, project }) => {
    const response = await axios.post(
      `https://localhost:7243/api/SalesManager/add-project/${clientId}`,
      project
    );
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    loading: false,
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
    // fetchAllProjects
    builder.addCase(fetchAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchAllProjects.rejected, (state) => {
      state.loading = false;
    });

    // fetchProjectsByClient
    builder.addCase(fetchProjectsByClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProjectsByClient.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchProjectsByClient.rejected, (state) => {
      state.loading = false;
    });

    // addProject
    builder.addCase(addProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
    });
    builder.addCase(addProject.rejected, (state) => {
      state.loading = false;
    });
  },
});

// ✅ Export only slice actions and reducer
export const { clearProjects, addProjectLocal } = projectsSlice.actions;
export default projectsSlice.reducer;














