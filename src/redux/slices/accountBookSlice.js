import { createSlice } from "@reduxjs/toolkit";

const initMonthData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  month: `${i + 1}월`,
  texts: [],
}));

const initialState = {
  monthData: initMonthData,
  selectedMonth: 1,
};

const accountBookSlice = createSlice({
  initialState,
  name: "accountBook",
  reducers: {
    updatedMonthData: (state, action) => {
      const { monthId, text } = action.payload;
      const month = state.monthData.find((month) => month.id === monthId);
      if (month) {
        month.texts = [...month.texts.filter((t) => t.id !== text.id), text];
      }
    },
    deletedMonthData: (state, action) => {
      const { monthId, textId } = action.payload;
      const month = state.monthData.find((month) => month.id === monthId);
      console.log(month);
      if (month) {
        month.texts = month.texts.filter((t) => t.id !== textId);
        console.log(month);
      }
    },
    updatedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { updatedMonthData, deletedMonthData, updatedMonth } =
  accountBookSlice.actions;
export default accountBookSlice.reducer;
export { initMonthData };
