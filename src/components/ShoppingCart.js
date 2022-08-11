import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import onDiscountRate from "../util/onDiscountRate";
import { MdRemoveShoppingCart } from "react-icons/md";
function ShoppingCart({ shoppingCart }) {
  const navigate = useNavigate();
  const handleGoBackBtn = () => {
    navigate(-1);
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
  return (
    <div className="shoppingCartTotalPage">
      <div>
        <BiArrowBack className="ArrowBackIcon" onClick={handleGoBackBtn} />
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
              <div className="flex-center shoppingCartContent shoppingCartProductName">
                <img
                  className="shoppingCartImg"
                  alt="thumbnail"
                  src={product.thumbnail}
                />
                <div> {product.title}</div>
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
                <th className="shoppingTableSecond">
                  {totalPrice.toLocaleString("ko-KR")}원
                </th>
                <th className="shoppingTableSecond">
                  {shoppingCart.length}종({totalQuatity}권)
                </th>
                <th className="shoppingTableSecond">0원</th>
                <th className="shoppingTableSecond">
                  {totalPrice.toLocaleString("ko-KR")}원
                </th>
                <th className="shoppingTableSecond">
                  {totalReserves.toLocaleString("ko-KR")}원
                </th>
              </tr>
            </tbody>
          </table>
          <div>
            <div>
              <div>
                <strong>일반상품배송(택배수령) 안내사항</strong>
              </div>
              <div>
                <p>
                  재고 여부에 따라 품절/지연될 수 있으며, 이 경우 별도로
                  안내드립니다.
                </p>
                <p>
                  당일배송은 서울 및 수도권 인근지역에서 10:30분 까지 주문 시
                  가능합니다. [당일배송안내]
                </p>
                <p>
                  - 네이버페이, 지마켓, 옥션, 쿠팡 등의 제휴사 주문은 연동시간에
                  따라 당일배송이 어려울 수 있습니다.
                </p>
                <p>
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
