import React, { useState, useEffect } from "react";
import { bookSearch } from "../api";
import onAddToCart from "../util/onAddToCart";
import { FcReading } from "react-icons/fc";
import { AiOutlineClose, AiFillCaretUp } from "react-icons/ai";
import onDiscountRate from "../util/onDiscountRate";
import Modal from "./Modal";
import ModalPortal from "../portal/ModalPortal";
import { useDispatch, useSelector } from "react-redux";
import {
  setShoppingCart,
  setSearchConfig,
  setPosts,
  setQuery,
  setRecentlySeen,
} from "../slices/bookSlice";
import { waiting, fulfilled, onLoading } from "../constants";
import { BsSearch } from "react-icons/bs";
import generateRandomId from "../util/generateRandomId";
function Pagination() {
  const [loadingStatus, setLoadingStatus] = useState(waiting);
  const [inputValue, setInputValue] = useState("");
  const { shoppingCart, posts, query, searchConfig, recentlySeen } =
    useSelector((state) => {
      return state.book;
    });
  const { pageable, pageNumber, sort, filter, size, searchWord, pageArray } =
    searchConfig;
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const onSearchClick = () => {
    const searchWordDup =
      searchWord.filter((a) => a.word === inputValue).length === 0;
    const searched = searchWordDup
      ? searchWord.concat({
          id: generateRandomId(),
          word: inputValue,
        })
      : searchWord;
    dispatch(setQuery(inputValue));
    dispatch(
      setSearchConfig({
        pageNumber: 1,
        filter: "accuracy",
        pageArray,
        searchWord: searched,
      })
    );
  };
  const onChangeInputQuantity = (idx, book, e) => {
    const { value } = e.target;
    const regMinus = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
    if (regMinus.test(value)) {
      alert("수량은 양수로 부탁드려요!");
    }
    const regQuantity = posts.map((a) =>
      a.isbn + idx === book.isbn + idx ? { ...a, quantity: Math.abs(value) } : a
    );
    dispatch(setPosts(regQuantity));
  };
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      const searchWordDup =
        searchWord.filter((a) => a.word === value).length === 0;
      const searched = searchWordDup
        ? searchWord.concat({
            id: generateRandomId(),
            word: value,
          })
        : searchWord;
      dispatch(setQuery(value));
      dispatch(
        setSearchConfig({
          pageNumber: 1,
          filter: "accuracy",
          pageArray,
          searchWord: searched,
        })
      );
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
    dispatch(setSearchConfig({ pageable: pageable_count }));
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
    dispatch(setSearchConfig({ searchWord: deleteArray }));
  };
  const handleSearchdWord = (word) => {
    dispatch(setQuery(word));
    dispatch(setSearchConfig({ pageNumber: 1, filter: "accuracy", pageArray }));
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
    dispatch(setSearchConfig({ pageNumber: value }));
  };
  const onClickPageMinus = () => {
    dispatch(setSearchConfig({ pageNumber: pageNumber - 1 }));
  };
  const onClickPagePlus = () => {
    dispatch(setSearchConfig({ pageNumber: pageNumber + 1 }));
  };
  const onClickPageDoubleMinus = () => {
    if (pageNumber - 10 > 0) {
      const minusArray = pageArray.map((number) => number - 10);
      dispatch(
        setSearchConfig({ pageNumber: pageNumber - 10, pageArray: minusArray })
      );
    } else {
      alert("첫 번째 페이지로 이동합니다.");
      dispatch(setSearchConfig({ pageNumber: 1 }));
    }
  };
  const onClickPageDoublePlus = () => {
    if (pageNumber + 10 < pageable) {
      const includesArray = pageArray.includes(pageable - 10);
      const increase = pageArray.map((number) => number + 10);
      if (!includesArray) {
        dispatch(
          setSearchConfig({ pageNumber: pageNumber + 10, pageArray: increase })
        );
      } else if (includesArray) {
        const findIndex = pageArray.map((a) => a + 10).indexOf(pageable);
        const finalpageArray = increase.slice(0, findIndex + 1);
        dispatch(
          setSearchConfig({
            pageNumber: pageNumber + 10,
            pageArray: finalpageArray,
          })
        );
      }
    }
    if (pageNumber + 10 >= pageable) {
      dispatch(setSearchConfig({ pageNumber: pageable }));
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
    dispatch(
      setSearchConfig({
        size: Number(value),
        pageNumber: 1,
        filter: "accuracy",
        sort: "accuracy",
        pageArray,
      })
    );
  };
  const onClickNotyet = () => {
    alert("개발중!");
  };
  const accuracyOrder = () => {
    dispatch(setSearchConfig({ filter: "accuracy", sort: "accuracy" }));
  };
  const latestOrder = () => {
    dispatch(setSearchConfig({ filter: "latest", sort: "latest" }));
  };
  const descendingOrder = () => {
    const descendingArray = [...posts].sort((a, b) => {
      return b.sale_price - a.sale_price;
    });
    dispatch(setPosts(descendingArray));
    dispatch(setSearchConfig({ filter: "desc" }));
  };
  const ascendingOrder = () => {
    const ascendingArray = [...posts].sort((a, b) => {
      return a.sale_price - b.sale_price;
    });
    dispatch(setPosts(ascendingArray));
    dispatch(setSearchConfig({ filter: "asc" }));
  };
  const discountRateOrder = () => {
    const discountRateArray = [...posts].sort((a, b) => {
      return (
        Math.ceil(((a.sale_price - a.price) / a.sale_price) * 100) -
        Math.ceil(((b.sale_price - b.price) / b.sale_price) * 100)
      );
    });
    dispatch(setSearchConfig({ filter: "discount" }));
    dispatch(setPosts(discountRateArray));
  };
  const nameSort = () => {
    const nameArray = [...posts].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    dispatch(setPosts(nameArray));
    dispatch(setSearchConfig({ filter: "name" }));
  };
  const isPostEmpty = posts.length === 0;
  const handleScrollToTheTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  const isRecentlySeenEmpty = recentlySeen.length === 0;
  const isResponsive = window.visualViewport.width <= 430;
  return (
    <div className="paginationTotalTotalBox flex-vertical-center">
      <div className="inputStyle flex-center">
        <input
          className="input_search"
          onKeyPress={onKeyPressEnter}
          type="text"
          placeholder="검색어를 입력해 주세요."
          value={inputValue}
          onChange={onChangeInput}
        />
        {isResponsive && (
          <BsSearch
            className="input_search_icon cursorPointer positionA"
            onClick={onSearchClick}
          />
        )}
      </div>
      {query && (
        <div className="flex-vertical-center papginationrecent">
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
        </div>
      )}
      {query && (
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
            &nbsp;&nbsp;|&nbsp;&nbsp;
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
            &nbsp;&nbsp;|&nbsp;&nbsp;
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
            &nbsp;&nbsp;|&nbsp;&nbsp;
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
            &nbsp;&nbsp;|&nbsp;&nbsp;
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
            &nbsp;&nbsp;|&nbsp;&nbsp;
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
          </li>
        </ul>
      )}
      {query && (
        <div className="paginationLeftTotal">
          <div className="flex-center paginationLeftBox">
            {!isRecentlySeenEmpty && (
              <p className="paginationLeftText">최근 본 상품</p>
            )}
            <div className="paginationLeftContentBox">
              {recentlySeen.map((book, idx) => (
                <div
                  className="positionR flex-center paginationLeftContent"
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
      )}
      <div className="paginationContentTotalTotal positionR flex-vertical-center">
        {isPostEmpty ? (
          <div className="flex-center paginationPostsEmptyBox">
            <div>
              <FcReading className="paginationPostsEmptyIcon" />
            </div>
            <div className="paginationPostsEmptyText">
              <span>Find Your Favorite Book! </span>
            </div>
          </div>
        ) : (
          posts.map((book, index) => (
            <div
              key={book.isbn + index}
              className="flex-vertical-center paginationTotalContetnBox"
            >
              {loadingStatus === fulfilled && (
                <a
                  target="_blank"
                  href={book.url}
                  onClick={() => handleAddRecentlySeen(book)}
                >
                  <img
                    alt="Thumbnail"
                    src={book.thumbnail}
                    className="paginationImgImgImg"
                  />
                </a>
              )}
              {loadingStatus === onLoading && (
                <div className="paginationLoadingImg"></div>
              )}
              <div className="paginationDetailBox">
                {loadingStatus === fulfilled && (
                  <>
                    <div className="paginationTitle">{book.title}</div>
                    <div className="paginationDetailInformationBox">
                      {book.authors}&nbsp;| &nbsp;
                      {book.publisher === "" ? "" : book.publisher + "  | "}
                      &nbsp;
                      {book.datetime.slice(0, 10)}
                    </div>
                    <div className="paginationContents">{book.contents}</div>
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
                      <div className="flex-vertical-center positionR paginationSalePercent">
                        {onDiscountRate(book.sale_price, book.price)}% 할인
                      </div>
                    </div>
                  </>
                )}
                {loadingStatus === onLoading && (
                  <div className="paginationDetailBoxLoading"></div>
                )}
              </div>

              <div className="paginationBtnBox">
                {loadingStatus === fulfilled && (
                  <>
                    <p
                      style={{
                        width: isResponsive ? "80px" : "100%",
                        fontSize: isResponsive ? "10px" : "14px",
                      }}
                    >
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
                )}
                {loadingStatus === onLoading && (
                  <div className="paginationBtnLoading"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {query && (
        <div className="flex-vertical-center paginationLabelBox">
          <button
            className="cursorPointer paginationScrollBtn"
            onClick={handleScrollToTheTop}
          >
            <AiFillCaretUp />
          </button>
          <label>
            <select type="number" value={size} onChange={onChangeSize}>
              <option value="10">10개씩 보기</option>
              <option value="20">20개씩 보기</option>
              <option value="30">30개씩 보기</option>
              <option value="40">40개씩 보기</option>
            </select>
          </label>
        </div>
      )}
      {query && (
        <nav className="nav flex-center">
          <button
            className="buttonStyle cursorPointer"
            onClick={onClickPageDoubleMinus}
          >
            &lt;&lt;
          </button>
          <button
            className="buttonStyle cursorPointer"
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
                  className="cursorPointer buttonStyle"
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
                  className="cursorPointer buttonStyle"
                  aria-current={pageNumber === number ? "page" : null}
                  key={number + idx}
                >
                  {number}
                </button>
              ))}
          <button
            className="cursorPointer buttonStyle"
            disabled={pageNumber === pageable}
            onClick={onClickPagePlus}
          >
            &gt;
          </button>
          <button
            className="cursorPointer buttonStyle"
            onClick={onClickPageDoublePlus}
          >
            &gt;&gt;
          </button>
        </nav>
      )}
      {modalOpen && (
        <ModalPortal>
          <Modal onClose={handleModalToggle} />
        </ModalPortal>
      )}
    </div>
  );
}
export default Pagination;
