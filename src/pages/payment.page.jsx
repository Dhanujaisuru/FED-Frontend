// import { clearCart } from "@/lib/features/cartSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { Navigate, useSearchParams } from "react-router-dom";
// import CartItem from "@/components/CartItem";
// import CheckoutForm from "@/components/CheckoutForm";

// function PaymentPage() {
//   const cart = useSelector((state) => state.cart.value);
//   const dispatch = useDispatch();
//   const isSubmitting = useSelector((state) => state.cart.isSubmitting);
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("orderId");

//   if (!cart || cart.length === 0) {
//     toast.error("Cart is empty");
//     return <Navigate to="/" />;
//   }
//   if (!orderId) {
//     toast.error("Invalid order ID");
//     return <Navigate to="/" />;
//   }

//   const formattedCart = cart.map((item) => ({
//     product: {
//       _id: item.product?._id || item._id,
//       name: item.product?.name || item.name || "Unknown Product",
//       price: Number(item.product?.price || item.price) || 0,
//       image: item.product?.image || item.image || "",
//       description: item.product?.description || item.description || "No description",
//     },
//     quantity: Number(item.quantity) || 1,
//   }));

//   const totalPrice = formattedCart
//     .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
//     .toFixed(2);


//   return (
//     <main className="container mx-auto px-4 py-4">
//       <h1 className="text-3xl font-bold mb-8">Review Your Order</h1>
//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="border p-6 rounded-lg shadow-sm bg-white">
//           <h3 className="text-2xl font-semibold">
//             Order Items ({formattedCart.length} {formattedCart.length === 1 ? "item" : "items"})
//           </h3>
//           <div className="mt-4">
//             {formattedCart.map((item, index) => (
//               <div key={index} className="flex items-center justify-between py-3 border-b">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.product.image}
//                     alt={item.product.name}
//                     className="w-12 h-12 object-cover rounded-md"
//                   />
//                   <div>
//                     <p className="font-medium">{item.product.name}</p>
//                     <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                   </div>
//                 </div>
//                 <p className="font-semibold">
//                   ${(item.product.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 border-t pt-4">
//             <p className="flex justify-between text-xl font-bold">
//               <span>Total</span>
//               <span>${totalPrice}</span>
//             </p>
//           </div>
//         </div>
//         <div className="border p-6 rounded-lg shadow-sm bg-white">
//           <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
//           <CheckoutForm orderId={orderId} totalPrice={totalPrice} cart={formattedCart} />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default PaymentPage;

import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Navigate, useSearchParams } from "react-router-dom";
import CheckoutForm from "@/components/CheckoutForm";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const isSubmitting = useSelector((state) => state.cart.isSubmitting);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!cart || cart.length === 0) {
    toast.error("Cart is empty");
    return <Navigate to="/" />;
  }
  if (!orderId) {
    toast.error("Invalid order ID");
    return <Navigate to="/" />;
  }

  const formattedCart = cart.map((item) => ({
    product: {
      _id: item.product?._id || item._id,
      name: item.product?.name || item.name || "Unknown Product",
      price: Number(item.product?.price || item.price) || 0,
      image: item.product?.image || item.image || "",
      description: item.product?.description || item.description || "No description",
    },
    quantity: Number(item.quantity) || 1,
  }));

  const totalPrice = formattedCart
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Review Your Order</h1>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Items */}
        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-semibold">
            Order Items ({formattedCart.length} {formattedCart.length === 1 ? "item" : "items"})
          </h3>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {formattedCart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </p>
          </div>
        </div>
        {/* Payment Details */}
        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
          <div className={isSubmitting ? "opacity-50 pointer-events-none" : ""}>
            <CheckoutForm orderId={orderId} totalPrice={totalPrice} cart={formattedCart} />
          </div>
          {isSubmitting && (
            <p className="text-center text-gray-500 mt-4">Processing payment...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;