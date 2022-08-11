import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
function Main() {
  const navigate = useNavigate();
  const onGoToInfinity = () => {
    navigate(routes.infinity);
  };
  const onGoToPagination = () => {
    navigate(routes.pagination);
  };
  const onGoToShoppingCart = () => {
    navigate(routes.shoppingCart);
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
