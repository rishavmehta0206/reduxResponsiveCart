import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../services/fetchData";
export const fetchDataFromAPI = createAsyncThunk(
  "fetch/fetchDataFromAPI",
  async (thunkAPI) => {
    try {
      return await fetchData.fetchProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialValue = {
  products: [],
  isLoading: false,
  isError: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialValue,
  reducers: {},
  extraReducers: {
    [fetchDataFromAPI.pending]: (state, action) => {
      state.products = [];
      state.isLoading = true;
    },
    [fetchDataFromAPI.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = false;
    },
    [fetchDataFromAPI.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.products = [];
    },
  },
});

export default productSlice.reducer;
