import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { removeFromCart, updateQuantity } from "./../lib/features/cartSlice";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div>Loading...</div>
      </main>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (Number(item.product.price) || 0) * item.quantity, 0);

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>
      {cart.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Your cart is empty</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Cart Items ({totalItems})</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {cart.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/cart/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </main>
  );
}

// import { useSelector, useDispatch } from "react-redux";
// import { useUser } from "@clerk/clerk-react";
// import { Navigate, Link } from "react-router-dom";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { removeFromCart, updateQuantity } from "./../lib/features/cartSlice";
// import CartItem from "@/components/CartItem";

// export default function CartPage() {
//   const cart = useSelector((state) => state.cart.value);
//   const dispatch = useDispatch();
//   const { isLoaded, isSignedIn } = useUser();

//   if (!isLoaded) {
//     return (
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Cart</h1>
//         <div>Loading...</div>
//       </main>
//     );
//   }

//   if (!isSignedIn) {
//     return <Navigate to="/sign-in" />;
//   }

//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//   const subtotal = cart.reduce(
//     (total, item) => total + (Number(item.product?.price) || 0) * item.quantity,
//     0
//   );

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent negative or zero quantities
//     dispatch(updateQuantity({ productId, quantity: newQuantity }));
//   };

//   const handleRemoveItem = (productId) => {
//     dispatch(removeFromCart(productId));
//   };

//   // Ensure cart data is properly formatted for checkout
//   const formattedCart = cart.map((item) => ({
//     product: {
//       _id: item.product?._id,
//       name: item.product?.name,
//       price: Number(item.product?.price) || 0,
//       image: item.product?.image,
//       description: item.product?.description,
//       stripePriceId: item.product?.stripePriceId || "",
//     },
//     quantity: item.quantity || 1,
//   }));

//   return (
//     <main className="container mx-auto px-4 py-4">
//       <h1 className="text-3xl font-bold mb-8">My Cart</h1>
//       {cart.length === 0 ? (
//         <Card>
//           <CardContent className="pt-6">
//             <p className="text-center text-gray-500">Your cart is empty</p>
//           </CardContent>
//           <CardFooter className="justify-center">
//             <Button asChild>
//               <Link to="/shop">Continue Shopping</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       ) : (
//         <div className="grid gap-8 md:grid-cols-3">
//           <Card className="md:col-span-2">
//             <CardHeader>
//               <CardTitle>Cart Items ({totalItems})</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               {cart.map((item) => (
//                 <CartItem
//                   key={item.product?._id}
//                   item={item}
//                   handleUpdateQuantity={handleUpdateQuantity}
//                   handleRemoveItem={handleRemoveItem}
//                 />
//               ))}
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>
//                 <span>Calculated at checkout</span>
//               </div>
//               <Separator className="my-4" />
//               <div className="flex justify-between font-semibold">
//                 <span>Total</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button asChild className="w-full">
//                 <Link to="/cart/checkout" state={{ cart: formattedCart }}>
//                   Proceed to Checkout
//                 </Link>
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       )}
//     </main>
//   );
// }