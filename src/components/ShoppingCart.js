import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import onDiscountRate from "../util/onDiscountRate";
function ShoppingCart({ shoppingCart, setShoppingCart }) {
  const navigate = useNavigate();
  const handleGoBackBtn = () => {
    navigate(-1);
  };
  const dupMap = shoppingCart
    .map((a) => a.book.isbn)
    .filter((e, idx) => shoppingCart.indexOf(e) === idx);
  console.log("dupDeleteArray : ", dupMap);
  console.log("in shoppingcart components : ", shoppingCart);
  return (
    <div className="shoppingCartTotalPage">
      <div>
        <BiArrowBack className="ArrowBackIcon" onClick={handleGoBackBtn} />
      </div>
      <div className="shoppingCartHeader">
        <div className="shoppingCart shoppingCartHeaderProductName">상품명</div>
        <div className="shoppingCart shoppingCartHeaderPrice">정가</div>
        <div className="shoppingCart shoppingCartHeaderSalePrice">판매가</div>
        <div className="shoppingCart shoppingCartHeaderSaleQuantity">수량</div>
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
        <div key={idx} className="shoppingCartHeader">
          <div className="flex-center shoppingCartContent shoppingCartProductName">
            {product.book.title}
          </div>
          <div className="flex-center shoppingCartContent shoppingCartHeaderPrice">
            {product.book.price}원
          </div>
          <div className="flex-center shoppingCartContent shoppingCartHeaderSalePrice">
            {product.book.sale_price}원
            <br />({onDiscountRate(product.book.sale_price, product.book.price)}
            %할인)
          </div>
          <div className="flex-center shoppingCartContent shoppingCartHeaderSaleQuantity">
            {product.quantity}개
          </div>
          <div className="flex-center shoppingCartContent shoppingCartHeaderSaleTotalPrice">
            {product.book.sale_price * product.quantity}원
          </div>
          <div className="flex-center shoppingCartContent shoppingCartHeaderSaleReserves">
            {product.book.sale_price * product.quantity * 0.05}원
          </div>
          <div className="flex-center shoppingCartContent shoppingCartHeaderSalePriceState">
            {product.book.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;
