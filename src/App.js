import useBookSearch from "./hooks/useBookSesarch";
import { useState, useRef, useCallback } from "react";
import "./style.scss";
import Loader from "./Loader";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { books, hasMore, loading, pageable } = useBookSearch(
    query,
    pageNumber
  );
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
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  if (pageNumber === pageable) {
    setPageNumber(1);
    alert("마지막 항목입니다! 처음부터 다시 보여드릴게요!");
  }
  console.log("PR");
  return (
    <>
      <div className="inputStyle">
        <input
          className="input_search"
          type="text"
          onKeyPress={onKeyPressEnter}
          onChange={handleSearch}
        />
      </div>
      <div className="bookListContainer">
        {books.map((contents, index) => {
          if (books.length === index + 1) {
            return <div key={index} ref={lastBookElementRef} />;
          } else {
            return (
              <div className="bookListContentBox" key={index}>
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
                <div className="bookListContentAuthors">{contents.authors}</div>
              </div>
            );
          }
        })}
      </div>
      <div>{loading && <Loader />}</div>
    </>
  );
}

export default App;
