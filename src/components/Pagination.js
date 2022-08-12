import React, { useState, useEffect } from "react";
import { bookSearch } from "../api";
import onAddToCart from "../util/onAddToCart";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import onDiscountRate from "../util/onDiscountRate";
import Modal from "./Modal";
import ModalPortal from "../portal/ModalPortal";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "../slices/bookSlice";
const initialPageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Pagination() {
  const waiting = "waiting";
  const fulfilled = "fulfilled";
  const loading = "loading";
  const [loadingStatus, setLoadingStatus] = useState(waiting);
  const { shoppingCart } = useSelector((state) => {
    return state.book;
  });
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [pageable, setPageable] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState(10);
  const [pageArray, setPageArray] = useState(initialPageArray);
  const [sort, setSort] = useState("accuracy");
  const [filter, setFilter] = useState("accuracy");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const onChangeInputQuantity = (idx, book, e) => {
    const { value } = e.target;
    const regMinus = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    if (regMinus.test(value)) {
      alert("수량은 양수로 부탁드려요!");
    }
    const aa = posts.map((a) =>
      a.isbn + idx === book.isbn + idx ? { ...a, quantity: Math.abs(value) } : a
    );
    setPosts(aa);
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
    setLoadingStatus(loading);
    const params = {
      query,
      sort,
      page: pageNumber,
      size,
    };
    const { data } = await bookSearch(params);
    console.log(data);
    const quantityData = data.documents.map((book) =>
      book.isbn !== 0 ? { ...book, quantity: 1 } : book
    );
    const pageable_count = Math.ceil(data.meta.pageable_count / size);
    setPageable(pageable_count);
    setPosts(quantityData);
    setLoadingStatus(fulfilled);
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
      alert("첫 번째 페이지로 이동합니다.");
      setPageNumber(1);
    }
  };
  const onClickPageDoublePlus = () => {
    if (pageNumber + 10 < pageable) {
      const includesArray = pageArray.includes(pageable - 10);
      if (!includesArray) {
        setPageNumber((prev) => prev + 10);
        setPageArray(pageArray.map((number) => number + 10));
      } else if (includesArray) {
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

  // Filter Function
  const accuracyOrder = () => {
    setSort("accuracy");
    setFilter("accuracy");
  };
  const latestOrder = () => {
    setSort("latest");
    setFilter("latest");
  };
  const descendingOrder = () => {
    const descendingArray = [...posts].sort((a, b) => {
      return b.sale_price - a.sale_price;
    });
    setPosts(descendingArray);
    setFilter("desc");
  };
  const ascendingOrder = () => {
    const ascendingArray = [...posts].sort((a, b) => {
      return a.sale_price - b.sale_price;
    });
    setPosts(ascendingArray);
    setFilter("asc");
  };
  const discountRateOrder = () => {
    const discountRateArray = [...posts].sort((a, b) => {
      return (
        Math.ceil(((a.sale_price - a.price) / a.sale_price) * 100) -
        Math.ceil(((b.sale_price - b.price) / b.sale_price) * 100)
      );
    });
    setPosts(discountRateArray);
    setFilter("discount");
  };
  const nameSort = () => {
    const nameArray = [...posts].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setPosts(nameArray);
    setFilter("name");
  };
  return (
    <>
      <div>
        <BiArrowBack
          className="cursorPointer ArrowBackIcon"
          onClick={handleGoBackBtn}
        />
      </div>
      <div className="inputStyle flex-center">
        <input
          className="input_search"
          onKeyPress={onKeyPressEnter}
          type="text"
          placeholder="검색어 입력 후 Enter!!"
        />
      </div>
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
        <ul className="flex-center paginationFilterBox">
          <li onClick={accuracyOrder}>
            <span
              className={
                filter === "accuracy"
                  ? "cursorPointer paginationFilterDetail"
                  : "cursorPointer "
              }
            >
              정확도
            </span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li onClick={latestOrder}>
            <span
              className={
                filter === "latest"
                  ? "cursorPointer paginationFilterDetail"
                  : "cursorPointer "
              }
            >
              출간일
            </span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li onClick={nameSort}>
            <span
              className={
                filter === "name"
                  ? "cursorPointer paginationFilterDetail"
                  : "cursorPointer "
              }
            >
              상품명
            </span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li onClick={ascendingOrder}>
            <span
              className={
                filter === "asc"
                  ? "cursorPointer paginationFilterDetail"
                  : "cursorPointer "
              }
            >
              낮은가격
            </span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li onClick={descendingOrder}>
            <span
              className={
                filter === "desc"
                  ? "cursorPointer paginationFilterDetail"
                  : "cursorPointer "
              }
            >
              높은가격
            </span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
          <li onClick={discountRateOrder}>
            <span
              className={
                filter === "discount"
                  ? "cursorPointer paginationFilterDetail"
                  : "cursorPointer "
              }
            >
              할인율
            </span>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </li>
        </ul>
      ) : null}
      {posts.map((book, index) => (
        <div key={index} className="paginationTotalContetnBox">
          {loadingStatus === "fulfilled" ? (
            <a href={book.url}>
              <img alt="thumbnail" src={book.thumbnail} />
            </a>
          ) : null}
          {loadingStatus === "loading" ? (
            <div className="paginationLoadingImg"></div>
          ) : null}
          <div className="paginationDetailBox">
            {loadingStatus === "fulfilled" ? (
              <>
                <div className="paginationTitle">{book.title}</div>
                <div className="paginationDetailInformationBox">
                  {book.authors}&nbsp;| {book.publisher}&nbsp;| &nbsp;
                  {book.datetime.slice(0, 10)}
                </div>
                <div className="paginationContents">
                  {book.contents.slice(0, 80)}...
                </div>
                <div className="paginationPriceBox">
                  <div className="paginationPrice">
                    {book.price.toLocaleString("ko-KR")}원
                  </div>
                  <div className="paginationSalePrice">
                    {book.sale_price < 0
                      ? book.price.toLocaleString("ko-KR")
                      : book.sale_price.toLocaleString("ko-KR")}
                    원
                  </div>
                  <div className="paginationSalePercent">
                    {onDiscountRate(book.sale_price, book.price)}% 할인
                  </div>
                </div>
              </>
            ) : null}
            {loadingStatus === "loading" ? (
              <div className="paginationDetailBoxLoading"></div>
            ) : null}
          </div>
          <div className="paginationBtnBox">
            {loadingStatus === "fulfilled" ? (
              <>
                <p>
                  수량 : &nbsp;
                  <input
                    type="number"
                    value={book.quantity}
                    className="paginationQuantityInputStyle"
                    onChange={(e) => onChangeInputQuantity(index, book, e)}
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
                  onClick={() => {
                    onAddToCart(
                      setShoppingCart,
                      book,
                      book.quantity,
                      shoppingCart,
                      dispatch
                    );
                    handleModalToggle();
                  }}
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
              </>
            ) : null}
            {loadingStatus === "loading" ? (
              <div className="paginationBtnLoading"></div>
            ) : null}
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
            ? pageableUnder10Array.map((i, idx) => (
                <button
                  onClick={() => {
                    onClickBtn(i);
                  }}
                  className="buttonStyle"
                  aria-current={pageNumber === i ? "page" : null}
                  key={i + idx}
                >
                  {i}
                </button>
              ))
            : pageArray.map((number, idx) => (
                <button
                  onClick={() => {
                    onClickBtn(number);
                  }}
                  className="buttonStyle"
                  aria-current={pageNumber === number ? "page" : null}
                  key={number + idx}
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
      {modalOpen && (
        <ModalPortal>
          <Modal onClose={handleModalToggle} />
        </ModalPortal>
      )}
    </>
  );
}
export default Pagination;
