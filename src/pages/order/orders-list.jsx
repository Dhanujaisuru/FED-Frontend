import React, { useState } from 'react';
import OrdersTable from './components/OrderTable';

function OrdersList() {
  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <OrdersTable />
    </main>
  );
}

export default OrdersList;