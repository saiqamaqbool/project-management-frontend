import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Use the port where your Swagger/backend is actually running
const BASE_URL = "https://localhost:7243/api/SalesManager";

// Fetch all clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/clients`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Add client with duplicate check handled by backend
export const addClient = createAsyncThunk(
  "clients/addClient",
  async (client, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-client`, client);
      return response.data;
    } catch (err) {
      if (err.response?.status === 409) {
        return rejectWithValue("Client with same name or email already exists.");
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: { clients: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchClients
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch clients";
      })

      // addClient
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.loading = false;
        // push new client to state
        state.clients.push(action.payload);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add client";
      });
  },
});

export default clientsSlice.reducer;





