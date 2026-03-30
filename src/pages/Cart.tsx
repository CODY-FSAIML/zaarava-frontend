import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  
  // --- NEW: Loading state for checkout button ---
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shipping = subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  // --- NEW: Dynamic Stripe Checkout Connection ---
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("http://localhost:8000/api/create-checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: items }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        // Redirect to Stripe Checkout or our simulated success page
        window.location.href = data.checkout_url;
      } else {
        toast.error("Failed to initialize checkout.");
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong connecting to the server.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-4xl font-light tracking-tight mb-8 md:mb-12">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16 md:py-20">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Your cart is empty
              </p>
              <Button asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 md:gap-6 border-b border-border pb-6"
                  >
                    <div className="w-24 h-32 md:w-32 md:h-40 bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between mb-1 md:mb-2">
                        <h3 className="font-light text-sm md:text-base truncate pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-muted-foreground hover:text-foreground flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                        Size: {item.size}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, -1)}
                            className="w-8 h-8 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 md:w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, 1)}
                            className="w-8 h-8 border border-border hover:border-foreground transition-colors flex items-center justify-center"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <p className="font-medium text-sm md:text-base">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-muted p-5 md:p-6 sticky top-24">
                  <h2 className="text-lg font-light mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders above ₹2,000
                      </p>
                    )}
                    <div className="pt-4 border-t border-border flex justify-between font-medium">
                      <span>Total</span>
                      <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* --- NEW: Dynamic Checkout Button --- */}
                  <Button
                    className="w-full h-12 transition-all"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      "PROCEED TO CHECKOUT"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;