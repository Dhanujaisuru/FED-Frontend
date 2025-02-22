// OrderHistory.jsx
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetOrdersQuery } from "@/lib/api";
import { Link } from "react-router-dom";

function OrderHistory() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId } = useAuth();

  const { data: orders, isLoading, isError, error } = useGetOrdersQuery(undefined, {
    skip: !userId,
  });

  console.log("User ID:", userId);
  console.log("Orders Response:", { data: orders, isLoading, isError, error });

  if (!isLoaded || isLoading) {
    return (
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="text-gray-500 text-center">Loading...</div>
      </main>
    );
  }

  if (!isSignedIn || !userId) {
    return <Navigate to="/sign-in" />;
  }

  if (isError) {
    console.error("Error fetching orders:", error);
    return (
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="text-red-500 text-center">
          Error: Unable to fetch orders.{" "}
          {error?.status === 404
            ? "Orders endpoint not found on server."
            : error?.status === 401
              ? "Unauthorized - check Clerk token."
              : "Please try again later."}
        </div>
      </main>
    );
  }

  if (!Array.isArray(orders)) {
    console.warn("Orders data is not an array:", orders);
    return (
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="text-gray-500 text-center">No valid order data available.</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <div
              key={order?._id || Math.random()}
              className="border p-6 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Order ID: {order?._id || "N/A"}
              </h3>
              <p className="text-gray-600 mb-4">
                Status: <span className="font-medium">{order?.paymentStatus || "Unknown"}</span>
              </p>
              <div className="mb-4">
                <p className="text-lg font-medium mb-2">Items:</p>
                {Array.isArray(order?.items) && order.items.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b"
                      >
                        <div className="flex items-center gap-4">
                          <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-md" />
                          <div>
                            <p className="font-medium">{item?.product?.name || "Unknown Product"}</p>
                            <p className="text-sm text-gray-500">Quantity: {item?.quantity || 0}</p>
                          </div>
                        </div>
                        <p className="font-semibold">
                          ${(item?.product?.price || 0 * item?.quantity || 0).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No items found in this order.</p>
                )}
              </div>
              <div className="border-t pt-4">
                <p className="flex justify-between text-lg mb-2">
                  <span>Total Price</span>
                  <span className="font-semibold">
                    $
                    {order?.items?.reduce(
                      (acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0),
                      0
                    ).toFixed(2) || "0.00"}
                  </span>
                </p>
                <p className="text-lg font-medium mb-2">Shipping Address:</p>
                <div className="text-gray-600">
                  <p>{order?.addressId?.line_1 || "N/A"}</p>
                  {order?.addressId?.line_2 && <p>{order.addressId.line_2}</p>}
                  <p>
                    {order?.addressId?.city || "N/A"}, {order?.addressId?.state || "N/A"}{" "}
                    {order?.addressId?.zip_code || "N/A"}
                  </p>
                  <p>Phone: {order?.addressId?.phone || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 text-center">
        <Button asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </main>
  );
}

export default OrderHistory;