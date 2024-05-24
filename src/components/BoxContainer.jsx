import styled from "styled-components";
import Box from "./Box";
import TextBox from "./TextBox";

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

function BoxContainer({ monthData, selectedMonth, setSelectedMonth }) {
  const selectedTexts =
    monthData.find((month) => month.id === selectedMonth)?.texts || [];

  return (
    <Container>
      <BoxesWrapper>
        {monthData.map((month) => (
          <Box
            key={month.id}
            id={month.id}
            month={month.month}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        ))}
      </BoxesWrapper>
      <TextBox texts={selectedTexts} />
    </Container>
  );
}

export default BoxContainer;
