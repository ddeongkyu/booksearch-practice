import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  books: [],
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
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setIsloading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setQuery, setText, setBooks, setIsloading } = bookSlice.actions;

export default bookSlice.reducer;
