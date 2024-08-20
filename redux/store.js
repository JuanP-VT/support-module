import { configureStore } from "@reduxjs/toolkit";
import supportReportsReducer from "./features/supportReportsSlice";
import { supportReportsApi } from "./api/supportReportsApi";

export const store = configureStore({
  reducer: {
    [supportReportsApi.reducerPath]: supportReportsApi.reducer,
    supportReports: supportReportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supportReportsApi.middleware),
});
