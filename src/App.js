import React, { useEffect, useState, useRef } from "react";
import { bookSearch } from "./api";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "./slices/bookSlice";
function App() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const [books, setBooks] = useState([]);
  const [network, setNetwork] = useState("");
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState(0);
  const { query } = useSelector((state) => {
    return state.book;
  });
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      dispatch(setQuery(value));
    }
  };
  const bookSearchHttpHandler = async () => {
    try {
      const params = {
        query: "해리포터",
        sort: "latest",
        page,
        size: 9,
      };
      setNetwork("loading");
      const { data } = await bookSearch(params);
      const pageable_max = Math.ceil(data.meta.pageable_count / 9);
      console.log("max : ", pageable_max);
      setPageable(pageable_max);
      // if (reset) {
      //   setBooks(data.documents);
      // } else {
      setBooks((prev) => prev.concat(data.documents));
      // }
      setNetwork("fulfilled");
      console.log("bookSearchHttpHandler");
      console.log(data.documents.map((a) => a.title));
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        console.log(`HTTP 400 error occured`);
      }
    }
  };
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler();
      setNetwork("loading");
      console.log("query change");
    }
  }, [query]);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bookSearchHttpHandler();
          setPage((prev) => prev + 1);
          console.log("Infinite-scroll");
        }
      },
      { threshold: 1 }
    )
  );

  useEffect(() => {
    if (page < pageable) {
      bookSearchHttpHandler();
      console.log("increase page");
    }
  }, [page]);

  useEffect(() => {
    const currentTarget = target;
    const currentObserver = observer.current;
    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [target]);
  console.log("query : ", query);
  console.log("book length : ", books.length);
  console.log("network : ", network);
  return (
    <>
      <div className="inputStyle">
        <input
          type="search"
          placeholder="검색어 입력->엔터"
          name="query"
          className="input_search"
          onKeyDown={onKeyPressEnter}
        />
      </div>
      <div className="bookListContainer">
        {network === "loading" ? (
          <div>Loading....</div>
        ) : query ? (
          books.map((contents, idx) => (
            <div className="bookListContentBox" key={idx}>
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
        ) : null}
        {books.length ? <div ref={setTarget}></div> : null}
      </div>
    </>
  );
}

export default App;
