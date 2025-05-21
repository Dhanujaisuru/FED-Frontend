import { Button } from "@/components/ui/button";
import { useGetOrderQuery, useGetCheckoutSessionStatusQuery } from "@/lib/api";
import { Link, useSearchParams, Navigate } from "react-router";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CompletePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useGetCheckoutSessionStatusQuery(sessionId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (data?.status === "complete") {
    return (
      <section id="success" className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Order Completed Successfully!</h2>
        <p className="mb-4">
          We appreciate your business! A confirmation email will be sent to{" "}
          <span className="font-semibold">{data.customer_email}</span>.
        </p>
        
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Order Details:</h3>
          <p className="mb-2">Order ID: <span className="font-medium">{data.orderId}</span></p>
          <p className="mb-2">Order Status: <span className="font-medium">{data.orderStatus}</span></p>
          <p className="mb-2">Payment Status: <span className="font-medium">{data.paymentStatus}</span></p>
        </div>
        
        <div className="mt-6">
          <p>
            If you have any questions, please email{" "}
            <a href="mailto:orders@example.com" className="text-blue-600 hover:underline">
              orders@example.com
            </a>.
          </p>
        </div>
        
        <Button asChild className="mt-6">
          <Link to="/">Return to Home</Link>
        </Button>
      </section>
    );
  }

  return null;
}

export default CompletePage;