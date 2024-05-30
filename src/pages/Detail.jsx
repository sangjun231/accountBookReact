import styled from "styled-components";
import { useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updatedMonthData,
  deletedMonthData,
} from "../redux/slices/accountBookSlice";

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
  const monthData = useSelector((state) => state.accountBook.monthData);
  const selectedMonth = useSelector((state) => state.accountBook.selectedMonth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const dateRef = useRef("");
  const itemRef = useRef("");
  const amountRef = useRef("");
  const descriptionRef = useRef("");

  const handleSave = () => {
    const updatedText = {
      id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
    };
    dispatch(updatedMonthData({ monthId: selectedMonth, text: updatedText }));
    navigate("/", { state: { selectedMonth } });
  };

  // 내부 로직을 위 수정처럼 간략히하고 싶은데 그러면 이상하게 로컬 반영이안됨
  // useEffect를 사용해보았지만 디테일 페이지로 넘어오면 실행되고
  // ->오히려 삭제시 실행이 되지 않았음
  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedMonthData = monthData.map((month) => {
        if (month.id === selectedMonth) {
          return {
            ...month,
            texts: month.texts.filter((text) => text.id !== id),
          };
        }
        return month;
      });

      localStorage.setItem("monthData", JSON.stringify(updatedMonthData));
      dispatch(deletedMonthData({ monthId: selectedMonth, textId: id }));
      navigate("/", { state: { selectedMonth } });
    }
  };

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
  }, [id]);

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
