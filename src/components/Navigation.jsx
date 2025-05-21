import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";

function Navigation(props) {

  const cart = useSelector((state) => state.cart.value);
  const { user } = useUser();

  const getCartQuantity = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  return (
    <nav className="flex items-center justify-between py-6 px-6 shadow-md border-b rounded-b-xl bg-white text-sm">
      <div className="flex gap-x-16">
        <Link className="font-semibold text-3xl" to="/">
          Mebius
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          {/* Conditionally render the admin dashboard link */}
          {user && user.publicMetadata.role === "admin" && (
            <>
              <Link to="/admin/products/create">Products</Link>
              {/* <Link to="/admin/orderslist">Orders</Link> */}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <Link to="/shop/cart" className="flex items-center gap-4 relative">
            <p className="text-lg">{getCartQuantity()}</p>
            <div className="flex items-center gap-2">
              <ShoppingCart />
              Cart
            </div>
          </Link>
        </div>

        <SignedOut>
          <div className="flex items-center gap-4">
            <Link to="/sign-in" className=" text-primary ">
              Sign In
            </Link>
            <Link to="/sign-up" className=" text-primary ">
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <Link to={"/orderhistory"}>Order History</Link>
          <UserButton />
        </SignedIn>

      </div>
    </nav>
  );
}

export default Navigation;