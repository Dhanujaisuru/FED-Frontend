import { createSlice } from "@reduxjs/toolkit";

// Load cart state from localStorage
const loadState = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

const initialState = {
  value: loadState(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, name, price, image, description, quantity = 1 } = action.payload;
    
      const foundItem = state.value.find((item) => item.product._id === _id);
    
      if (foundItem) {
        foundItem.quantity += quantity;
      } else {
        state.value.push({
          product: { _id, name, price, image, description },
          quantity: quantity,
        });
      }
    
      localStorage.setItem("cart", JSON.stringify(state.value));
    },

  removeFromCart: (state, action) => {
    state.value = state.value.filter((item) => item.product._id !== action.payload);
    localStorage.setItem("cart", JSON.stringify(state.value));
  },

  updateQuantity: (state, action) => {
    const { productId, quantity } = action.payload;
    const foundItem = state.value.find((item) => item.product._id === productId);

    if (foundItem) {
      foundItem.quantity = Math.max(1, quantity);
    }

    localStorage.setItem("cart", JSON.stringify(state.value));
  },

  clearCart: (state) => {
    state.value = [];
    localStorage.removeItem("cart");
  },
},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;