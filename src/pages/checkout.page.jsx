import { useSelector } from "react-redux";
import ShippingAddressForm from "@/components/ShippingAddressForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/lib/api";

function CheckoutPage() {
  const cart = useSelector((state) => state.cart.value);
  const [createOrder, { isLoading: loadingOrder, error: orderError }] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate subtotal and total
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 100.0; 
  const total = subtotal + shippingCost;

  // Handle order submission
  const handleCheckout = async (shippingAddress) => {
    setLoading(true);
    try {
      const orderData = {
        items: cart.map((item) => ({
          product: item.product._id, 
          quantity: item.quantity,
        })),
        shippingAddress,
      };

      const result = await createOrder(orderData).unwrap();
      navigate("/complete");
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Failed to place order. Please try again.";
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Checkout Page</h1>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-semibold">Order Summary ({cart.length} items)</h3>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b">
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
            <p className="flex justify-between text-lg">
              <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-lg">
              <span>Shipping</span> <span>${shippingCost.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-xl font-bold mt-2">
              <span>Total</span> <span>${total.toFixed(2)}</span>
            </p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-semibold">Shipping Information</h3>
          <p className="text-gray-500 text-sm mb-4">Please enter your shipping details</p>
          <ShippingAddressForm
            cart={cart}
            onSubmit={handleCheckout}
            loading={loading || loadingOrder}
          />
          {orderError && (
            <p className="text-red-500 mt-4">
              Error: {orderError?.data?.message || "Something went wrong"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;