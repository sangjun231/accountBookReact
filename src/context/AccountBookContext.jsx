import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const AccountBookContext = createContext(null);

export const AccountBookProvider = ({ children }) => {
  // const [monthData, setMonthData] = useState(initMonthData);
  // const [selectedMonth, setSelectedMonth] = useState(
  //   localStorage.getItem("selectedMonth")
  //     ? Number(localStorage.getItem("selectedMonth"))
  //     : 1
  // );

  const monthData = useSelector((state) => state.AccountBook.monthData);
  const selectedMonth = useSelector((state) => state.AccountBook.selectedMonth);

  useEffect(() => {
    const storedMonthData =
      JSON.parse(localStorage.getItem("monthData")) || initMonthData;

    setMonthData(storedMonthData);
  }, []);

  useEffect(() => {
    if (monthData !== initMonthData) {
      localStorage.setItem("monthData", JSON.stringify(monthData));
    }
  }, [monthData]);
  useEffect(() => {
    localStorage.setItem("selectedMonth", JSON.stringify(selectedMonth));
  }, [selectedMonth]);

  return (
    <AccountBookContext.Provider
      value={{
        monthData,
        setMonthData,
        selectedMonth,
        setSelectedMonth,
        initMonthData,
      }}
    >
      {children}
    </AccountBookContext.Provider>
  );
};
