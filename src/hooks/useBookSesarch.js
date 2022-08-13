import { useState, useEffect } from "react";
import axios from "axios";
import { fulfilled, onLoading, waiting } from "../constants";
export default function useBookSearch(query, pageNumber) {
  const [searchConfig, setSearchConfig] = useState({
    hasMore: false,
    error: false,
    isEnd: false,
    loading: true,
    pageable: 0,
  });
  const [books, setBooks] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(waiting);
  useEffect(() => {
    setBooks([]);
  }, [query]);
  useEffect(() => {
    if (query) {
      //load, error
      setSearchConfig((prev) => {
        return { ...prev, loading: true };
      });
      setSearchConfig((prev) => {
        return { ...prev, error: false };
      });
      let cancel;
      setLoadingStatus(onLoading);
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
        setSearchConfig((prev) => {
          return { ...prev, pageable: pageable_max };
        });
        setBooks((prev) => prev.concat(res.data.documents));
        setSearchConfig((prev) => {
          return { ...prev, hasMore: res.data.documents.length > 0 };
        });
        setSearchConfig((prev) => {
          return { ...prev, isEnd: res.data.meta.is_end };
        });
        setSearchConfig((prev) => {
          return { ...prev, loading: false };
        });
        setLoadingStatus(fulfilled);
        if (!res.data.documents.length) {
          alert("검색된 책이 없어요! 검색어를 확인해주세요!");
        }
      }
      fetchData();
      return () => cancel();
    }
  }, [query, pageNumber]);
  return {
    books,
    loadingStatus,
    searchConfig,
  };
}
