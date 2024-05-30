import styled from "styled-components";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updatedMonthData } from "../redux/slices/accountBookSlice";

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const AccountBookForm = () => {
  const selectedMonth = useSelector((state) => state.accountBook.selectedMonth);
  const dispatch = useDispatch();

  const onAdd = (text) => {
    dispatch(updatedMonthData({ monthId: selectedMonth, text }));
  };

  const getDefaultDate = (month) => {
    const year = new Date().getFullYear();
    const monthString = month < 10 ? `0${month}` : month;
    return `${year}-${monthString}-01`;
  };

  // 여기도 reducer로 관리 할 수 없을까?
  const [formData, setFormData] = useState({
    date: getDefaultDate(selectedMonth),
    item: "",
    amount: "",
    description: "",
  });

  const validateForm = () => {
    const { date, item, amount, description } = formData;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const amountRegex = /^\d+(\.\d{1,2})?$/;

    if (!date || !item || !amount || !description) {
      alert("빈 칸을 채워주세요.");
      return false;
    }

    if (!dateRegex.test(date)) {
      alert("날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.");
      return false;
    }

    if (!amountRegex.test(amount)) {
      alert("금액에는 숫자를 입력해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAdd({ id: uuidv4(), ...formData });
      setFormData({
        date: getDefaultDate(selectedMonth),
        item: "",
        amount: "",
        description: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      date: getDefaultDate(selectedMonth),
    }));
  }, [selectedMonth]);

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
        />
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          placeholder="지출 항목"
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="지출 금액"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="지출 내용"
        />
        <button type="submit">저장</button>
      </form>
    </FormWrapper>
  );
};

export default AccountBookForm;
