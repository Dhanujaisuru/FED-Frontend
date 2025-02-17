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
      const product = action.payload;
      const foundItem = state.value.find((item) => item.product._id === product._id);

      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        state.value.push({ product, quantity: 1 });
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


//------------------------------------------this code is reset cart count to 0 after refresh page----------------------------------------------
// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//   value: [],
// }

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload
//       const foundItem = state.value.find((item) => item.product._id === product._id)
//       if (foundItem) {
//         foundItem.quantity += 1
//       } else {
//         state.value.push({ product: action.payload, quantity: 1 })
//       }
//     },
    
//     removeFromCart: (state, action) => {
//       state.value = state.value.filter((item) => item.product._id !== action.payload)
//     },

//     updateQuantity: (state, action) => {
//       const { productId, quantity } = action.payload
//       const foundItem = state.value.find((item) => item.product._id === productId)
//       if (foundItem) {
//         foundItem.quantity = Math.max(1, quantity)
//       }
//     },
//   },
// })

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

// export default cartSlice.reducer


//---------------------------------this code is not working properly-----------------------------------------
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: [],
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       console.log(state.value);
//       const product = action.payload;

//       const foundItem = state.value.find(
//         (item) => item.product._id === product._id
//       );
//       if (foundItem) {
//         foundItem.quantity += 1;
//         return;
//       }
//       state.value.push({ product: action.payload, quantity: 1 });
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { addToCart } = cartSlice.actions;

// export default cartSlice.reducer;