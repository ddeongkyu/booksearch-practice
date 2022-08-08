import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const onGoToInfinity = () => {
    navigate("infinity");
  };
  const onGoToPagination = () => {
    navigate("pagination");
  };
  return (
    <div>
      <button onClick={onGoToInfinity}>Infinity</button>
      <button onClick={onGoToPagination}>Pagination</button>
    </div>
  );
}

export default Main;
