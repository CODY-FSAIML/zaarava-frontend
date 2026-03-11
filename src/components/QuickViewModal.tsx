import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export const QuickViewModal = ({
  isOpen,
  onClose,
  product,
}: QuickViewModalProps) => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image,
      category: product.category,
    });
    onClose();
  };

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    toast.success(
      wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️"
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-background border-border">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-4">
          {/* Product Image */}
          <div className="aspect-[3/4] overflow-hidden bg-muted rounded-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <DialogHeader>
              <p className="text-xs text-muted-foreground tracking-wide uppercase mb-2">
                {product.category}
              </p>
              <DialogTitle className="cultural-heading text-2xl md:text-3xl text-foreground mb-2">
                {product.name}
              </DialogTitle>
              <p className="text-xl md:text-2xl font-medium text-foreground mb-4 md:mb-6">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </DialogHeader>

            <div className="space-y-4 md:space-y-6 flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Crafted with love and attention to detail, this piece embodies
                the perfect fusion of traditional Indian aesthetics and
                contemporary design.
              </p>

              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium mb-3">Select Size</p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 md:w-12 md:h-12 border rounded-sm text-sm transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Material:
                  </span>{" "}
                  Premium Cotton Blend
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Care:</span> Dry
                  clean recommended
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Delivery:
                  </span>{" "}
                  5-7 business days
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 md:mt-6">
              <Button
                className="flex-1 cultural-button bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={handleWishlist}
              >
                <Heart
                  className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
            </div>

            <Link to={`/product/${product.id}`} onClick={onClose}>
              <Button variant="link" className="w-full mt-3 md:mt-4 text-primary">
                View Full Details →
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
