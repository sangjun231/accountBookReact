import { createSlice } from "@reduxjs/toolkit";

const initMonthData = [];

// 배열 반복문으로 개선하기
for (let i = 1; i <= 12; i++) {
  initMonthData.push({ id: i, month: `${i}월`, texts: [] });
}

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
      const month = state.monthData.findIndex((month) => month.id === monthId);
      if (month) {
        month.texts.push(text);
      }
    },
    updatedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { updatedMonthData, updatedMonth } = accountBookSlice.actions;
export default accountBookSlice.reducer;
export { initMonthData };
