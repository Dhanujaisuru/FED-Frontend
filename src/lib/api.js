import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://fed-storefront-backend-dhanuja.onrender.com/api/",
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    getOrders: builder.query({
      query: () => `orders`,
    }),
    getAllOrders: builder.query({
      query: () => `orders`,
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: (body) => ({
        url: `payments/create-checkout-session`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetCheckoutSessionStatusQuery,
  useCreateCheckoutSessionMutation,
} = Api;