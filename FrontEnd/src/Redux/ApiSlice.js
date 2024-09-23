import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:8000/";
// import.meta.env.VITE_API_URL ||
export const InvoicesApi = createApi({
  reducerPath: "InvoicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Get token from the Redux store
      console.log("Token in state:", token); // Debug token presence

      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Attach token to headers
      }
      console.log("Headers before returning:", headers);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => "api/invoices",
      providesTags: ["invoice"],
    }),
    getSingleInvoice: builder.query({
      query: (id) => `api/invoices/${id}`,
      providesTags: ["invoice"],
    }),
    addInvoice: builder.mutation({
      query: (newInvoice) => ({
        url: "api/invoices",
        method: "POST",
        body: newInvoice,
      }),
      invalidatesTags: ["invoice"],
    }),
    updateInvoiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `api/invoices/${id}`,
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: { status },
      }),
      invalidatesTags: ["invoice"],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `api/invoices/${id}`,
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: updatedData,
      }),
      invalidatesTags: ["invoice"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `api/invoices/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetSingleInvoiceQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useDeleteInvoiceMutation,
} = InvoicesApi;
