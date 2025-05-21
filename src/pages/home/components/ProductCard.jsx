import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { useNavigate } from "react-router";
import { useGetProductByIdQuery } from "@/lib/api";

function ProductCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useGetProductByIdQuery(props._id);

  console.log("ProductCard props:", props);
  console.log("Fetched product data:", product);

  if (isLoading) {
    return (
      <Card className="overflow-hidden shadow-lg bg-gray-100 animate-pulse">
        <div className="p-4 text-gray-600">Loading...</div>
      </Card>
    );
  }
  if (error || !product) {
    return (
      <Card className="overflow-hidden shadow-lg bg-red-50">
        <div className="p-4 text-red-600">Error loading product</div>
      </Card>
    );
  }

  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock < 1;

  const handleClick = () => {
    if (!isOutOfStock) {
      dispatch(
        addToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
          stripePriceId: product.stripePriceId,
          image: product.image,
          description: product.description,
          quantity: 1,
        })
      );
    } else {
      console.log("Cannot add to cart: Product is out of stock");
    }
  };

  const handleViewProduct = () => {
    navigate(`/shop/${product._id}`);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-xl">
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-80 group">
        <img
          src={product.image}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt={product.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 truncate">{product.name}</h2>
          <span className="text-lg font-medium text-blue-600">${product.price}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description || "No description available"}
        </p>
        <p
          className={`mt-2 text-sm font-medium ${
            isOutOfStock ? "text-red-600" : "text-green-500"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : `Available: ${stock}`}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="p-4 flex gap-3 border-t border-gray-200">
        <Button
          className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          variant="outline"
          onClick={handleViewProduct}
        >
          View Product
        </Button>
        <Button
          className={`w-full rounded-lg transition-colors duration-200 ${
            isOutOfStock ? "bg-red-500 hover:bg-red-500 cursor-not-allowed" : ""
          }`}
          onClick={handleClick}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock" : "Add To Cart"}
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;



// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart } from "@/lib/features/cartSlice";
// import { useNavigate } from "react-router";

// function ProductCard(props) {
//   const count = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClick = (e) => {
//     dispatch(
//       addToCart({
//         _id: props._id,
//         name: props.name,
//         price: props.price,
//         image: props.image,
//         description: props.description,
//       })
//     );
//   };

//   const handleViewProduct = () => {
//     navigate(`/shop/${props._id}`);
//   };

//   return (
//     <Card>
//       <div className="h-80 bg-card rounded-lg p-4 relative">
//         <img src={props.image} className="block" />
//       </div>
//       <div className="flex px-4 mt-4  items-center justify-between">
//         <h2 className="text-2xl  font-semibold">{props.name}</h2>
//         <span className="block text-lg font-medium">${props.price}</span>
//       </div>
//       <div className="px-4 mt-2">
//         <p className="text-sm">{props.description}</p>
//       </div>
//       <div className="mt-1 p-4 flex gap-2">
//         <Button className="w-full border border-black" variant="outline" onClick={handleViewProduct}>
//           View Product
//         </Button>
//         <Button className="w-full" onClick={handleClick}>
//           Add To Cart
//         </Button>
//       </div>
//     </Card>
//   );
// }

// export default ProductCard;