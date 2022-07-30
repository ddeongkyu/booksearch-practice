import React from "react";
function BookList({ books }) {
  return (
    <div className="bookListContainer">
      {books.map((contents) => (
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
      ))}
    </div>
  );
}

export default BookList;
