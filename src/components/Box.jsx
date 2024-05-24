import styled from "styled-components";

const StyledBox = styled.div`
  width: 200px;
  background-color: ${(props) => (props.selected ? "blue" : "gray")};
  color: white;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
`;

function Box({ id, month, selectedMonth, setSelectedMonth }) {
  const isSelected = selectedMonth === id;

  const handleClick = () => {
    setSelectedMonth(id);
  };

  return (
    <StyledBox onClick={handleClick} selected={isSelected}>
      <h3>{month}</h3>
    </StyledBox>
  );
}

export default Box;
