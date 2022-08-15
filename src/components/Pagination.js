import React, { useState, useEffect } from "react";
import { bookSearch } from "../api";
import onAddToCart from "../util/onAddToCart";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FcReading } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import onDiscountRate from "../util/onDiscountRate";
import Modal from "./Modal";
import ModalPortal from "../portal/ModalPortal";
import { useDispatch, useSelector } from "react-redux";
import {
  setShoppingCart,
  setPosts,
  setFilter,
  setPageNumber,
  setPageable,
  setQuery,
  setSize,
  setSort,
  setPageArray,
  setSearchWord,
  setRecentlySeen,
} from "../slices/bookSlice";
import { waiting, fulfilled, onLoading } from "../constants";
import generateRandomId from "../util/generateRandomId";
function Pagination() {
  const [loadingStatus, setLoadingStatus] = useState(waiting);
  const {
    shoppingCart,
    posts,
    query,
    size,
    pageNumber,
    pageable,
    sort,
    filter,
    pageArray,
    searchWord,
    recentlySeen,
  } = useSelector((state) => {
    return state.book;
  });
  const dispatch = useDispatch();
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
    dispatch(setPosts(aa));
  };
  const navigate = useNavigate();
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      const searched = searchWord.concat({
        id: generateRandomId(),
        word: value,
      });
      dispatch(setQuery(value));
      dispatch(setPageNumber(1));
      dispatch(setPageArray(pageArray));
      dispatch(setFilter("accuracy"));
      dispatch(setSearchWord(searched));
    }
  };

  useEffect(() => {
    if (query) {
      bookSearchPagination(query, pageNumber, size, sort);
    }
  }, [query, pageNumber, size, sort]);
  const bookSearchPagination = async (query, pageNumber, size, sort) => {
    setLoadingStatus(onLoading);
    const params = {
      query,
      sort,
      page: pageNumber,
      size,
    };
    const { data } = await bookSearch(params);
    const quantityData = data.documents.map((book) =>
      book.isbn !== 0 ? { ...book, quantity: 1 } : book
    );
    const pageable_count = Math.ceil(data.meta.pageable_count / size);
    dispatch(setPageable(pageable_count));
    dispatch(setPosts(quantityData));
    setLoadingStatus(fulfilled);
    if (filter === "name") {
      const nameArray = [...posts].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      dispatch(setPosts(nameArray));
    } else if (filter === "desc") {
      const descendingArray = [...posts].sort((a, b) => {
        return b.sale_price - a.sale_price;
      });
      dispatch(setPosts(descendingArray));
    } else if (filter === "asc") {
      const ascendingArray = [...posts].sort((a, b) => {
        return a.sale_price - b.sale_price;
      });
      dispatch(setPosts(ascendingArray));
    } else if (filter === "discount") {
      const discountRateArray = [...posts].sort((a, b) => {
        return (
          Math.ceil(((a.sale_price - a.price) / a.sale_price) * 100) -
          Math.ceil(((b.sale_price - b.price) / b.sale_price) * 100)
        );
      });
      dispatch(setPosts(discountRateArray));
    }
  };
  const handleDeleteSearchWord = (id) => {
    const deleteArray = searchWord.filter((content) => content.id !== id);
    dispatch(setSearchWord(deleteArray));
  };
  const handleSearchdWord = (word) => {
    dispatch(setQuery(word));
    dispatch(setPageNumber(1));
    dispatch(setPageArray(pageArray));
    dispatch(setFilter("accuracy"));
  };
  const handleAddRecentlySeen = (product) => {
    const dupl = recentlySeen.filter((a) => a.isbn === product.isbn);
    const isduplEmpty = dupl.length === 0;
    if (isduplEmpty) {
      const recentArr = recentlySeen.concat(product);
      dispatch(setRecentlySeen(recentArr));
    }
  };
  const handleDeleteRecentlySeen = (product) => {
    const delArr = recentlySeen.filter((a) => a.isbn !== product.isbn);
    dispatch(setRecentlySeen(delArr));
  };
  const onClickBtn = (value) => {
    dispatch(setPageNumber(value));
  };
  const onClickPageMinus = () => {
    dispatch(setPageNumber(pageNumber - 1));
  };
  const onClickPagePlus = () => {
    dispatch(setPageNumber(pageNumber + 1));
  };
  const handleGoBackBtn = () => {
    navigate(-1);
  };
  const onClickPageDoubleMinus = () => {
    if (pageNumber - 10 > 0) {
      dispatch(setPageNumber(pageNumber - 10));
      dispatch(setPageArray(pageArray.map((a) => a - 10)));
    } else {
      alert("첫 번째 페이지로 이동합니다.");
      dispatch(setPageNumber(1));
    }
  };
  const onClickPageDoublePlus = () => {
    if (pageNumber + 10 < pageable) {
      const includesArray = pageArray.includes(pageable - 10);
      const increase = pageArray.map((number) => number + 10);
      if (!includesArray) {
        dispatch(setPageNumber(pageNumber + 10));
        dispatch(setPageArray(increase));
      } else if (includesArray) {
        dispatch(setPageArray(increase));
        dispatch(setPageNumber(pageNumber + 10));
        const findIndex = pageArray.map((a) => a + 10).indexOf(pageable);
        dispatch(setPageArray((prev) => [...prev].slice(0, findIndex + 1)));
      }
    }
    if (pageNumber + 10 >= pageable) {
      dispatch(setPageNumber(pageable));
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
    dispatch(setSize(Number(value)));
    dispatch(setPageNumber(1));
    dispatch(setPageArray(pageArray));
    dispatch(setFilter("accuracy"));
    dispatch(setSort("accuracy"));
  };
  const onClickNotyet = () => {
    alert("쏘리! 개발중!");
  };
  const accuracyOrder = () => {
    dispatch(setSort("accuracy"));
    dispatch(setFilter("accuracy"));
  };
  const latestOrder = () => {
    dispatch(setSort("latest"));
    dispatch(setFilter("latest"));
  };
  const descendingOrder = () => {
    const descendingArray = [...posts].sort((a, b) => {
      return b.sale_price - a.sale_price;
    });
    dispatch(setPosts(descendingArray));
    dispatch(setFilter("desc"));
  };
  const ascendingOrder = () => {
    const ascendingArray = [...posts].sort((a, b) => {
      return a.sale_price - b.sale_price;
    });
    dispatch(setPosts(ascendingArray));
    dispatch(setFilter("asc"));
  };
  const discountRateOrder = () => {
    const discountRateArray = [...posts].sort((a, b) => {
      return (
        Math.ceil(((a.sale_price - a.price) / a.sale_price) * 100) -
        Math.ceil(((b.sale_price - b.price) / b.sale_price) * 100)
      );
    });
    dispatch(setPosts(discountRateArray));
    dispatch(setFilter("discount"));
  };
  const nameSort = () => {
    const nameArray = [...posts].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    dispatch(setPosts(nameArray));
    dispatch(setFilter("name"));
  };
  const isPostEmpty = posts.length === 0;
  console.log(recentlySeen);
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
        <div className="flex-vertical-center">
          <div className="flex-vertical-center searchWordTotal">
            <span className="searchWordText">최근 검색어 :</span>
            {searchWord.map((content) => (
              <div className="searchWordBox" key={content.id}>
                <div className="flex-vertical-center searchWordWord cursorPointer">
                  <div onClick={() => handleSearchdWord(content.word)}>
                    {content.word}
                  </div>
                  <AiOutlineClose
                    onClick={() => handleDeleteSearchWord(content.id)}
                    className="cursorPointer searchWordIcon"
                  />
                </div>
              </div>
            ))}
          </div>
          <label>
            페이지 당 표시할 게시물 수:&nbsp;
            <select type="number" value={size} onChange={onChangeSize}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </label>
        </div>
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
      {isPostEmpty ? (
        <div className="flex-center paginationPostsEmptyBox">
          <div>
            <FcReading className="paginationPostsEmptyIcon" />
          </div>
          <div className="paginationPostsEmptyText">
            <span>Find your Favorite Book ! </span>
          </div>
        </div>
      ) : (
        posts.map((book, index) => (
          <div
            key={index}
            className="flex-vertical-center paginationTotalContetnBox"
          >
            {loadingStatus === "fulfilled" ? (
              <a
                target="_blank"
                href={book.url}
                onClick={() => handleAddRecentlySeen(book)}
              >
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
                      handleAddRecentlySeen(book);
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
        ))
      )}
      {query ? (
        <div className="positionA paginationLeftTotal">
          <div className="positionR paginationLeftBox">
            <div className="positionA flex-center paginationLeftBox">
              <p className="paginationLeftText">최근 본 상품</p>
              <div className="paginationLeftContentBox">
                {recentlySeen.map((book, idx) => (
                  <div
                    className="positionR paginationLeftContent"
                    key={book.isbn + idx}
                  >
                    <img
                      className="paginationContentImg"
                      alt="book"
                      src={book.thumbnail}
                    />
                    <AiOutlineClose
                      onClick={() => handleDeleteRecentlySeen(book)}
                      className="positionA cursorPointer paginationContentImgXbtn"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
