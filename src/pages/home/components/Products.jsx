import ProductCards from "./ProductCards";
import { Separator } from "@/components/ui/separator";
import Tab from "./Tab";
import { useState } from "react";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function Products(props) {
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

  const categories = [
    { _id: "ALL", name: "All" },
    ...fetchedCategories,
  ];

  // Set default sortOrder to "asc" for Low to High
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("asc");

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
  };

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <section className="px-8 py-8">
        <h2 className="text-4xl font-bold">Our Top Products</h2>
        <Separator className="mt-2" />
        <div className="mt-4 flex items-center gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-80" />
          ))}
        </div>
      </section>
    );
  }

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
          <Button
            variant={sortOrder === "asc" ? "default" : "secondary"}
            onClick={() => setSortOrder("asc")}
          >
            Sort by Price: Low to High
          </Button>
          <Button
            variant={sortOrder === "desc" ? "default" : "secondary"}
            onClick={() => setSortOrder("desc")}
          >
            Sort by Price: High to Low
          </Button>
        </div>
      </div>
      <ProductCards handleAddToCart={props.handleAddToCart} products={sortedProducts} />
    </section>
  );
}

export default Products;