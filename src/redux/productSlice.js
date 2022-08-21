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
  cartItems: [],
  count: 0,
  total: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialValue,
  reducers: {
    addItemToCart: (state, { payload }) => {
      state.cartItems.push(payload);
      state.count += 1;
      state.total += parseFloat(payload.price);
      console.log(payload, state.cartItems.length, state.total, state.count);
    },
    removeItemFromCart: (state, { payload }) => {
      if (payload) {
        state.cartItems = state.cartItems.filter((item) => {
          return item.id !== payload.id;
        });
        state.total -= Math.floor(parseFloat(payload.price));
        state.count -= 1;
      } else {
        state.cartItems = [];
        state.total = 0;
        state.count = 0;
      }
    },
  },
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

export const { addItemToCart, removeItemFromCart } = productSlice.actions;
export default productSlice.reducer;
