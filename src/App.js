import React, { useEffect, useState } from "react";
import { bookSearch } from "./api";
function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const searchBook = (text) => {
    setQuery(text);
  };

  const onKeyPressEnter = (e) => {
    if (e.keyCode === "Enter") {
      console.log("Enter");
    }
  };
  const bookSearchHttpHandler = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy",
      page: 1,
      size: 10,
    };

    const { data } = await bookSearch(params); // api 호출
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
    console.log(data.documents);
  };
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true);
    }
  }, [query]);
  const btnClick = () => {
    setQuery("React");
  };
  const btnClick2 = () => {
    setQuery("Apple");
  };
  const btnClick3 = () => {
    setQuery("Javascript");
  };
  return (
    <>
      <div className="container">
        <input
          type="search"
          placeholder="검색어를 입력 하세요..."
          name="query"
          className="input_search"
          onChange={searchBook}
          onKeyDown={onKeyPressEnter}
        />
        <button onClick={btnClick}>REACT</button>
        <button onClick={btnClick2}>Apple</button>
        <button onClick={btnClick3}>JS</button>
      </div>
    </>
  );
}

export default App;
