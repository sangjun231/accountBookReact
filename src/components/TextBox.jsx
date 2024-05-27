import { Link } from "react-router-dom";
import styled from "styled-components";

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

function TextBox({ texts }) {
  return (
    <StyledTextBox>
      {texts.length > 0 ? (
        <ul>
          {texts.map((text) => (
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
