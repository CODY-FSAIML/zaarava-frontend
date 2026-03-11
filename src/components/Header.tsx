import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import zaaravaLogo from "@/assets/zaarava-logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/shop");
    toast.info("Browse our full collection");
  };

  const shopCategories = [
    { name: "All Products", path: "/shop" },
    { name: "New Arrivals", path: "/shop?category=new-arrivals" },
    { name: "Kurti Collection", path: "/shop?category=kurtis" },
    { name: "Dresses & Maxis", path: "/shop?category=dresses" },
    { name: "Indo-Western Tops", path: "/shop?category=tops" },
    { name: "Co-ord Sets", path: "/shop?category=co-ords" },
    { name: "Skirts & Bottoms", path: "/shop?category=skirts" },
    { name: "Festive Edits", path: "/shop?category=festive" },
    { name: "Sale / Offers", path: "/shop?category=sale" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-primary backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img 
              src={zaaravaLogo} 
              alt="Zaarava - The Indie Thread" 
              className="h-10 md:h-12 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cultural-button text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 bg-transparent hover:bg-primary-foreground/10 data-[state=open]:bg-primary-foreground/10">
                    SHOP
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border-border shadow-xl">
                    <ul className="grid w-[300px] gap-1 p-4">
                      {shopCategories.map((category) => (
                        <li key={category.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={category.path}
                              className="block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-light">{category.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link 
              to="/collections" 
              className="cultural-button text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors"
            >
              COLLECTIONS
            </Link>
            <Link 
              to="/community" 
              className="cultural-button text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors"
            >
              COMMUNITY
            </Link>
            <Link 
              to="/about" 
              className="cultural-button text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors"
            >
              OUR STORY
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 space-y-4 border-t border-primary-foreground/20">
            <div>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="cultural-button flex items-center justify-between w-full text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors"
              >
                SHOP
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileShopOpen && (
                <div className="mt-3 ml-4 space-y-3">
                  {shopCategories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="block text-xs text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              to="/collections" 
              className="cultural-button block text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              COLLECTIONS
            </Link>
            <Link 
              to="/community" 
              className="cultural-button block text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              COMMUNITY
            </Link>
            <Link 
              to="/about" 
              className="cultural-button block text-xs tracking-[0.2em] text-primary-foreground hover:text-primary-foreground/70 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              OUR STORY
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};