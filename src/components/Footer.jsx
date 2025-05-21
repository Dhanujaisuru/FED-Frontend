import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ Corrected import

const Footer = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address."); // ✅ toast, not toaster
      return;
    }

    toast.success("You've been subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-12">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Mebius</h3>
          <p className="mt-2 text-gray-400">
            Discover unique products crafted with love and innovation.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold">Explore</h4>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
            <li><Link to="/shop" className="text-gray-400 hover:text-white transition">Shop</Link></li>
            <li><Link to="/orderhistory" className="text-gray-400 hover:text-white transition">Order History</Link></li>
          </ul>
        </div>

        {/* Admin Links */}
        {isAdmin && (
          <div>
            <h4 className="text-lg font-semibold">Admin</h4>
            <ul className="mt-2 space-y-2">
              <li><Link to="/admin/products/create" className="text-gray-400 hover:text-white transition">Products</Link></li>
              <li><Link to="/admin/orderslist" className="text-gray-400 hover:text-white transition">Orders</Link></li>
            </ul>
          </div>
        )}

        {/* Newsletter & Socials */}
        <div>
          <h4 className="text-lg font-semibold">Stay Connected</h4>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-l-md bg-gray-800 text-white border-none focus:outline-none"
            />
            <Button
              onClick={handleSubscribe}
              className="px-3 py-2 bg-blue-600 rounded-r-md hover:bg-blue-700"
            >
              <Mail size={18} />
            </Button>
          </div>
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Mebius. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
