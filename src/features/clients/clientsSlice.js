// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api'; // replace with backend

// export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
//   const response = await axios.get(`${BASE_URL}/clients`);
//   return response.data;
// });

// export const addClient = createAsyncThunk('clients/addClient', async (clientData) => {
//   const response = await axios.post(`${BASE_URL}/clients`, clientData);
//   return response.data;
// });

// const clientsSlice = createSlice({
//   name: 'clients',
//   initialState: { clients: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchClients.pending, (state) => { state.loading = true; })
//       .addCase(fetchClients.fulfilled, (state, action) => { state.loading = false; state.clients = action.payload; })
//       .addCase(fetchClients.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
//   },
// });

// export default clientsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all clients
export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const response = await axios.get("http://localhost:5001/clients");
  return response.data;
});

// Add a new client
export const addClient = createAsyncThunk("clients/add", async (client) => {
  const response = await axios.post("http://localhost:5001/clients", client);
  return response.data;
});

const clientsSlice = createSlice({
  name: "clients",
  initialState: { clients: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => { state.loading = true; })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state) => { state.loading = false; })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      });
  },
});

export default clientsSlice.reducer;
// export { fetchClients, addClient };

