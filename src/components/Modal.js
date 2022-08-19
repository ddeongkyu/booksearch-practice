import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
