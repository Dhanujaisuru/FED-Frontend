import { Button } from "@/components/ui/button";
import { clearCart } from "@/lib/features/cartSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Navigate } from "react-router";

function PaymentPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const isSubmitting = useSelector((state) => state.cart.isSubmitting);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    toast.success("Order Placed Successfully");
  };

  if (cart.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Review Your Order</h1>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Items */}
        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h3 className="text-2xl font-semibold">
            Order Items ({cart.length} {cart.length === 1 ? "item" : "items"})
          </h3>
          <div className="mt-4 max-h-64 overflow-y-auto">
            {cart.map((item, index) => (
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
              <span>
                $
                {cart
                  .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={handlePlaceOrder}
        >
          {isSubmitting ? "Submitting..." : "Place Order"}
        </Button>
      </div>
    </main>
  );
}


export default PaymentPage;