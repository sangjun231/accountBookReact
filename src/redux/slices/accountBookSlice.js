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
      // state.monthData.findIndex((id) => id === selectedMonth);
      // state.selectedMonth;
      // state.monthData.texts([...month.texts, text]);
    },
    updatedMonth: (state, action) => {
      // selectedMonth(2)
      state.selectedMonth = action.payload;
    },
  },
});

export const { updatedMonthData, updatedMonth } = accountBookSlice.actions;
export default accountBookSlice.reducer;
