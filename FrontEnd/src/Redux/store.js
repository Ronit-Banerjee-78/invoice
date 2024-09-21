import { configureStore } from "@reduxjs/toolkit";
import { InvoicesApi } from "./ApiSlice";
import UserSlice from "./UserSlice";
import { UserAuthentication } from "./UserApi";

export const store = configureStore({
  reducer: {
    [InvoicesApi.reducerPath]: InvoicesApi.reducer,
    auth: UserSlice,
    [UserAuthentication.reducerPath]: UserAuthentication.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      InvoicesApi.middleware,
      UserAuthentication.middleware,
    ]),
});
