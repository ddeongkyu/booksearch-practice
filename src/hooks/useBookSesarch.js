import { useState, useEffect } from "react";
import axios from "axios";
export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageable, setPagebale] = useState(0);
  useEffect(() => {
    setBooks([]);
  }, [query]);
  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(false);
      let cancel;
      async function fetchData() {
        const res = await axios.get(
          "https://dapi.kakao.com/v3/search/book?target=title",
          {
            params: {
              query,
              size: 9,
              page: pageNumber,
            },
            headers: {
              Authorization: "KakaoAK 9b6568fb6775ffe0ebc505a7e13af7f6",
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );
        const pageable_max = Math.ceil(res.data.meta.pageable_count / 9);
        setPagebale(pageable_max);
        setBooks((prev) => prev.concat(res.data.documents));
        setHasMore(res.data.documents.length > 0);
        setLoading(false);
        if (!res.data.documents.length) {
          alert("검색된 책이 없어요! 검색어를 확인해주세요!");
        }
      }
      fetchData();
      return () => cancel();
    }
  }, [query, pageNumber]);
  return {
    loading,
    error,
    books,
    hasMore,
    pageable,
  };
}
