import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Skeleton } from "./components/ui/skeleton";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState({
    isError: false,
    message: "",
  });

  const categories = [
    { _id: "ALL", name: "All" },
    { _id: "1", name: "Headphones" },
    { _id: "2", name: "Earbuds" },
    { _id: "3", name: "Speakers" },
    { _id: "4", name: "Mobile Phones" },
    { _id: "5", name: "Smart Watches" },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState(null); // To track sort order

  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOrder === "desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  });

  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
    setSortOrder(null);
  };

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setProductsError({ isError: true, message: error.message });
      })
      .finally(() => setIsProductsLoading(false));
  }, []);

  if (isProductsLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {categories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </section>
    );
  }

  if (productsError.isError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>

        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {categories.map((category) => (
            <Tab
              key={category._id}
              _id={category._id}
              selectedCategoryId={selectedCategoryId}
              name={category.name}
              onTabClick={handleTabClick}
            />
          ))}
        </div>
        <div className="mt-4">
          <p className="text-red-500">{productsError.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center gap-4">
        {categories.map((category) => (
          <Tab
            key={category._id}
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={handleTabClick}
          />
        ))}

        <div className="flex gap-2 ml-auto">
          <button
            className="px-1 py-1 bg-gray-500 text-white rounded"
            onClick={() => setSortOrder("asc")}
          >
            Sort by Price: Low to High
          </button>
          <button
            className="px-1 py-1 bg-gray-500 text-white rounded"
            onClick={() => setSortOrder("desc")}
          >
            Sort by Price: High to Low
          </button>
        </div>
      </div>
      <ProductCards handleAddToCart={props.handleAddToCart} products={sortedProducts} />
    </section>
  );
}

export default Products;