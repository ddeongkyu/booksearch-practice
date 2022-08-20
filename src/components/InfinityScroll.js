import React, { useState, useCallback, useRef } from "react";
import useBookSearch from "../hooks/useBookSesarch";
import Loader from "../Loader";
import onAddToCart from "../util/onAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "../slices/bookSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ModalPortal from "../portal/ModalPortal";
import Modal from "./Modal";
import onDiscountRate from "../util/onDiscountRate";
function InfinityScroll() {
  const dispatch = useDispatch();
  const { shoppingCart } = useSelector((state) => {
    return state.book;
  });
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };
  const [pageNumber, setPageNumber] = useState(1);
  const { books, searchConfig, loadingStatus } = useBookSearch(
    query,
    pageNumber
  );
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
      setPageNumber(1);
    }
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

  return (
    <div className="infiniteRealTotal">
      <div className="inputStyle flex-center">
        <input
          className="input_search"
          placeholder="검색어를 입력해 주세요."
          type="text"
          onKeyPress={onKeyPressEnter}
        />
      </div>
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
    </div>
  );
}

export default InfinityScroll;
