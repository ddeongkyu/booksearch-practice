import React, { useEffect, useState } from "react";
import { bookSearch } from "./api";
import "./style.scss";
import BookList from "./components/BookList";
function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const searchBook = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      setQuery(text);
    }
  };
  const bookSearchHttpHandler = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy",
      page: 1,
      size: 15,
    };

    const { data } = await bookSearch(params); // api 호출
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };
  console.log(books);
  useEffect(() => {
    if (query.length > 0) {
      bookSearchHttpHandler(query, true);
      console.log("useEffect 호출!");
    }
  }, [query]);
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
      <BookList books={books} />
    </>
  );
}

export default App;
