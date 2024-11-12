import { ShoppingCart } from "lucide-react";
import { Switch } from "@/components/ui/switch"


function Navigation(props) {
  return (
    <nav className="flex items-center justify-between py-8 px-8">
      <div className="flex gap-x-16">
        <a className="font-semibold text-3xl" href="/">
          Mebius
        </a>
        <div className="flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <a href="/cart" className="flex items-center gap-4 relative">
            <p className="text-lg">{props.cartCount}</p>
            <div className="flex items-center gap-2">
              <ShoppingCart />
              Cart
            </div>
          </a>
        </div>
        {props.name ? (
          <p>Hi, {props.name}</p>
        ) : (
          <>
            <a href="/signin">Sign In</a>
            <a href="/signup">Sign Up</a>
          </>
        )}
        <Switch />
        Dark Mode
      </div>
    </nav>
  );
}

export default Navigation;
