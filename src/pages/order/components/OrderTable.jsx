import React, { useState } from 'react';
import { useGetAllOrdersQuery } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Trash2, SlidersHorizontal } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function OrderTable() {
    const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('all');

    if (isLoading) return <div className="p-4 text-gray-600">Loading orders...</div>;
    if (isError) return <div className="p-4 text-red-600">Failed to load orders.</div>;

    const navigateToOrderDetails = (orderId) => {
        navigate(`/admin/orderslist/${orderId}`);
    };

    // Function to render status badges
    const renderStatusBadge = (status, type) => {
        if (type === "payment") {
            switch (status) {
                case "COMPLETE":
                    return (
                        <Badge className="bg-green-100 text-green-500 hover:bg-green-200 px-3 py-1">
                            Complete
                        </Badge>
                    );
                case "PENDING":
                default:
                    return (
                        <Badge className="bg-red-100 text-red-500 hover:bg-red-200 px-3 py-1">
                            Pending
                        </Badge>
                    );
            }
        } else if (type === "order") {
            switch (status) {
                case "CONFIRMED":
                    return (
                        <Badge className="bg-green-100 text-green-500 hover:bg-green-200 px-3 py-1">
                            Confirmed
                        </Badge>
                    );
                case "PENDING":
                default:
                    return (
                        <Badge className="bg-red-100 text-red-500 hover:bg-red-200 px-3 py-1">
                            Pending
                        </Badge>
                    );
            }
        }
    };

    // Sort and filter orders based on sortOrder
    const sortedOrders = [...(orders || [])].filter(order => {
        if (sortOrder === 'all') return true;
        return order.orderStatus === sortOrder.toUpperCase();
    });

    return (
        <div className="container mx-auto">
            <div className="flex items-center mb-4 px-1">
                <ClipboardList className="mr-2 h-5 w-5 text-gray-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                    Total Orders
                    <span className="ml-2 text-sm text-gray-500 font-normal">
                        ({orders?.length || 0} total)
                    </span>
                </h2>
                <div className="flex gap-2 ml-auto">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={18} className="text-slate-500" />
                        <span className="text-sm font-medium hidden sm:inline">Sort by:</span>
                        <Select value={sortOrder} onValueChange={setSortOrder}>
                            <SelectTrigger className="w-[120px] h-9 text-sm">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border rounded-md overflow-hidden shadow-sm">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[200px] font-medium text-slate-700">Order ID</TableHead>
                            <TableHead className="pl-6 font-medium text-slate-700">User ID</TableHead>
                            <TableHead className="font-medium text-slate-700">Payment Status</TableHead>
                            <TableHead className="font-medium text-slate-700">Order Status</TableHead>
                            <TableHead className="text-right font-medium text-slate-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-16 text-gray-500">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <ClipboardList className="h-10 w-10 text-gray-300" />
                                        <span>No orders found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedOrders.map((order) => (
                                <TableRow key={order._id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell>
                                        <Button
                                            variant="link"
                                            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                            onClick={() => navigateToOrderDetails(order._id)}
                                        >
                                            {order._id}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="font-medium pl-6 text-gray-700">{order.userId}</TableCell>
                                    <TableCell>{renderStatusBadge(order.paymentStatus || "PENDING", "payment")}</TableCell>
                                    <TableCell>{renderStatusBadge(order.orderStatus || "PENDING", "order")}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {order.orderStatus === "PENDING" && (
                                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-800">
                                                Confirm
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hover:bg-red-100 hover:text-red-700"
                                            title="Delete order"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default OrderTable;