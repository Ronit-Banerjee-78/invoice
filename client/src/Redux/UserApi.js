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
    return headers;
  },
});

export const UserAuthentication = createApi({
  reducerPath: "UserAuthentication",
  baseQuery: baseQueryWithCreds,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `api/user/profile/${id}`,
      providesTags: ["user"],
    }),
    signupUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/user/signup",
        method: "POST",
        body: userCredentials,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/user/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (newUserCredentials) => ({
        url: "api/user/update-profile",
        method: "POST",
        body: newUserCredentials,
        invalidatesTags: ["user"],
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "api/user/logout",
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/user/profile/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useUpdateUserProfileMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
} = UserAuthentication;
