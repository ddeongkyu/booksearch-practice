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
    <div className="flex-center mainTotalBox">
      <button className="cursorPointer mainBtnStyle" onClick={onGoToInfinity}>
        인피니티 스크롤
      </button>
      <button className="cursorPointer mainBtnStyle" onClick={onGoToPagination}>
        페이지네이션
      </button>
      <button
        className="cursorPointer mainBtnStyle"
        onClick={onGoToShoppingCart}
      >
        장바구니
      </button>
    </div>
  );
}

export default Main;
