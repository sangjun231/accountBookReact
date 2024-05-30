import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updatedMonth } from "../redux/slices/accountBookSlice";

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

function Box({ id, month }) {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.accountBook.selectedMonth);

  const isSelected = selectedMonth === id;

  const handleClick = () => {
    dispatch(updatedMonth(id));
  };

  return (
    <StyledBox onClick={handleClick} selected={isSelected}>
      <h3>{month}</h3>
    </StyledBox>
  );
}

export default Box;
