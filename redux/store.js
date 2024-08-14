import { configureStore } from "@reduxjs/toolkit";
import newSupportModuleReducer from "./features/newSupportModuleSlice";

export const store = configureStore({
  reducer: {
    newSupportModule: newSupportModuleReducer,
  },
});
