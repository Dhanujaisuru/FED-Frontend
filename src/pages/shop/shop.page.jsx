import { useGetCategoriesQuery, useGetProductsQuery } from "@/lib/api"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCards from "../home/components/ProductCards"
import Tab from "../home/components/Tab"

function ShopPage() {
  // Fetch products and categories using RTK Query
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetProductsQuery()

  const {
    data: fetchedCategories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery()

  // Add "All" category to the fetched categories
  const categories = [{ _id: "ALL", name: "All" }, ...fetchedCategories]

  // State for selected category and sort order
  const [selectedCategoryId, setSelectedCategoryId] = useState("ALL")
  const [sortOrder, setSortOrder] = useState(null)

  // Filter products based on selected category
  const filteredProducts =
    selectedCategoryId === "ALL" ? products : products.filter((product) => product.categoryId === selectedCategoryId)

  // Sort products based on sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return Number.parseFloat(a.price) - Number.parseFloat(b.price)
    } else if (sortOrder === "desc") {
      return Number.parseFloat(b.price) - Number.parseFloat(a.price)
    }
    return 0
  })

  // Handle tab click to change selected category
  const handleTabClick = (_id) => {
    setSelectedCategoryId(_id)
    setSortOrder(null) // Reset sort order when category changes
  }

  // Show loading state if products or categories are loading
  if (isProductsLoading || isCategoriesLoading) {
    return (
      <main className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        <Separator className="my-4" />
        <div className="flex items-center gap-4 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-80" />
          ))}
        </div>
      </main>
    )
  }

  // Show error state if there's an error fetching products or categories
  if (isProductsError || isCategoriesError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        <Separator className="my-4" />
        <div className="mt-4">
          <p className="text-red-500">Error: {productsError?.message || categoriesError?.message}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
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
      <ProductCards products={sortedProducts} />
    </main>
  )
}

export default ShopPage;