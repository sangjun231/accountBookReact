import BoxContainer from "../components/BoxContainer";
import AccountBookForm from "../components/AccountBookForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updatedMonthData } from "../redux/slices/accountBookSlice";
import { initMonthData } from "../redux/slices/accountBookSlice";

const Home = () => {
  const monthData = useSelector((state) => state.AccountBook.monthData);
  const selectedMonth = useSelector((state) => state.AccountBook.selectedMonth);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedMonthData =
      JSON.parse(localStorage.getItem("monthData")) || initMonthData;

    storedMonthData.forEach((month) => {
      month.texts.forEach((text) => {
        dispatch(updatedMonthData({ monthId: month.id, text }));
      });
    });
  }, [dispatch]);

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
      <AccountBookForm />
      <BoxContainer />
    </div>
  );
};

export default Home;
