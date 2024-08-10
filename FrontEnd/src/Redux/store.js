import { configureStore } from '@reduxjs/toolkit';
import { InvoicesApi } from './ApiSlice';

export const store = configureStore({
    reducer: {
        [InvoicesApi.reducerPath]: InvoicesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(InvoicesApi.middleware),
});
