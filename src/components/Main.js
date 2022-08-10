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
  const onGoToShoppingCart = () => {
    navigate("shoppingCart");
  };
  return (
    <div>
      <button onClick={onGoToInfinity}>Infinity</button>
      <button onClick={onGoToPagination}>Pagination</button>
      <button onClick={onGoToShoppingCart}>Shopping Cart ! </button>
    </div>
  );
}

export default Main;
