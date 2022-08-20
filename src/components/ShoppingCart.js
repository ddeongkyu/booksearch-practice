import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import onDiscountRate from "../util/onDiscountRate";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { setShoppingCart } from "../slices/bookSlice";
import { useDispatch } from "react-redux";
import ModalPortal from "../portal/ModalPortal";
import ShippingModal from "./ShippingModal";
function ShoppingCart() {
  const { shoppingCart } = useSelector((state) => {
    return state.book;
  });
  const [checkedInput, setCheckedInput] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const isCheckoutInputEmpty = checkedInput.length === 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoPagination = () => {
    navigate("/pagination");
  };
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const isShoppingCartEmpty = shoppingCart.length === 0;
  const handleOrderBtn = () => {
    alert("개발중!");
  };
  const totalPrice = !isCheckoutInputEmpty
    ? checkedInput.reduce((acc, product) => {
        return (
          acc +
          product.quantity *
            (product.sale_price === -1 ? product.price : product.sale_price)
        );
      }, 0)
    : shoppingCart.reduce((acc, product) => {
        return (
          acc +
          product.quantity *
            (product.sale_price === -1 ? product.price : product.sale_price)
        );
      }, 0);

  const totalQuatity = !isCheckoutInputEmpty
    ? checkedInput.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0)
    : shoppingCart.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
  const totalReserves = !isCheckoutInputEmpty
    ? checkedInput.reduce((acc, product) => {
        return Math.ceil(
          acc +
            (product.sale_price === -1 ? product.price : product.sale_price) *
              0.05 *
              product.quantity
        );
      }, 0)
    : shoppingCart.reduce((acc, product) => {
        return Math.ceil(
          acc +
            (product.sale_price === -1 ? product.price : product.sale_price) *
              0.05 *
              product.quantity
        );
      }, 0);
  const onpartAdd = (product, e) => {
    const { checked } = e.target;
    if (checked) {
      const addArr = [product].filter((a) => a.isbn === product.isbn);
      setCheckedInput(checkedInput.concat(addArr));
    }
    if (!checked) {
      const delArr = checkedInput.filter((a) => a.isbn !== product.isbn);
      setCheckedInput(delArr);
    }
  };
  const onPartDelete = () => {
    if (window.confirm(checkedInput.length + "개의 상품을 삭제하시겠습니까?")) {
      const dupDelete = shoppingCart
        .concat(checkedInput)
        .filter(
          (item) => !shoppingCart.includes(item) || !checkedInput.includes(item)
        );

      dispatch(setShoppingCart(dupDelete));
      setCheckedInput([]);
      alert("삭제되었습니다.");
    } else {
      alert("삭제를 취소하였습니다.");
    }
  };
  const shippingCost = totalPrice > 10000 ? 0 : 3000;
  const totaltotalPrice = shippingCost + totalPrice;
  return (
    <div className="shoppingCartTotalPage">
      {!isShoppingCartEmpty ? (
        <div>
          <div className="shoppingCartHeader">
            <div className="shoppingCart shoppingCartHeaderProductName">
              상품명
            </div>
            <div className="shoppingCart shoppingCartHeaderPrice">정가</div>
            <div className="shoppingCart shoppingCartHeaderSalePrice">
              판매가
            </div>
            <div className="shoppingCart shoppingCartHeaderSaleQuantity">
              수량
            </div>
            <div className="shoppingCart shoppingCartHeaderSaleTotalPrice">
              합계
            </div>
            <div className="shoppingCart shoppingCartHeaderSaleReserves">
              적립금
            </div>
            <div className="shoppingCart shoppingCartHeaderSalePriceState">
              상태
            </div>
          </div>
          {shoppingCart.map((product, idx) => (
            <div key={product.isbn + idx} className="shoppingCartHeader">
              <div className="flex-vertical-center shoppingCartContent shoppingCartProductName">
                <div className="cursorPointer shoppingCartDeleteBtn">
                  <input
                    className="cursorPointer"
                    type="checkbox"
                    onClick={(e) => onpartAdd(product, e)}
                  />
                </div>
                <img
                  className="shoppingCartImg"
                  alt="thumbnail"
                  src={product.thumbnail}
                />
                <div className="shoppingCartTitleTitle">
                  <strong>{product.title}</strong>
                </div>
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderPrice">
                {product.price.toLocaleString("ko-KR")}원
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSalePrice">
                <strong>
                  {!onDiscountRate(product.sale_price, product.price)
                    ? product.price.toLocaleString("ko-KR")
                    : product.sale_price.toLocaleString("ko-KR")}
                  원
                </strong>
                <div className="colorRed">
                  ({onDiscountRate(product.sale_price, product.price)}
                  %할인)
                </div>
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSaleQuantity">
                {product.quantity}개
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSaleTotalPrice">
                {product.sale_price === -1
                  ? (product.price * product.quantity).toLocaleString("ko-KR")
                  : (product.sale_price * product.quantity).toLocaleString(
                      "ko-KR"
                    )}
                원
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSaleReserves">
                <strong>
                  {Math.ceil(
                    product.sale_price === -1
                      ? product.price * product.quantity * 0.05
                      : product.sale_price * product.quantity * 0.05
                  ).toLocaleString("ko-KR") + "원"}
                </strong>
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSalePriceState">
                <strong>
                  {!product.status ? "입고 예정" : product.status}
                </strong>
              </div>
            </div>
          ))}
          <div className="shoppingCartNoticeBox">
            <div className="cartNotice">
              <div>
                <span>주문도서 :</span>
                <strong className="colorGreen">정상판매</strong>
                <span className="colorGreen">&nbsp;(주말/공휴일 제외)</span>
              </div>
              <div>
                <strong>
                  <span>
                    모든 도서가&nbsp;
                    <span className="colorRed">한번에 출고</span>&nbsp; 됩니다
                  </span>
                </strong>
              </div>

              <div>
                회원 로그인 후 장바구니에 상품을 담으시면&nbsp;
                <span className="colorRed">
                  <strong>30일간</strong>
                </span>
                &nbsp; 자동 보관 됩니다.
              </div>
              <div className="colorRed">
                <strong>
                  해외원서 주문 후 단순변심에 의한 취소 및 반품 시 도서판매가의
                  20%에 해당하는 수수료가 부과됩니다.
                </strong>
              </div>
            </div>
          </div>
          <div className="flex-vertical-center">
            <div className="shoppingCartPartDeleteBtnBox">
              <button
                className="cursorPointer shoppingCartPartDeleteBtn"
                onClick={onPartDelete}
                disabled={isCheckoutInputEmpty}
              >
                선택상품 삭제
              </button>
            </div>
            <div className="shoppingCartPartDeleteBtnBox">
              <button
                onClick={handleOrderBtn}
                disabled={isCheckoutInputEmpty}
                className="cursorPointer shoppingCartPartDeleteBtn"
              >
                선택상품 내 서재담기
              </button>
            </div>
          </div>
          <div className="shoppingShippingFree">
            10,000원 이상 주문하시면 배송비가 무료입니다.
          </div>
          <table className="shoppingTable">
            <tbody>
              <tr>
                <th className="shoppingTableFirst">주문상품 금액 합계</th>
                <th className="shoppingTableFirst">주문상품 수량</th>
                <th className="shoppingTableFirst">배송비</th>
                <th className="shoppingTableFirst">총 금액 합계</th>
                <th className="shoppingTableFirst">예상 적립금</th>
              </tr>
              <tr>
                <th className="textBig shoppingTableSecond">
                  {totalPrice.toLocaleString("ko-KR")}원
                </th>
                <th className="shoppingTableSecond">
                  <span className="textBig">
                    {!isCheckoutInputEmpty
                      ? checkedInput.length
                      : shoppingCart.length}
                    종
                  </span>
                  ({totalQuatity}권)
                </th>
                <th className="shoppingTableSecond textBig">
                  {shippingCost}원
                </th>
                <th className="shoppingTableSecond textBig">
                  {totaltotalPrice.toLocaleString("Ko-KR")}원
                </th>
                <th className="shoppingTableSecond textBig">
                  {totalReserves.toLocaleString("ko-KR")}원
                </th>
              </tr>
            </tbody>
          </table>
          <div className="flex-center shoppingCartInfoTotal">
            <div className="shoppingInfoBlock">
              <div className="shoppingInfoHead">
                <strong>일반상품배송(택배수령) 안내사항</strong>
              </div>
              <div className="shoppingInfoDetail">
                <p>
                  ◦&nbsp;재고 여부에 따라 품절/지연될 수 있으며, 이 경우 별도로
                  안내드립니다.
                </p>
                <p>
                  ◦&nbsp;당일배송은 서울 및 수도권 인근지역에서 10:30분 까지
                  주문 시 가능합니다.
                  <span
                    onClick={handleModalToggle}
                    className="cursorPointer shoppingDailyShip colorRed"
                  >
                    &nbsp;[당일배송안내]
                  </span>
                </p>
                <p className="colorRed">
                  - 네이버페이, 지마켓, 옥션, 쿠팡 등의 제휴사 주문은 연동시간에
                  따라 당일배송이 어려울 수 있습니다.
                </p>
                <p className="colorRed">
                  - 직장, 기관 등의 배송지는 당일배송이 어려울 수 있으며, 학교
                  배송지는 당일배송이 불가합니다.
                </p>
                <p>
                  ◦&nbsp;배송지가 동일하더라도 여러건으로 진행된 주문은 각각의
                  배송료가 부과됩니다.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-center shoppingCheckOutBtn">
            <button
              onClick={handleOrderBtn}
              className="shoppingCheckOutBtnStyle cursorPointer"
            >
              {isCheckoutInputEmpty ? null : "선택상품 "} 주문하기
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-center positionA shoppingCartNothinginCartBlock">
          <div className="shoppingCartNothingCartIcon">
            <MdRemoveShoppingCart />
          </div>
          <div className="shoppingCartNothingCartText">
            Nothing in Your Shopping Cart!
          </div>
          <div
            onClick={handleGoPagination}
            className="cursorPointer shoppingCartNothingCartTextB"
          >
            Go To Shopping!
          </div>
        </div>
      )}
      {modalOpen && (
        <ModalPortal>
          <ShippingModal onClose={handleModalToggle} />
        </ModalPortal>
      )}
    </div>
  );
}

export default ShoppingCart;
