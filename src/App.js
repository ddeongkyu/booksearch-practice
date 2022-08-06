import React, { useEffect, useState, useRef } from "react";
import { bookSearch } from "./api";
import "./style.scss";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "./slices/bookSlice";
function App() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const [books, setBooks] = useState([]);
  const [network, setNetwork] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const { query } = useSelector((state) => {
    return state.book;
  });
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      const { value } = e.target;
      dispatch(setQuery(value));
    }
    if (page === 1) {
      setPage((prev) => prev + 1);
    }
  };

  const bookSearchHttpHandler = async () => {
    const params = {
      query,
      sort: "latest",
      size: 9,
      page,
    };
    console.log("bookSearchHttpHandler Query : ", query);
    setNetwork("loading");
    setIsLoading(true);
    const { data } = await bookSearch(params);
    setIsLoading(false);
    setBooks(data.documents);
    setNetwork("fulfilled");
    console.log("bookSearchHttpHandler");
  };
  const getMoreBooks = async () => {
    try {
      const params = {
        query: query,
        sort: "latest",
        page,
        size: 9,
      };
      const { data } = await bookSearch(params);
      setBooks((prev) => prev.concat(data.documents));
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        console.log(`HTTP 400 error occured`);
      }
    }
  };

  useEffect(() => {
    console.log("query change");
    if (query.length > 0) {
      bookSearchHttpHandler();
      setNetwork("loading");
      setIsLoading(true);
    }
  }, [query]);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getMoreBooks();
          setPage((prev) => prev + 1);
          console.log("Infinite-scroll");
        }
      },
      { threshold: 1 }
    )
  );
  useEffect(() => {
    if (page) {
      getMoreBooks();
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
  console.log("books :", books);
  return (
    <>
      <div className="container">
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
        {!isLoading && (
          <div style={{ width: "100vw", height: "80px" }} ref={setTarget}></div>
        )}
      </div>
    </>
  );
}

export default App;
