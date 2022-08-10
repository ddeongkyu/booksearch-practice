import React, { useState, useEffect } from "react";
import { bookSearch } from "../api";
import onAddToCart from "../util/onAddToCart";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import onDiscountRate from "../util/onDiscountRate";
function Pagination({ shoppingCart, setShoppingCart }) {
  const initialPageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [pageable_max, setPageable_max] = useState(0);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [pageable, setPageable] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState(10);
  const [pageArray, setPageArray] = useState(initialPageArray);
  const [inputQuantityValue, setInputQuantityValue] = useState(1);
  const [sort, setSort] = useState("accuracy");
  const onChangeInputQuantity = (e) => {
    const { value } = e.target;
    setInputQuantityValue(value);
  };
  const navigate = useNavigate();
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
      setPageNumber(1);
      setPageArray(initialPageArray);
    }
  };
  useEffect(() => {
    if (query) {
      bookSearchPagination(query, pageNumber, size, sort);
    }
  }, [query, pageNumber, size, sort]);
  const bookSearchPagination = async (query, pageNumber, size, sort) => {
    const params = {
      query,
      sort,
      page: pageNumber,
      size,
    };
    const { data } = await bookSearch(params);
    const pageable_count = Math.ceil(data.meta.pageable_count / size);
    setPageable_max(pageable_count);
    setPageable(pageable_count);
    setPosts(data.documents);
  };
  const onClickBtn = (value) => {
    setPageNumber(value);
  };
  const onClickPageMinus = () => {
    setPageNumber((prev) => prev - 1);
  };
  const onClickPagePlus = () => {
    setPageNumber((prev) => prev + 1);
  };
  const handleGoBackBtn = () => {
    navigate(-1);
  };
  const onClickPageDoubleMinus = () => {
    if (pageNumber - 10 > 0) {
      setPageNumber((prev) => prev - 10);
      setPageArray(pageArray.map((a) => a - 10));
    } else {
      alert("더 이상 10페이지씩 뒤로 갈 수 없어요!");
    }
  };
  const onClickPageDoublePlus = () => {
    if (pageNumber + 10 < pageable) {
      if (![...pageArray].includes(pageable - 10)) {
        setPageNumber((prev) => prev + 10);
        setPageArray(pageArray.map((number) => number + 10));
      } else if ([...pageArray].includes(pageable - 10)) {
        setPageArray(pageArray.map((number) => number + 10));
        setPageNumber((prev) => prev + 10);
        const findIndex = pageArray.map((a) => a + 10).indexOf(pageable);
        setPageArray((prev) => [...prev].slice(0, findIndex + 1));
      }
    }
    if (pageNumber + 10 >= pageable) {
      setPageNumber(pageable);
      alert("마지막 페이지로 이동합니다.");
    }
  };
  const pageableUnder10Array = [];
  if (pageable <= 10) {
    for (let i = 0; i < pageable; i++) {
      pageableUnder10Array.push(i + 1);
    }
  }
  const onChangeSize = (e) => {
    const { value } = e.target;
    setSize(Number(value));
    setPageNumber(1);
    setPageArray(initialPageArray);
  };
  const onClickNotyet = () => {
    alert("쏘리! 개발중!");
  };
  const handleSortClick = () => {
    setSort("accuracy");
  };
  const handleSortClick2 = () => {
    setSort("latest");
  };
  console.log(shoppingCart);
  return (
    <>
      <div>
        <BiArrowBack className="ArrowBackIcon" onClick={handleGoBackBtn} />
      </div>
      <div className="inputStyle flex-center">
        <input
          className="input_search"
          onKeyPress={onKeyPressEnter}
          type="text"
          placeholder="검색어 입력 후 Enter!!"
        />
      </div>
      {query ? <p>현재 페이지 : {pageNumber}</p> : null}
      {query ? (
        <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select type="number" value={size} onChange={onChangeSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </label>
      ) : null}
      {query ? (
        <ul className="paginationFilterBox">
          <li
            onClick={handleSortClick}
            className="cursorPointer paginationFilterDetail"
          >
            정확도&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li
            onClick={handleSortClick2}
            className="cursorPointer paginationFilterDetail"
          >
            출간일&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li className="cursorPointer paginationFilterDetail">
            상품명&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li className="cursorPointer paginationFilterDetail">
            낮은가격&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li className="cursorPointer paginationFilterDetail">
            높은가격&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li className="cursorPointer paginationFilterDetail">
            할인율&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
        </ul>
      ) : null}
      {posts.map((book, index) => (
        <div key={index} className="paginationTotalContetnBox">
          <a href={book.url}>
            <img alt="thumbnail" src={book.thumbnail} />
          </a>
          <div className="paginationDetailBox">
            <div className="paginationTitle">{book.title}</div>
            <div className="paginationDetailInformationBox">
              {book.authors}&nbsp;| {book.publisher}&nbsp;| &nbsp;
              {book.datetime.slice(0, 10)}
            </div>
            <div className="paginationContents">
              {book.contents.slice(0, 80)}...
            </div>
            <div className="paginationPriceBox">
              <div className="paginationPrice">{book.price}원</div>
              <div className="paginationSalePrice">
                {book.sale_price < 0 ? book.price : book.sale_price}원
              </div>
              <div className="paginationSalePercent">
                {onDiscountRate(book.sale_price, book.price)}% 할인
              </div>
            </div>
          </div>
          <div className="paginationBtnBox">
            <p>
              수량 : &nbsp;
              <input
                type="number"
                className="paginationQuantityInputStyle"
                value={inputQuantityValue}
                onChange={onChangeInputQuantity}
              />
              &nbsp;개
            </p>
            <button
              onClick={onClickNotyet}
              className="cursorPointer paginationBtnStyle"
            >
              내 서재로 이동
            </button>
            <button
              onClick={() =>
                onAddToCart(setShoppingCart, book, inputQuantityValue)
              }
              className="cursorPointer paginationBtnStyle"
            >
              장바구니
            </button>
            <button
              onClick={onClickNotyet}
              className="cursorPointer paginationBtnStyle"
            >
              바로구매
            </button>
          </div>
        </div>
      ))}
      {query ? (
        <nav className="nav flex-center">
          <button className="buttonStyle" onClick={onClickPageDoubleMinus}>
            &lt;&lt;
          </button>
          <button
            className="buttonStyle"
            disabled={pageNumber === 1}
            onClick={onClickPageMinus}
          >
            &lt;
          </button>
          {pageable <= 10
            ? pageableUnder10Array.map((i) => (
                <button
                  onClick={() => {
                    onClickBtn(i);
                  }}
                  className="buttonStyle"
                  aria-current={pageNumber === i ? "page" : null}
                  key={i}
                >
                  {i}
                </button>
              ))
            : pageArray.map((number) => (
                <button
                  onClick={() => {
                    onClickBtn(number);
                  }}
                  className="buttonStyle"
                  aria-current={pageNumber === number ? "page" : null}
                  key={number}
                >
                  {number}
                </button>
              ))}
          <button
            className="buttonStyle"
            disabled={pageNumber === pageable}
            onClick={onClickPagePlus}
          >
            &gt;
          </button>
          <button className="buttonStyle" onClick={onClickPageDoublePlus}>
            &gt;&gt;
          </button>
        </nav>
      ) : null}
    </>
  );
}
export default Pagination;
