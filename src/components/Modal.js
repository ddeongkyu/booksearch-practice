import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants";
import { FcAcceptDatabase } from "react-icons/fc";

const Modal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const navigate = useNavigate();

  const onGoToShoppingCart = () => {
    navigate("/shoppingCart");
    // 여기서 constants에 있는거 쓰면
    // ex} routes.shoppingCart
    // pagination에서 썻다고 가정하면
    // locallhost:3000/pagination/shoppingCart 이렇게 가져서 에러뜸 ㅜㅜ
    // 그래서 constants 만들어놓고도 이렇게 써놨음;
  };
  return (
    <div className="ModalTotalBox">
      <div className="ModalInnerTotalBox" onClick={onClose}>
        <div
          className="flex-center ModalInner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-center ModalInnerIconBlock">
            <FcAcceptDatabase className="ModalInnerIconStyle" />
          </div>
          <div className="flex-center ModalInnerTextBlock">
            <div className="ModalInnerTextStyle">선택 감사합니다!</div>
            <div className="ModalInnerTextStyleBuy">
              장바구니에 성공적으로 들어갔어요!
            </div>
          </div>
          <div className="ModalInnerBtnBlock">
            <button
              className="ModalInnerBtnStyle cursorPointer"
              onClick={onGoToShoppingCart}
            >
              장바구니로 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
