import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  
  // --- NEW: Dynamic State ---
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const sizes = ["XS", "S", "M", "L", "XL"];

  // --- NEW: Fetch Product Data ---
  useEffect(() => {
    setLoading(true);
    
    // 1. Fetch the specific product clicked
    fetch(`${API_URL}/api/products/${id}/`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          id: data.id.toString(),
          name: data.name,
          price: parseFloat(data.price),
          image: data.image,
          category: data.category.name
        });
      })
      .catch(err => console.error("Error fetching product details:", err));

    // 2. Fetch all products for the "You May Also Like" section
    fetch(`${API_URL}/api/products/`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          category: item.category.name
        }));
        // Filter out the current product and grab 3 recommendations
        setRecommendedProducts(formatted.filter((p: Product) => p.id !== id).slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching recommendations:", err);
        setLoading(false);
      });
  }, [id]); // Re-run if the URL ID changes

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.image,
        category: product.category,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    if (!product) return;
    handleAddToCart();
    navigate("/cart");
  };

  const handleShare = (platform: string) => {
    if (!product) return;
    const url = window.location.href;
    const text = `Check out ${product.name} from Zaarava`;

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
        break;
      case "instagram":
        navigator.clipboard.writeText(url);
        toast.success("Link copied! Share it on Instagram");
        break;
      case "pinterest":
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`, "_blank");
        break;
    }
  };

  // --- NEW: Loading State ---
  if (loading || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl font-light tracking-widest uppercase animate-pulse">Loading Details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Product Image */}
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4 md:mb-6">
                <p className="text-xs text-muted-foreground tracking-wide uppercase mb-2">
                  {product.category}
                </p>
                <h1 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">
                  {product.name}
                </h1>
                <p className="text-xl md:text-2xl font-medium">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mb-6 md:mb-8">
                <p className="text-muted-foreground leading-relaxed italic mb-3 text-sm md:text-base">
                  "A piece that feels like freedom and calm stitched together."
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Crafted from soft cotton-linen blend, this Indo-Western piece
                  embodies effortless elegance. Features a relaxed fit with
                  delicate hand-block details. Perfect for both everyday grace
                  and special moments.
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-sm font-medium mb-3 tracking-wide">SELECT SIZE</h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 md:w-14 md:h-12 border transition-colors text-sm ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-sm font-medium mb-3 tracking-wide">QUANTITY</h3>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now */}
              <div className="flex gap-3 md:gap-4 mb-6">
                <Button className="flex-1 h-12 text-xs md:text-sm tracking-wide" size="lg" variant="outline" onClick={handleAddToCart}>
                  ADD TO CART
                </Button>
                <Button className="flex-1 h-12 text-xs md:text-sm tracking-wide" size="lg" onClick={handleBuyNow}>
                  BUY NOW
                </Button>
              </div>

              {/* Share Buttons - Kept exact same SVG icons from your code */}
              <div className="flex items-center gap-3 pb-6 border-b border-border">
                <span className="text-sm font-medium tracking-wide">SHARE:</span>
                <button onClick={() => handleShare("whatsapp")} className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </button>
                <button onClick={() => handleShare("instagram")} className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </button>
                <button onClick={() => handleShare("pinterest")} className="w-10 h-10 border border-border hover:border-foreground transition-colors flex items-center justify-center">
                   <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24 18.635 24 24 18.633 24 12.013 24 5.393 18.635 0 12.017 0z" /></svg>
                </button>
              </div>

              {/* Static Product Details */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">FABRIC & CARE</h4>
                  <p className="text-sm text-muted-foreground">Cotton-linen blend. Hand wash cold. Lay flat to dry.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">FIT DETAILS</h4>
                  <p className="text-sm text-muted-foreground">Model is 5'6" and wearing size S. Relaxed, comfortable fit.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">DELIVERY & RETURNS</h4>
                  <p className="text-sm text-muted-foreground">Free shipping on orders above ₹2,000. Easy 7-day returns.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">ETHICALLY MADE</h4>
                  <p className="text-sm text-muted-foreground">Hand-chosen fabrics, slow-crafted with care.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Recommendations */}
          {recommendedProducts.length > 0 && (
            <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-border">
              <h2 className="text-xl md:text-3xl font-light mb-6 md:mb-8 text-center">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;