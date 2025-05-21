import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  line_1: z.string().min(1, "Line 1 is required"),
  line_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number format (e.g., +94702700100)"),
});

const ShippingAddressForm = ({ cart }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      line_1: "",
      line_2: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
    },
  });

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  console.log(cart);

  async function handleSubmit(values) {
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        product: {
          _id: item.product?._id || item._id,
          name: item.product?.name || item.name || "Unknown Product",
          price: Number(item.product?.price || item.price) || 0,
          image: item.product?.image || item.image || "",
          description: item.product?.description || item.description || "No description",
        },
        quantity: Number(item.quantity) || 1,
      })),
      shippingAddress: {
        line_1: values.line_1,
        line_2: values.line_2 || "",
        city: values.city,
        state: values.state,
        zip_code: values.zip_code,
        phone: values.phone,
      },
    };

    try {
      const response = await createOrder(orderData).unwrap();
      const orderId = response.orderId;
      if (!orderId) throw new Error("No order ID returned from backend");
      toast.success("Order created successfully");
      navigate(`/shop/payment?orderId=${orderId}`);
    } catch (err) {
      console.error("Order creation failed:", {
        status: err.status,
        data: err.data,
        message: err.message,
      });
      toast.error(`Checkout failed: ${err.data?.message || "Invalid order data"}`);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="16/1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Colombo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Wester Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="11850" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+94700170300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mt-8 h-full">
            <Button type="submit" className="w-full mt-auto" disabled={isLoading || cart.length === 0}>
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </Button>
            {error && (
              <p className="text-red-500 mt-2">
                Error: {error.data?.message || "Failed to create order"}
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
