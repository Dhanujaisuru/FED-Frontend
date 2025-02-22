import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { useNavigate } from "react-router";
import { useGetProductByIdQuery } from "@/lib/api"; // Import the query hook

function ProductCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch product data from the database using the product's _id
  const { data: product, error, isLoading } = useGetProductByIdQuery(props._id);

  // Log for debugging
  console.log("ProductCard props:", props);
  console.log("Fetched product data:", product);

  // Handle loading and error states
  if (isLoading) {
    return (
      <Card>
        <div className="p-4 text-gray-600">Loading...</div>
      </Card>
    );
  }
  if (error || !product) {
    return (
      <Card>
        <div className="p-4 text-red-600">Error loading product</div>
      </Card>
    );
  }

  // Use fetched stock from the database
  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock < 1;

  const handleClick = () => {
    if (!isOutOfStock) {
      dispatch(
        addToCart({
          _id: product._id,
          name: product.name,
          price: product.price,
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
    <Card>
      <div className="h-80 bg-card rounded-lg p-4 relative">
        <img
          src={product.image}
          className="block w-full h-full object-cover"
          alt={product.name}
        />
      </div>
      <div className="flex px-4 mt-4 items-center justify-between">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <span className="block text-lg font-medium">${product.price}</span>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm">{product.description || "No description available"}</p>
        <p className={`text-sm ${isOutOfStock ? "text-red-600" : "text-green-500"} pt-2`}>
          {isOutOfStock ? "Out of Stock" : `Available: ${stock}`}
        </p>
      </div>
      <div className="mt-1 p-4 flex gap-2">
        <Button className="w-full border border-black" variant="outline" onClick={handleViewProduct}>
          View Product
        </Button>
        <Button
          className={`w-full ${
            isOutOfStock
              ? "bg-red-500 hover:bg-red-500 cursor-not-allowed"
              : ""
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