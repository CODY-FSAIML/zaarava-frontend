import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";

// Define the shape of our product
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Shop = () => {
  // Read category filter from URL
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  // Dynamic state for Django API
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter UI states
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Sage", "Terracotta", "Ivory", "Navy", "Maroon", "Black"];
  const fabrics = ["Cotton", "Silk", "Linen", "Georgette", "Chanderi"];

  // Fetch Data from Django based on URL Category
  useEffect(() => {
    setLoading(true);
    
    // Build the Django API URL dynamically
    let apiUrl = 'http://localhost:8000/api/products/';
    if (categoryFilter) {
      apiUrl += `?category=${categoryFilter}`;
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const formattedProducts = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          category: item.category.name
        }));
        setAllProducts(formattedProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [categoryFilter]); // Re-fetches if the URL category changes

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const FilterSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="cultural-button text-lg text-foreground mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={500}
          max={6000}
          step={100}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="cultural-button text-lg text-foreground mb-4">Size</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox 
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
              />
              <Label htmlFor={`size-${size}`} className="cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="cultural-button text-lg text-foreground mb-4">Color</h3>
        <div className="space-y-3">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox 
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => handleColorToggle(color)}
              />
              <Label htmlFor={`color-${color}`} className="cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="cultural-button text-lg text-foreground mb-4">Fabric</h3>
        <div className="space-y-3">
          {fabrics.map((fabric) => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox id={`fabric-${fabric}`} />
              <Label htmlFor={`fabric-${fabric}`} className="cursor-pointer">
                {fabric}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedSizes([]);
          setSelectedColors([]);
          setPriceRange([1000, 5000]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-12 md:py-16 bg-secondary/20 warli-border-bottom">
          <div className="container mx-auto px-4">
            <h1 className="cultural-heading text-4xl md:text-5xl lg:text-6xl text-foreground text-center mb-4">
              Shop {categoryFilter ? <span className="capitalize">{categoryFilter}</span> : "Collection"}
            </h1>
            <p className="text-center text-muted-foreground text-lg font-light">
              Discover timeless Indo-Western pieces
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Mobile Filter + Sort Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle className="cultural-button">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSection />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <p className="text-sm text-muted-foreground">
                  Showing {allProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm whitespace-nowrap">
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort" className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="bestselling">Best Selling</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-8">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-4">
                  <h2 className="cultural-button text-xl text-foreground mb-6">Filters</h2>
                  <FilterSection />
                </div>
              </aside>

              {/* Product Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="text-center py-20 text-muted-foreground tracking-widest animate-pulse">
                    LOADING COLLECTIONS...
                  </div>
                ) : allProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground font-light mb-4">No products found in this category.</p>
                    <Button variant="outline" onClick={() => window.location.href = '/shop'}>View All Collections</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {allProducts.map((product) => (
                      <ProductCard key={product.id} {...product} showQuickView />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* You May Also Like */}
        <section className="py-20 md:py-32 bg-secondary/20 warli-pattern-bg">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="cultural-heading text-3xl md:text-4xl text-foreground mb-4">
                You May Also Like
              </h2>
              <p className="text-muted-foreground font-light">
                Curated recommendations just for you
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {allProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;