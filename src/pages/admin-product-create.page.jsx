import { useState } from "react";
import { useCreateProductMutation } from "@/lib/api";
import { useDispatch } from "react-redux";
import { addProduct } from "@/lib/features/productsSlice";
import ProductForm from "@/components/ProductForm";
import { toast } from "sonner";

function AdminProductCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProduct, { error }] = useCreateProductMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting product:", values);
      const response = await createProduct(values).unwrap();
      console.log("Product created:", response);
      dispatch(addProduct(response));
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", {
        status: error.status,
        data: error.data,
        message: error.message,
      });
      const errorMessage =
        error?.data?.message || error.message || "Failed to create product";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="px-4 py-4">
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      {error && (
        <p className="text-red-500 mt-4">
          Error: {error.status} - {error.data?.error || "Failed to create product"}
        </p>
      )}
    </main>
  );
}

export default AdminProductCreatePage;