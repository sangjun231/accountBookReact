import styled from "styled-components";
import Box from "./Box";
import TextBox from "./TextBox";
import { useContext } from "react";
import { AccountBookContext } from "../context/AccountBookContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function BoxContainer() {
  const { monthData, selectedMonth } = useContext(AccountBookContext);

  // 옵셔널 체이닝 자세히 알아보자 , 실행 과정을 콘솔로 리턴값 확인해보기
  // 개선해보기
  const selectedTexts =
    monthData.find((month) => month.id === selectedMonth)?.texts || [];

  return (
    <Container>
      <BoxesWrapper>
        {monthData.map((month) => (
          <Box key={month.id} id={month.id} month={month.month} />
        ))}
      </BoxesWrapper>
      <TextBox texts={selectedTexts} />
    </Container>
  );
}

export default BoxContainer;
