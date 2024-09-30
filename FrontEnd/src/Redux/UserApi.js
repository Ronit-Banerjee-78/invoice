import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:8000/";

export const UserAuthentication = createApi({
  reducerPath: "UserAuthentication",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
  }),
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
        credentials: "include",
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/user/login",
        method: "POST",
        body: userCredentials,
        credentials: "include",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (newUserCredentials) => ({
        url: "api/user/update-profile",
        method: "POST",
        body: newUserCredentials,
        // credentials: "include",
        invalidatesTags: ["user"],
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "api/user/logout",
        method: "POST",
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
} = UserAuthentication;
