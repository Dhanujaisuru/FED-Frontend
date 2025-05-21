// import { useEffect } from "react";
// import { useCreateCheckoutSessionMutation } from "../lib/api";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckout,
//   EmbeddedCheckoutProvider,
// } from "@stripe/react-stripe-js";
// import { useCallback } from "react";
// import { useAuth } from "@clerk/clerk-react";

// const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
// const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const CheckoutForm = ({ orderId }) => {
//   const {getToken}=useAuth();
//   const fetchClientSecret = useCallback(async () => {
//     const token = await getToken();
//     return fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ orderId }),
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);

//   const options = { fetchClientSecret };

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };

// export default CheckoutForm;

import { useEffect, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/features/cartSlice";
import { toast } from "sonner";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CheckoutForm = ({ orderId, totalPrice, cart }) => {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const fetchClientSecret = useCallback(async () => {
    const token = await getToken();
    return fetch(`${BASE_URL}/api/payments/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId, totalPrice, cart }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [orderId, totalPrice, cart]);

  const handleCheckoutComplete = useCallback(() => {
    dispatch(clearCart());
    toast.success("Payment successful! Your order has been placed.");
  }, [dispatch]);

  const options = {
    fetchClientSecret,
    onComplete: handleCheckoutComplete,
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;