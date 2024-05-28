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
  const { monthData } = useContext(AccountBookContext);

  return (
    <Container>
      <BoxesWrapper>
        {monthData.map((month) => (
          <Box key={month.id} id={month.id} month={month.month} />
        ))}
      </BoxesWrapper>
      <TextBox />
    </Container>
  );
}

export default BoxContainer;
