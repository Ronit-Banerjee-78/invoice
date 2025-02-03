import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_API_URL;
// import.meta.env.VITE_API_URL || "http://localhost:8000/"; //
// Shared base query configuration
const baseQueryWithCreds = fetchBaseQuery({
  baseUrl: URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const InvoicesApi = createApi({
  reducerPath: "InvoicesApi",
  baseQuery: baseQueryWithCreds,
  tagTypes: ["invoice"],
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (token) => ({
        url: "api/invoices",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["invoice"],
    }),
    getSingleInvoice: builder.query({
      query: (id) => `api/invoices/${id}`,
      credentials: "include",
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
        body: { status },
      }),
      invalidatesTags: ["invoice"],
    }),
    updateInvoice: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `api/invoices/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["invoice"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `api/invoices/${id}`,
        method: "DELETE",
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
