import { configureStore } from "@reduxjs/toolkit";
import { InvoicesApi } from "./ApiSlice";
import UserSlice from "./UserSlice";
import { UserAuthentication } from "./UserApi";
import { setupListeners } from "@reduxjs/toolkit/query";

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

setupListeners(store.dispatch);
