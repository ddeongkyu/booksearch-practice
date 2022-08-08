import React, { useState, useEffect } from "react";
import axios from "axios";
function Pagination() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offeset = (page - 1) * limit;
  useEffect(() => {
    axios
      .get("https://dapi.kakao.com/v3/search/book?target=title", {
        params: {
          query: "해리포터",
          page: page,
        },
        headers: {
          Authorization: "KakaoAK 9b6568fb6775ffe0ebc505a7e13af7f6",
        },
      })
      .then((res) => {
        const pageable_max = Math.ceil(res.data.meta.pageable_count / 10);
        setPosts(res.data.documents);
        console.log(posts);
        // setPagebale(pageable_max);
        // setBooks((prev) => prev.concat(res.data.documents));
        // setHasMore(res.data.documents.length > 0);
        // setLoading(false);
        // 과제 : query에 대한 전~~~~체 배열을 구해야됨.
        // 여기서 for문을 돌려볼까? for문 돌려서
        // res.data.meta.pageable_count / size 올림한것만큼 돌려서 -> 이게 pageable_max네
        // 그러려면 돌아갈때마다 page도 1씩 증가시켜야되고... pageable_max도 사용해야겠네?
        for (let i = 0; i < pageable_max; i++) {
          console.log(setPosts());
        }
        console.log("max page : ", pageable_max);
        console.log("pageable_count : ", res.data.meta.pageable_count);
      });
  }, []);
  return (
    <>
      <div className="inputStyle">
        <input className="input_search" type="text" />
        <button>zzzzz</button>
      </div>
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
    </>
  );
}
export default Pagination;
