import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/lib/api";
import { useEffect } from "react";

// Updated schema with "stock" instead of "inventory"
const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image path is required"),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  stock: z.number().min(0, "Stock must be a positive number").optional(), // Changed to "stock"
});

const ProductForm = ({ onSubmit, isSubmitting }) => {
  const { data: categories = [], isLoading: loadingCategories, error } = useGetCategoriesQuery();

  console.log("Categories from query:", categories); // Debug: Check raw data
  console.log("Loading state:", loadingCategories); // Debug: Check loading
  console.log("Error state:", error); // Debug: Check errors

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      image: "",
      name: "",
      price: 0,
      description: "",
      stock: 0, 
    },
  });

  
  useEffect(() => {
    if (categories.length > 0 && !form.getValues("category")) {
      console.log("Setting default category to:", categories[0].name);
    }
  }, [categories, form]);

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      form.reset({
        category: "",
        image: "",
        name: "",
        price: 0,
        description: "",
        stock: 0,
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loadingCategories) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    console.error("Error fetching categories:", error);
    return (
      <div className="text-center p-6 text-red-500">
        Error loading categories: {error.message || "Please try again later."}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="border p-6 rounded-lg shadow-sm bg-white w-full max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-2 gap-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Dropdown */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem value="" disabled>
                          No categories available
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <span className="px-3 font-medium">$</span>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        min="0"
                        className="flex-1 border-none focus:ring-0"
                        {...field}
                        onChange={(e) => {
                          let value = e.target.value;
                          field.onChange(value === "" ? "" : Math.max(0, parseFloat(value)));
                        }}
                        value={field.value === 0 ? "" : field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock Field */}
            <FormField
              control={form.control}
              name="stock" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter stock"
                      min="0"
                      {...field}
                      onChange={(e) => {
                        let value = e.target.value;
                        field.onChange(value === "" ? "" : Math.max(0, parseInt(value)));
                      }}
                      value={field.value === 0 ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Image Path</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., /assets/products/image.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Enter product description"
                      {...field}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="col-span-2 mt-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;