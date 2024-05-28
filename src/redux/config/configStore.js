import { configureStore } from "@reduxjs/toolkit";
import accountBookSlice from "../slices/accountBookSlice";

const store = configureStore({
  reducer: {
    AccountBook: accountBookSlice,
  },
});

export default store;
