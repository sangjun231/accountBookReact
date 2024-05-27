import { useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialText = {};
  const selectedMonth = JSON.parse(localStorage.getItem("selectedMonth")) || 1;

  const dateRef = useRef(initialText.date || "");
  const itemRef = useRef(initialText.item || "");
  const amountRef = useRef(initialText.amount || "");
  const descriptionRef = useRef(initialText.description || "");

  useEffect(() => {
    const monthData = JSON.parse(localStorage.getItem("monthData")) || [];
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

  const handleSave = () => {
    const monthData = JSON.parse(localStorage.getItem("monthData")) || [];

    const updatedText = {
      id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
    };

    const updatedMonthData = monthData.map((month) => {
      return {
        ...month,
        texts: month.texts.map((text) =>
          text.id === updatedText.id ? updatedText : text
        ),
      };
    });

    localStorage.setItem("monthData", JSON.stringify(updatedMonthData));
    navigate("/", { state: { selectedMonth } });
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const monthData = JSON.parse(localStorage.getItem("monthData")) || [];

      const deletedMonthData = monthData.map((month) => {
        return {
          ...month,
          texts: month.texts.filter((text) => text.id !== id),
        };
      });

      localStorage.setItem("monthData", JSON.stringify(deletedMonthData));
      navigate("/", { state: { selectedMonth } });
    }
  };

  return (
    <div>
      <h1>Detail</h1>
      <div>
        <input type="text" name="date" ref={dateRef} />
        <br />
        <input type="text" name="item" ref={itemRef} />
        <br />
        <input type="text" name="amount" ref={amountRef} />
        <br />
        <input type="text" name="description" ref={descriptionRef} />
        <br />
      </div>
      <button onClick={handleSave}>수정</button>
      <button onClick={handleDelete}>삭제</button>
      <Link to="/" state={{ selectedMonth }}>
        뒤로 가기
      </Link>
    </div>
  );
}

export default Detail;
