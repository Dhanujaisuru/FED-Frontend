import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartItem({ item, handleUpdateQuantity, handleRemoveItem }) {
  return (
    <div key={item.product._id} className="flex items-center gap-4">
      <img
        src={item.product.image || "/placeholder.svg"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-sm text-gray-500">
          ${Number(item.product.price || 0).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
          disabled={item.quantity === 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.product._id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
