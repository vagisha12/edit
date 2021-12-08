import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSource";

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
