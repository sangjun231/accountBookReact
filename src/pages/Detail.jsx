import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { AccountBookContext } from "../context/AccountBookContext";
import { useDispatch, useSelector } from "react-redux";
import { updatedMonthData } from "../redux/slices/accountBookSlice";

const StyledTextBox = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  border-radius: 10px;
`;

function Detail() {
  // const { monthData, setMonthData, selectedMonth } =
  //   useContext(AccountBookContext);
  const monthData = useSelector((state) => state.AccountBook.monthData);
  const selectedMonth = useSelector((state) => state.AccountBook.selectedMonth);
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const dateRef = useRef("");
  const itemRef = useRef("");
  const amountRef = useRef("");
  const descriptionRef = useRef("");

  useEffect(() => {
    let foundText = null;

    monthData.forEach((month) => {
      month.texts.forEach((text) => {
        if (text.id === id) {
          foundText = text;
        }
      });
    });

    if (foundText) {
      dateRef.current.value = foundText.date;
      itemRef.current.value = foundText.item;
      amountRef.current.value = foundText.amount;
      descriptionRef.current.value = foundText.description;
    }
  }, [id, monthData]);

  const handleSave = () => {
    const updatedText = {
      id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
    };

    const savedMonthData = monthData.map((month) => {
      return {
        ...month,
        texts: month.texts.map((text) =>
          text.id === updatedText.id ? updatedText : text
        ),
      };
    });

    dispatch(updatedMonthData({ monthId: selectedMonth, text: updatedText }));
    localStorage.setItem("monthData", JSON.stringify(savedMonthData));
    navigate("/", { state: { selectedMonth } });
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const deletedMonthData = monthData.map((month) => {
        return {
          ...month,
          texts: month.texts.filter((text) => text.id !== id),
        };
      });

      dispatch(
        updatedMonthData({ monthId: selectedMonth, text: deletedMonthData })
      );
      localStorage.setItem("monthData", JSON.stringify(deletedMonthData));
      navigate("/", { state: { selectedMonth } });
    }
  };

  return (
    <StyledTextBox>
      <h1>Detail</h1>
      <div>
        <input type="date" name="date" ref={dateRef} />
        <br />
        <input type="text" name="item" ref={itemRef} />
        <br />
        <input type="number" name="amount" ref={amountRef} />
        <br />
        <input type="text" name="description" ref={descriptionRef} />
        <br />

        <button onClick={handleSave}>수정</button>
        <button onClick={handleDelete}>삭제</button>
        <Link to="/" state={{ selectedMonth }}>
          뒤로 가기
        </Link>
      </div>
    </StyledTextBox>
  );
}

export default Detail;
