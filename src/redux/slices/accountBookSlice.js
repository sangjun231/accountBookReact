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
      const monthIndex = state.monthData.findIndex(
        (month) => month.id === monthId
      );
      if (monthIndex !== -1) {
        const textIndex = state.monthData[monthIndex].texts.findIndex(
          (t) => t.id === text.id
        );
        if (textIndex !== -1) {
          state.monthData[monthIndex].texts[textIndex] = text;
        } else {
          state.monthData[monthIndex].texts.push(text);
        }
      }
    },
    deleteText: (state, action) => {
      const { monthId, textId } = action.payload;
      const monthIndex = state.monthData.findIndex(
        (month) => month.id === monthId
      );
      if (monthIndex !== -1) {
        state.monthData[monthIndex].texts = state.monthData[
          monthIndex
        ].texts.filter((t) => t.id !== textId);
      }
    },
    updatedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { updatedMonthData, deleteText, updatedMonth } =
  accountBookSlice.actions;
export default accountBookSlice.reducer;
export { initMonthData };
