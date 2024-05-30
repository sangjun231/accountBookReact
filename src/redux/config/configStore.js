import { configureStore } from "@reduxjs/toolkit";
import accountBookSlice from "../slices/accountBookSlice";

const store = configureStore({
  reducer: {
    accountBook: accountBookSlice,
  },
});

export default store;
