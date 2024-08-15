import { configureStore } from "@reduxjs/toolkit";
import newSupportModuleReducer from "./features/newSupportModuleSlice";
import { supportModuleApi } from "./api/supportModuleApi";

export const store = configureStore({
  reducer: {
    [supportModuleApi.reducerPath]: supportModuleApi.reducer,
    newSupportModule: newSupportModuleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supportModuleApi.middleware),
});
