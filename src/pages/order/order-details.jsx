import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetOrderQuery } from "@/lib/api";
import { Button } from "@/components/ui/button";

function OrderDetails() {
    const { OrderId } = useParams();
    const { data: order, isLoading, isError, error } = useGetOrderQuery(OrderId);

    if (isLoading) {
        return (
            <main className="container mx-auto px-4 py-4">
                <h1 className="text-3xl font-bold mb-8">Order Details</h1>
                <div className="text-gray-500 text-center">Loading...</div>
            </main>
        );
    }

    if (isError) {
        console.error("Error fetching order:", error);
        return (
            <main className="container mx-auto px-4 py-4">
                <h1 className="text-3xl font-bold mb-8">Order Details</h1>
                <div className="text-red-500 text-center">
                    Error: Unable to fetch order.{" "}
                    {error?.status === 404
                        ? "Order not found."
                        : error?.status === 401
                        ? "Unauthorized - check Clerk token."
                        : "Please try again later."}
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="container mx-auto px-4 py-4">
                <h1 className="text-3xl font-bold mb-8">Order Details</h1>
                <div className="text-gray-500 text-center">No order data available.</div>
            </main>
        );
    }

    // Calculate total price for all items
    const totalPrice = order?.items?.reduce((acc, item) => {
        const price = item?.product?.price || 0;
        const qty = item?.quantity || 0;
        return acc + price * qty;
    }, 0).toFixed(2);

    // Function to get the correct color based on status
    const getStatusColor = (status) => {
        if (!status) return "text-gray-500";
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === "pending") return "text-red-500";
        if (normalizedStatus === "confirmed") return "text-green-600";
        return "text-gray-500"; 
    };

    return (
        <main className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold mb-8">Order ID: {order?._id || "N/A"}</h1>
            <div className="border p-6 rounded-lg shadow-sm bg-white mb-6">
                {/* Status Section */}
                <div className="mb-4">
                    <p className="text-lg font-medium">Status:</p>
                    <div className="flex gap-6 mt-2">
                        <div>
                            <span className="text-gray-500">Payment Status:</span>{" "}
                            <span className={`font-semibold ${getStatusColor(order?.paymentStatus)}`}>
                                {order?.paymentStatus || "Unknown"}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500">Order Status:</span>{" "}
                            <span className={`font-semibold ${getStatusColor(order?.orderStatus)}`}>
                                {order?.orderStatus || "Unknown"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Items */}
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
                                        <img
                                            src={item.product?.image}
                                            alt={item.product?.name}
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                        <div>
                                            <p className="font-medium">{item?.product?.name || "Unknown Product"}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item?.quantity || 0}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">
                                        ${((item?.product?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No items found in this order.</p>
                    )}
                </div>

                {/* Price + Address */}
                <div className="border-t pt-4">
                    <p className="flex justify-between text-lg mb-2">
                        <span>Total Price</span>
                        <span className="font-semibold">${totalPrice}</span>
                    </p>
                    <p className="text-lg font-medium mb-2">Shipping Address:</p>
                    <div className="text-gray-600">
                        <p>{order?.addressId?.line_1 || "N/A"}</p>
                        {order?.addressId?.line_2 && <p>{order.addressId.line_2}</p>}
                        <p>
                            {order?.addressId?.city || "N/A"},{" "}
                            {order?.addressId?.state || "N/A"}{" "}
                            {order?.addressId?.zip_code || "N/A"}
                        </p>
                        <p>Phone: {order?.addressId?.phone || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Button asChild>
                    <Link to="/admin/orderslist">Back to Orders List</Link>
                </Button>
            </div>
        </main>
    );
}

export default OrderDetails;
