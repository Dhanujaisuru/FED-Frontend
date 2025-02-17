import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Ensure you are using react-router-dom
import "./index.css";

// Import your pages
import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import CartPage from "./pages/cart.page";
import AccountPage from "./pages/account.page";
import ShopPage from "./pages/shop.page";
import CheckoutPage from "./pages/checkout.page";
import PaymentPage from "./pages/payment.page";
import CompletePage from "./pages/complete.page";

// Import your store
import { store } from "@/lib/store";
import { Provider } from "react-redux";

// Import Clerk Provider
import { ClerkProvider } from "@clerk/clerk-react";

// Import the root layout
import RootLayout from "./layouts/root.layout";

// Get your Publishable Key from the environment variable
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Log the value to ensure it’s being read correctly
console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/cart" element={<CartPage />} />
              <Route path="/cart/checkout" element={<CheckoutPage />} />
              <Route path="/shop/payment" element={<PaymentPage />} />
              <Route path="/shop/complete" element={<CompletePage />} />
              <Route path="/account" element={<AccountPage />} />
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  // </StrictMode>
);
