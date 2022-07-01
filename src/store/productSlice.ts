import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface IProducts {
  products: IProduct[];
  count: number;
}

export interface IProductState {
  products: IProducts | null;
  product: IProduct | null;
  categories: string[] | null;
}

const initialState: IProductState = {
  products: null,
  product: null,
  categories: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProducts>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setProducts, setProduct, setCategories } = productSlice.actions;

export default productSlice.reducer;
