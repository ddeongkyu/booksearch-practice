import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import onDiscountRate from "../util/onDiscountRate";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { setShoppingCart } from "../slices/bookSlice";
import { useDispatch } from "react-redux";
function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoBackBtn = () => {
    navigate(-1);
  };
  const { shoppingCart } = useSelector((state) => {
    return state.book;
  });
  const handleOrderBtn = () => {
    alert("개발중!");
  };
  const totalPrice = shoppingCart.reduce((acc, product) => {
    return acc + product.quantity * product.sale_price;
  }, 0);
  const totalQuatity = shoppingCart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  const totalReserves = shoppingCart.reduce((acc, product) => {
    return acc + product.sale_price * 0.05 * product.quantity;
  }, 0);
  const deleteProduct = (book) => {
    const deletedProduct = shoppingCart.filter(
      (product) => product.isbn !== book.isbn
    );
    dispatch(setShoppingCart(deletedProduct));
  };
  return (
    <div className="shoppingCartTotalPage">
      <div>
        <BiArrowBack
          className="cursorPointer ArrowBackIcon"
          onClick={handleGoBackBtn}
        />
      </div>
      {shoppingCart.length !== 0 ? (
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
                  <AiOutlineClose onClick={() => deleteProduct(product)} />
                </div>
                <img
                  className="shoppingCartImg"
                  alt="thumbnail"
                  src={product.thumbnail}
                />
                <div className="shoppingCartTitleTitle">
                  {" "}
                  <strong>{product.title}</strong>
                </div>
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderPrice">
                {product.price.toLocaleString("ko-KR")}원
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSalePrice">
                <strong> {product.sale_price.toLocaleString("ko-KR")}원</strong>
                <div style={{ color: "red" }}>
                  ({onDiscountRate(product.sale_price, product.price)}
                  %할인)
                </div>
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSaleQuantity">
                {product.quantity}개
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSaleTotalPrice">
                {(product.sale_price * product.quantity).toLocaleString(
                  "ko-KR"
                )}
                원
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSaleReserves">
                <strong>
                  {(
                    product.sale_price *
                    product.quantity *
                    0.05
                  ).toLocaleString("ko-KR")}
                  원
                </strong>
              </div>
              <div className="flex-center shoppingCartContent shoppingCartHeaderSalePriceState">
                <strong> {product.status}</strong>
              </div>
            </div>
          ))}
          <div className="shoppingCartNoticeBox">
            <div className="cartNotice">
              <div>
                <span>주문도서 :</span>
                <strong className="colorGreen">정상판매</strong>
                <span className="colorGreen">(주말/공휴일 제외)</span>
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
                <span className="colorRed">30일간</span>&nbsp; 자동 보관 됩니다.
              </div>
              <div className="colorRed">
                해외원서 주문 후 단순변심에 의한 취소 및 반품 시 도서판매가의
                20%에 해당하는 수수료가 부과됩니다.
              </div>
            </div>
          </div>
          <table className="flex-center shoppingTable">
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
                  <span className="textBig">{shoppingCart.length}종</span>(
                  {totalQuatity}권)
                </th>
                <th className="shoppingTableSecond textBig">0원</th>
                <th className="shoppingTableSecond textBig">
                  {totalPrice.toLocaleString("ko-KR")}원
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
                  재고 여부에 따라 품절/지연될 수 있으며, 이 경우 별도로
                  안내드립니다.
                </p>
                <p>
                  당일배송은 서울 및 수도권 인근지역에서 10:30분 까지 주문 시
                  가능합니다.
                  <span className="cursorPointer colorRed">[당일배송안내]</span>
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
                  배송지가 동일하더라도 여러건으로 진행된 주문은 각각의 배송료가
                  부과됩니다.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-center shoppingCheckOutBtn">
            <button
              onClick={handleOrderBtn}
              className="shoppingCheckOutBtnStyle cursorPointer"
            >
              주문하기
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-center shoppingCartNothinginCartBlock">
          <div className="shoppingCartNothingCartIcon">
            <MdRemoveShoppingCart />
          </div>
          <div className="shoppingCartNothingCartText">
            Nothing in Your Shopping Cart!
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
