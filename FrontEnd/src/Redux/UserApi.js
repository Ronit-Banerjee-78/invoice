import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:8000/";

export const UserAuthentication = createApi({
  reducerPath: "UserAuthentication",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
  }),
  endpoints: (builder) => ({
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
  }),
});

export const { useSignupUserMutation, useLoginUserMutation } =
  UserAuthentication;
