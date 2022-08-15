import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
  posts: [],
  query: "",
  size: 10,
  pageNumber: 1,
  filter: "accuracy",
  pageable: 1,
  sort: "",
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
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPageable: (state, action) => {
      state.pageable = action.payload;
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
  setSize,
  setPageNumber,
  setFilter,
  setSort,
  setPageable,
  setPageArray,
  setSearchWord,
  setRecentlySeen,
} = bookSlice.actions;

export default bookSlice.reducer;
