import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  query: "",
  text: "",
  network: {
    status: "",
    errorMessage: "",
  },
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
    setNetwork: (state, action) => {
      state.network.status = action.payload;
    },
    setNetworkError: (state, action) => {
      state.network.errorMessage = action.payload;
    },
  },
});

export const { setQuery, setText, setBooks, setNetwork, setNetworkError } =
  bookSlice.actions;

export default bookSlice.reducer;
