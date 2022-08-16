import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
  posts: [],
  query: "",
  searchConfig: {
    size: 10,
    pageNumber: 1,
    filter: "accuracy",
    sort: "",
    pageable: 1,
  },
  pageArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  searchWord: [],
  recentlySeen: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchConfig: (state, action) => {
      state.searchConfig = action.payload;
    },
    setPageArray: (state, action) => {
      state.pageArray = action.payload;
    },
    setSearchWord: (state, action) => {
      state.searchWord = action.payload;
    },
    setRecentlySeen: (state, action) => {
      state.recentlySeen = action.payload;
    },
  },
});

export const {
  setShoppingCart,
  setPosts,
  setQuery,
  setSearchConfig,
  setPageArray,
  setSearchWord,
  setRecentlySeen,
} = bookSlice.actions;

export default bookSlice.reducer;
