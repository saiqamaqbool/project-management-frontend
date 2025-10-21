import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
const INVOICE_URL = "http://localhost:5004/invoices";
 
//Fetch all invoices
export const fetchInvoices = createAsyncThunk(
  "invoice/fetchAll",
  async () => {
    const response = await axios.get(INVOICE_URL);
    return response.data || [];
  }
);
 
//Add a new invoice (used after finance calculation)
export const addInvoice = createAsyncThunk(
  "invoice/add",
  async (invoice) => {
    const response = await axios.post(INVOICE_URL, invoice);
    return response.data;
  }
);
 
//Update invoice
export const updateInvoice = createAsyncThunk(
  "invoice/update",
  async (invoice) => {
    const response = await axios.put(`${INVOICE_URL}/${invoice.id}`, invoice);
    return response.data;
  }
);
 
// Delete an invoice
export const deleteInvoice = createAsyncThunk(
  "invoice/delete",
  async (id) => {
    await axios.delete(`${INVOICE_URL}/${id}`);
    return id;
  }
);
 
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