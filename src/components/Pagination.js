import React, { useState, useEffect } from "react";
import { bookSearch } from "../api";
function Pagination() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [pageable, setPageable] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState(10);
  const [pageArray, setPageArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      setQuery(value);
    }
  };
  useEffect(() => {
    if (query) {
      bookSearchPagination(query, pageNumber, size);
    }
  }, [query, pageNumber, size]);
  const bookSearchPagination = async (query, pageNumber, size) => {
    const params = {
      query,
      page: pageNumber,
      size,
    };
    const { data } = await bookSearch(params);
    const pageable_max = Math.ceil(data.meta.pageable_count / size);
    setPageable(pageable_max);
    setPosts(data.documents);
  };
  const onClickBtn = (value) => {
    setPageNumber(value);
  };
  const discount_rate = (a, b) => {
    if (a > 0) {
      return Math.ceil(((b - a) / b) * 100);
    } else if (a <= 0) {
      return 0;
    }
  };
  const onClickPageMinus = () => {
    setPageNumber((prev) => prev - 1);
  };
  const onClickPagePlus = () => {
    setPageNumber((prev) => prev + 1);
  };
  const onClickPageDoubleMinus = () => {
    if (pageNumber - 10 > 0) {
      setPageNumber((prev) => prev - 10);
      setPageArray(pageArray.map((a) => a - 10));
    }
  };
  const onClickPageDoublePlus = () => {
    if (pageNumber + 10 < pageable) {
      setPageNumber((prev) => prev + 10);
      setPageArray(pageArray.map((a) => a + 10));
    }
    if (pageable === pageNumber) {
      alert("더 이상 책이 없어요!");
    }
  };
  const myArr = [];
  if (pageable <= 10) {
    for (let i = 0; i < pageable; i++) {
      myArr.push(i + 1);
    }
  }
  console.log(pageArray);
  return (
    <>
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
          <select
            type="number"
            value={size}
            onChange={({ target: { value } }) => setSize(Number(value))}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </label>
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
              {book.contents.slice(0, 99)}...
            </div>
            <div className="paginationPriceBox">
              <div className="paginationPrice">{book.price}원</div>
              <div className="paginationSalePrice">
                {book.sale_price < 0 ? book.price : book.sale_price}원
              </div>
              <div className="paginationSalePercent">
                {discount_rate(book.sale_price, book.price)}% 할인
              </div>
            </div>
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
            ? myArr.map((i) => (
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
          {/* {Array(pageable <= 10 ? pageable : 10).map((i) => (
            <button
              onClick={() => {
                onClickBtn(i + 1);
              }}
              className="buttonStyle"
              aria-current={pageNumber === i + 1 ? "page" : null}
              key={i + 1}
            >
              {i + 1}
            </button>
          ))} */}
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
