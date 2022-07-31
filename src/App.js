import React, { useEffect, useCallback, useState, useRef } from "react";
import { bookSearch } from "./api";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, setText, setBooks, setIsloading } from "./slices/bookSlice";
import { useInView } from "react-intersection-observer";
function App() {
  const [page, setPage] = useState(1);
  const interSectRef = useRef();
  const dispatch = useDispatch();
  const { books, query, text, isLoading } = useSelector((state) => {
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
  const bookSearchHttpHandler = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy",
      page: page,
      size: 9,
    };

    const { data } = await bookSearch(params); // api 호출
    if (reset) {
      dispatch(setBooks(data.documents));
    } else {
      dispatch(setBooks(books.concat(data.documents)));
    }
    dispatch(setIsloading(false));
  };

  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true);
      dispatch(setIsloading(true));
    }
  }, [query]);
  const options = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0,
  };
  const handleObserver = useCallback(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log("is InterSecting");
      setPage((prev) => prev + 1);
    }
  }, []);
  useEffect(() => {
    console.log("page plus");
  }, [page]);
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (interSectRef.current) observer.observe(interSectRef.current);
    console.log("observing!");
    return () => observer.disconnect();
  }, [handleObserver]);
  console.log(books, "boooks array");
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
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          books.map((contents) => (
            <div
              ref={interSectRef}
              className="bookListContentBox"
              key={contents.isbn}
            >
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
      </div>
    </>
  );
}

export default App;
