import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookSearch } from "../api.js";
export const getBookList = createAsyncThunk("getBookList", async (query) => {
  const params = {
    query: query,
    sort: "accuracy",
    page: 1,
    size: 10,
  };

  const { data } = await bookSearch(params);
  return console.log(data.documents, "redux");
});

const initialState = {
  isLoading: false,
  bookList: [],
  query: "",
  text: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
  extraReducers: {
    [getBookList.pending]: (state) => (state.isLoading = true),
  },
  [getBookList.fulfilled]: (state, action) => {
    state.bookList = action.payload;
    state.isLoading = false;
  },
});

export const { setQuery, setText } = bookSlice.actions;

export default bookSlice.reducer;
