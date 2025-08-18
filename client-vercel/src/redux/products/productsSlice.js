import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsAsync,
  fetchProductByIdAsync,
  fetchProductsByFiltersAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  createProductAsync,
  editProductAsync,
  fetchProductCountAsync,
} from "./productsThunks";

const initialState = {
  products: null,
  brands: [],
  categories: [],
  totalItems: 0,
  selectedProduct: null,
  newProduct: null,
  status: "idle",
  page: 1,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    resetNewProduct(state) {
      state.newProduct = null;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
        state.newProduct = action.payload;
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products.splice(index, 1, action.payload);
        state.newProduct = action.payload;
      })
      .addCase(fetchProductCountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalItems = action.payload.totalItems;
      });
  },
});

export default productsSlice.reducer;
export const { clearSelectedProduct, resetNewProduct, setPage } = productsSlice.actions;
