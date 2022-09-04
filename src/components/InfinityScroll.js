import React, { useState, useCallback, useRef, useEffect } from "react";
import useBookSearch from "../hooks/useBookSesarch";
import Loader from "../Loader";
import onAddToCart from "../util/onAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart, setRecentlySeen } from "../slices/bookSlice";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import ModalPortal from "../portal/ModalPortal";
import Modal from "./Modal";
import onDiscountRate from "../util/onDiscountRate";
import IndicateModal from "./IndicateModal";
import Loading from "./Loading";
function InfinityScroll() {
  const dispatch = useDispatch();
  const { shoppingCart, recentlySeen } = useSelector((state) => {
    return state.book;
  });
  const [scrollPx, setScrollPx] = useState(0);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [indicateModalOpen, setIndicateModalOpen] = useState(false);
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const [pageNumber, setPageNumber] = useState(1);
  const { books, searchConfig, loadingStatus } = useBookSearch(
    query,
    pageNumber
  );
  const imageScrollHandeler = () => {
    setScrollPx(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", imageScrollHandeler);
    return () => {
      window.removeEventListener("scroll", imageScrollHandeler);
    };
  });

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
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      setPageNumber(1);
    }
  };
  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const onSearchClick = () => {
    setQuery(inputValue);
    setPageNumber(1);
  };
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (searchConfig.isEnd) {
        alert("마지막 항목이에요!");
      } else {
        if (searchConfig.loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && searchConfig.hasMore) {
            setPageNumber((prev) => prev + 1);
          }
        });
        if (node) observer.current.observe(node);
      }
    },
    [searchConfig.loading, searchConfig.hasMore]
  );
  const isRecentlySeenEmpty = recentlySeen.length === 0;
  const isResponsive = window.visualViewport.width <= 430;
  const handleScrollToOnce = () =>
    window.scrollTo({
      top: 240,
      behavior: "smooth",
    });
  const handleScrollToTwice = () =>
    window.scrollTo({
      top: 1345,
      behavior: "smooth",
    });
  const handleScrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const handleAutoBtn = () => {
    document.body.style.cursor = "not-allowed";
    setIndicateModalOpen(!indicateModalOpen);
    setTimeout(() => {
      setInputValue("자바스크립트");
    }, 500);
    setTimeout(() => {
      setQuery("자바스크립트");
    }, 2000);
    setTimeout(() => {
      handleScrollToOnce();
    }, 4000);
    setTimeout(() => {
      handleScrollToTwice();
    }, 6000);
    setTimeout(() => {
      handleScrollToTop();
      setInputValue("");
      document.body.style.cursor = "default";
      setIndicateModalOpen(false);
    }, 8000);
    setTimeout(() => {
      setModalOpen(true);
    }, 10000);
    setTimeout(() => {
      setModalOpen(false);
    }, 12000);
  };
  // const bb = 6;
  // const aa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // console.log(aa.slice(0, -Math.abs(bb - 10)));
  return (
    <div className="infiniteRealTotal">
      <div className="inputStyle flex-center positionR">
        <input
          className="input_search"
          placeholder="검색어를 입력해 주세요."
          type="text"
          onKeyPress={onKeyPressEnter}
          value={inputValue}
          onChange={onChangeInput}
        />
        <button
          onClick={handleAutoBtn}
          className="infiniteTutorialBtn cursorPointer positionA"
        >
          오토 파일럿
        </button>

        {isResponsive && (
          <BsSearch
            className="input_search_icon cursorPointer positionA"
            onClick={onSearchClick}
          />
        )}
      </div>
      {query && (
        <div className="infinityLeftTotal">
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
      )}{" "}
      <div className="bookListContainer flex-center">
        {books.map((contents, index) => {
          if (books.length === index + 1) {
            return (
              <div key={index} ref={lastBookElementRef}>
                {books.title}
              </div>
            );
          } else {
            return (
              <div
                className="positionR bookListContentBox flex-center"
                key={contents.title + index}
              >
                <div className="bookListH positionA flex-center">
                  <a
                    className="flex-center"
                    target="_blank"
                    href={contents.url}
                  >
                    <img
                      alt="Thumbnail"
                      className="cursorPointer bookListContentThumbnail"
                      src={contents.thumbnail}
                    />
                  </a>
                  <div className="flex-center positionA paginationDiscountRate">
                    <strong>
                      {onDiscountRate(contents.sale_price, contents.price)}% Off
                    </strong>
                  </div>
                </div>
                <div className="bookListContentTitleAndAuthorsBox flex-vertical-center">
                  <div className="positionA bookListContentTitleAndAuthorsBox flex-center">
                    <div className="flex-center">
                      <span className="bookListTitleF">{contents.title}</span>
                    </div>
                    <div className="bookListContentAuthors flex-center">
                      {contents.sale_price < 0
                        ? contents.price.toLocaleString("ko-KR")
                        : contents.sale_price.toLocaleString("ko-KR")}
                      원
                    </div>
                  </div>
                  <div className="positionA bookListContentAuthorss flex-center">
                    {contents.authors}
                  </div>
                  <hr className="positionA" />
                  <div className="positionA  bookListShopBtnBox">
                    <button
                      onClick={() => {
                        onAddToCart(
                          setShoppingCart,
                          contents,
                          1,
                          shoppingCart,
                          dispatch
                        );
                        handleModalToggle();
                        handleAddRecentlySeen(contents);
                      }}
                      className="cursorPointer flex-center bookListShoppingCartBtn"
                    >
                      <AiOutlineShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div>{loadingStatus === "loading" && <Loader />}</div>
      {modalOpen && (
        <ModalPortal>
          <Modal onClose={handleModalToggle} />
        </ModalPortal>
      )}
      {indicateModalOpen && (
        <ModalPortal>
          <IndicateModal />
          <Loading />
        </ModalPortal>
      )}
    </div>
  );
}

export default InfinityScroll;
