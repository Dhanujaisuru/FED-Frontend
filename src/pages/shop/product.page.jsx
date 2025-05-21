import { useParams } from "react-router";
import { useGetProductByIdQuery } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, AlertCircle } from "lucide-react";
import { toast, Toaster } from "sonner"; // ✅ Import toast

function ProductPage() {
  const { ProductId } = useParams();
  const dispatch = useDispatch();
  const { data: product, error, isLoading } = useGetProductByIdQuery(ProductId);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center">
      <div className="animate-pulse w-full max-w-4xl">
        <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-xl flex items-center gap-3">
        <AlertCircle className="text-red-500" />
        <p className="text-red-600">
          There was an error loading this product. Please try again later.
        </p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-xl flex items-center gap-3">
        <AlertCircle className="text-amber-500" />
        <p className="text-amber-600">
          Product not found. It may have been removed or is unavailable.
        </p>
      </div>
    </div>
  );

  const isOutOfStock = product.stock < 1;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleClick = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: quantity,
      })
    );
    setQuantity(1);
    toast.success("Added to cart successfully!");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 flex justify-center items-center h-full">
              <img
                src={product.image}
                className="max-h-96 object-contain"
                alt={product.name}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="flex items-center justify-between mb-8">
              <span className="text-3xl font-bold text-gray-800">${product.price}</span>
              <div className="flex flex-col items-end">
                {isOutOfStock ? (
                  <span className="text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle size={16} />
                    Out of Stock
                  </span>
                ) : lowStock ? (
                  <span className="text-amber-600 font-medium text-sm">
                    Only {product.stock} left in stock
                  </span>
                ) : (
                  <span className="text-green-600 font-medium text-sm">
                    In Stock: {product.stock}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <label className="text-lg font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 shadow-sm">
                  <button
                    onClick={decrease}
                    disabled={isOutOfStock}
                    className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-4 text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={increase}
                    disabled={isOutOfStock || quantity >= product.stock}
                    className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <Button
                className="w-full py-6 text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
                onClick={handleClick}
                disabled={isOutOfStock}
              >
                <ShoppingCart size={20} />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
