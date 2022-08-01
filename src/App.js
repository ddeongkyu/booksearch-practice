import React, { useEffect, useState } from "react";
import { bookSearch } from "./api";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, setText, setBooks, setNetwork } from "./slices/bookSlice";
import Loader from "./Loader";
function App() {
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { books, query, text, network } = useSelector((state) => {
    return state.book;
  });
  const searchBook = (e) => {
    const { value } = e.target;
    dispatch(setText(value));
  };
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(setQuery(text));
    }
  };

  const bookSearchHttpHandler = async () => {
    const params = {
      query: query,
      sort: "accuracy",
      page: page,
      size: 9,
    };
    dispatch(setNetwork("loading"));
    const { data } = await bookSearch(params);
    const aa = books.concat(data.documents);
    dispatch(setBooks(aa));
    dispatch(setNetwork("fulfilled"));
    console.log(books);
  };

  // const bookSearchHttpHandler = async (query, reset) => {
  //   const params = {
  //     query: query,
  //     sort: "accuracy",
  //     page: page,
  //     size: 9,
  //   };
  //   const { data } = await bookSearch(params); // api 호출
  //   if (reset) {
  //     dispatch(setBooks(data.documents));
  //   } else {
  //     dispatch(setBooks(books.concat(data.documents)));
  //   }
  //   dispatch(setNetwork("fulfilled"));
  // };

  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0,
  };
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && network.status === "fulfilled") {
      observer.unobserve(entry.target);
      await bookSearchHttpHandler(query, false);
      observer.observe(entry.target);
    }
  };
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true);
      dispatch(setNetwork("loading"));
    }
  }, [query]);

  // 이벤트 발생-> setPage(prev => prev + 1) 한다음 그 값을 setBooks에 concat한다음 dispatch??
  return (
    <>
      <div className="container">
        <input
          type="search"
          placeholder="검색어를 입력 후 Enter"
          name="query"
          className="input_search"
          onChange={searchBook}
          onKeyDown={onKeyPressEnter}
        />
      </div>
      <div className="bookListContainer">
        {network.status === "loading" ? (
          <div>Loading....</div>
        ) : (
          books.map((contents) => (
            <div className="bookListContentBox" key={contents.isbn}>
              <div className="bookListContentThumb">
                <a href={contents.url}>
                  <img
                    alt="Thumb"
                    className="bookListContentThumbnail"
                    src={contents.thumbnail}
                  />
                </a>
              </div>
              <div className="bookListContentTitle">
                {contents.title}({contents.sale_price}원)
              </div>
            </div>
          ))
        )}
        <div ref={setTarget} className="Target-Element">
          {network.status === "loading" && <Loader />}
        </div>
      </div>
    </>
  );
}

export default App;
