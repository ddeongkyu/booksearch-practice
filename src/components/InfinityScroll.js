import React, { useState, useCallback, useRef } from "react";
import useBookSearch from "../hooks/useBookSesarch";
import Loader from "../Loader";
import onAddToCart from "../util/onAddToCart";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "../slices/bookSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ModalPortal from "../portal/ModalPortal";
import Modal from "./Modal";
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
  const navigate = useNavigate();
  const handleGoBackBtn = () => {
    navigate(-1);
  };
  const handleGoShoppingBtn = () => {
    navigate("/shoppingCart");
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
  };
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
      <div className="flex-whatever infiniteHeadIconBoxBox">
        <BiArrowBack
          className="cursorPointer ArrowBackIcon"
          onClick={handleGoBackBtn}
        />
        <AiOutlineShoppingCart
          onClick={handleGoShoppingBtn}
          className="cursorPointer ArrowBackIcon"
        />
      </div>

      <div className="inputStyle flex-center">
        <input
          className="input_search"
          placeholder="검색어 입력 후 Enter"
          type="text"
          onKeyPress={onKeyPressEnter}
          onChange={handleSearch}
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
                className="bookListContentBox flex-center"
                key={contents.title + index}
              >
                <div className="bookListContentTitleAndAuthorsBox flex-center">
                  <div className="flex-center">
                    <strong className="bookListTitleF">{contents.title}</strong>
                  </div>
                </div>
                <div className=" flex-center">
                  <a className="flex-center " href={contents.url}>
                    <img
                      alt="Thumb"
                      className="bookListContentThumbnail"
                      src={contents.thumbnail}
                    />
                  </a>
                </div>
                <div className="bookListContentTitleAndAuthorsBox flex-center">
                  <div className="bookListContentAuthors flex-center">
                    {contents.authors}
                  </div>
                  <div className="bookListContentAuthors flex-center">
                    {contents.sale_price.toLocaleString("ko-KR")}&nbsp;원
                  </div>
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
                    장바구니
                  </button>
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
