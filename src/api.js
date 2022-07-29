import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: "KakaoAK 9b6568fb6775ffe0ebc505a7e13af7f6",
  },
});

export const bookSearch = (params) => {
  return Kakao.get("/v3/search/book", { params });
};
