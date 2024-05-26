import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AccountBookContext } from "../context/AccountBookContext";

const StyledTextBox = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  border-radius: 10px;

  li,
  p {
    background-color: lightgray;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
`;

function TextBox() {
  const { monthData, selectedMonth } = useContext(AccountBookContext);

  // 옵셔널 체이닝 자세히 알아보자 , 실행 과정을 콘솔로 리턴값 확인해보기
  // 개선해보기
  const selectedTexts =
    monthData.find((month) => month.id === selectedMonth)?.texts || [];

  return (
    <StyledTextBox>
      {selectedTexts.length > 0 ? (
        <ul>
          {selectedTexts.map((text) => (
            <li key={text.id}>
              <Link to={`/detail/${text.id}`}>
                {text.date} <br />
                {text.item} - {text.description} {text.amount}원
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>텍스트를 입력해주세요.</p>
      )}
    </StyledTextBox>
  );
}

export default TextBox;
