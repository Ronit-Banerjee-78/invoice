import { configureStore } from "@reduxjs/toolkit";
import { InvoicesApi } from "./ApiSlice";
import { UserAuthentication } from "./UserSlice";

export const store = configureStore({
  reducer: {
    [InvoicesApi.reducerPath]: InvoicesApi.reducer,
    [UserAuthentication.reducerPath]: UserAuthentication.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      InvoicesApi.middleware,
      UserAuthentication.middleware,
    ]),
});
