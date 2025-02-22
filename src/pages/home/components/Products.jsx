import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

function Products(props) {
  // Fetch products and categories using RTK Query
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery();

  const {
    data: fetchedCategories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  // Add "All" category to the fetched categories
  const categories = [
    { _id: "ALL", name: "All" }, // Manually add "All" category
    ...fetchedCategories, // Add fetched categories from the API
  ];

  // State for selected category and sort order
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState(null);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategoryId === "ALL"
      ? products
      : products.filter((product) => product.categoryId === selectedCategoryId);

  // Sort products based on sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOrder === "desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  });

  // Handle tab click to change selected category
  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id);
    setSortOrder(null); // Reset sort order when category changes
  };

  // Show loading state if products or categories are loading
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {/* Render skeleton tabs for loading state */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* Render skeleton cards for loading state */}
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-80" />
          ))}
        </div>
      </section>
    );
  }

  // Show error state if there's an error fetching products or categories
  if (isProductsError || isCategoriesError) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4">
          <p className="text-red-500">
            Error: {productsError?.message || categoriesError?.message}
          </p>
        </div>
      </section>
    );
  }

  // Render the main component
  return (
    <section className="px-8 py-8">
      <h2 className="text-4xl font-bold">Our Top Products</h2>
      <Separator className="mt-2" />
      <div className="mt-4 flex items-center gap-4">
        {/* Render category tabs, including the "All" button */}
        {categories.map((category) => (
          <Tab
            key={category._id}
            _id={category._id}
            selectedCategoryId={selectedCategoryId}
            name={category.name}
            onTabClick={handleTabClick}
          />
        ))}

        {/* Sort buttons */}
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
      {/* Render product cards */}
      <ProductCards handleAddToCart={props.handleAddToCart} products={sortedProducts} />
    </section>
  );
}

export default Products;