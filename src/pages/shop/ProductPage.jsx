import { useParams } from "react-router";
import { useGetProductByIdQuery } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

function ProductPage() {
  const { ProductId } = useParams();
  const dispatch = useDispatch();
  const { data: product, error, isLoading } = useGetProductByIdQuery(ProductId);
  const [quantity, setQuantity] = useState(1);

  if (error) return <div className="text-center p-6">Error loading product</div>;
  if (!product) return <div className="text-center p-6">Product not found</div>;

  const isOutOfStock = product.stock < 1;

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
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: quantity,
      })
    );
    setQuantity(1);
  };

  return (
    <main className="container mx-auto px-4 py-4">
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg shadow-sm bg-white flex justify-center">
          <img src={product.image} className="block" alt={product.name} />
        </div>

        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          <span className="block text-3xl font-semibold mb-4">${product.price}</span>

          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center space-x-4">
              <label className="text-lg font-medium">Quantity:</label>
              <div className="flex items-center p-2 rounded-lg w-28 justify-between">
                <button
                  onClick={decrease}
                  disabled={isOutOfStock} // Disable decrease button if out of stock
                  className="border border-black rounded-full w-5 h-5 flex items-center justify-center disabled:opacity-50"
                >
                  <Minus size={10} />
                </button>
                <span className="text-lg font-bold">{quantity}</span>
                <button
                  onClick={increase}
                  disabled={isOutOfStock || quantity >= product.stock} // Disable increase button if out of stock or quantity exceeds stock
                  className="border border-black rounded-full w-5 h-5 flex items-center justify-center disabled:opacity-50"
                >
                  <Plus size={10} />
                </button>
              </div>
            </div>

            {isOutOfStock ? (
              <div className="text-red-600 font-medium">Out of Stock</div>
            ) : (
              <div className="mt-1 flex gap-2">
                <Button className="w-full" onClick={handleClick} disabled={isOutOfStock}>
                  Add To Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;