import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure "/react" is included here!

const URL = import.meta.env.VITE_API_URL || "http://localhost:8000/";

export const UserAuthentication = createApi({
  reducerPath: "UserAuthentication",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/user/signup", // Adjust to match your actual endpoint
        method: "POST",
        body: userCredentials,
      }),
    }),
    loginUser: builder.mutation({
      query: (userCredentials) => ({
        url: "api/user/login", // Adjust to match your actual endpoint
        method: "POST",
        body: userCredentials,
      }),
    }),
  }),
});

export const { useSignupUserMutation, useLoginUserMutation } =
  UserAuthentication;
