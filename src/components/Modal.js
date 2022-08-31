import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcAcceptDatabase } from "react-icons/fc";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
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
  const onMainTainPage = () => {};
  const { width, height } = useWindowSize();
  return (
    <div className="ModalTotalBox">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        opacity={0.5}
        numberOfPieces={500}
      />
      <div className="ModalInnerTotalBox" onClick={onClose}>
        <div
          className="flex-center ModalInner"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-center ModalInnerIconBlock">
            <img
              alt="modal_icon"
              src="쏘쓰/8885224-removebg-preview.png"
              className="ModalInnerIconStyle"
            />
          </div>
          <div className="flex-center ModalInnerTextBlock">
            <div className="ModalInnerTextStyle">감사합니다!</div>
            <div className="ModalInnerTextStyle">
              상품이 장바구니로 이동되었습니다!
            </div>
          </div>
          <div className="ModalInnerBtnBlock flex-vertical-center">
            <button
              className="ModalInnerBtnStyle cursorPointer"
              onClick={onGoToShoppingCart}
            >
              장바구니로 가기
            </button>
            <button
              className="ModalInnerBtnStyleMaintain cursorPointer"
              onClick={onClose}
            >
              쇼핑 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
