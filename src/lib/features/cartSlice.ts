import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

let items: any[] = []

if (typeof window !== 'undefined') {
  items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')!) : []
}

interface Product {
  _id: string;
  name: string;
  category: string;
  amount: number; // so luong san pham duoc chon de checkout 
}


export interface CartState {
  cartItems: Product[]
}

const initialState: CartState = {
  cartItems: items
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      if (state.cartItems.find(item => item._id === action.payload._id)) {
        state.cartItems = state.cartItems.map(item =>
          item._id === action.payload._id
            ? { ...item, amount: action.payload.amount}
            : item
        )
      }
      else {
        state.cartItems.push(action.payload)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems.map(item => item)))
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload.id)
    },
    clearCart(state) {
      state.cartItems = []  
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state: RootState) => state.cart.cartItems;




