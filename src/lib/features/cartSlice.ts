import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

let items: any[] = [];

if (typeof window !== "undefined") {
  items =
    localStorage.getItem("cartItems") !== null
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [];
}

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  amount: number; // so luong san pham duoc chon de checkout
  variant: string;
}

export interface CartState {
  cartItems: Product[];
  checkoutItems: Product[];
}

const initialState: CartState = {
  cartItems: items,
  checkoutItems: items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      if (state.cartItems.find((item) => item._id === action.payload._id)) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, amount: action.payload.amount }
            : item
        );
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.id
      );
    },

    increment(state, action: PayloadAction<{ id: string }>) {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload.id
          ? { ...item, amount: item.amount + 1 }
          : item
      );
    },
    decrement(state, action: PayloadAction<{ id: string }>) {
      state.cartItems = state.cartItems.map((item) =>
        item._id === action.payload.id
          ? { ...item, amount: item.amount - 1 }
          : item
      );
    },

    addToCheckout(state, action: PayloadAction<Product>) {
      if (state.checkoutItems.find((item) => item._id === action.payload._id)) {
        state.checkoutItems = state.checkoutItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, amount: action.payload.amount }
            : item
        );
      } else {
        state.checkoutItems.push(action.payload);
      }
    },
    removeFromCheckout(state, action: PayloadAction<{ id: string }>) {
      state.checkoutItems = state.checkoutItems.filter(
        (item) => item._id !== action.payload.id
      );
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addToCheckout,
  removeFromCheckout,
  increment,
  decrement,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCheckoutItems = (state: RootState) =>
  state.cart.checkoutItems;
