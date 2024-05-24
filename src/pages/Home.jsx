import { useState, useEffect } from "react";
import BoxContainer from "../components/BoxContainer";
import AccountBookForm from "../components/AccountBookForm";

const Home = () => {
  const initMonthData = [];

  for (let i = 1; i <= 12; i++) {
    initMonthData.push({ id: i, month: `${i}월`, texts: [] });
  }

  const [monthData, setMonthData] = useState(initMonthData);
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth")
      ? Number(localStorage.getItem("selectedMonth"))
      : 1
  );

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
    <div>
      <h1>Home</h1>
      <AccountBookForm
        setMonthData={setMonthData}
        selectedMonth={selectedMonth}
      />
      <BoxContainer
        monthData={monthData}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  );
};

export default Home;
