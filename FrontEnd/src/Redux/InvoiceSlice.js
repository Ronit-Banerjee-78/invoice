import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Invoices: [],
};

export const InvoiceSlice = createSlice({
  name: "Invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default InvoiceSlice.reducer;
