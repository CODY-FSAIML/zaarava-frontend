import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background mt-10 md:mt-20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light tracking-widest mb-4">ZAARAVA</h3>
            <p className="text-sm text-muted-foreground">
              Indo-Western minimal luxury for the soulful woman.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">SHOP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/collections?category=kurtis" className="hover:text-foreground transition-colors">
                  Kurtis
                </Link>
              </li>
              <li>
                <Link to="/collections?category=coords" className="hover:text-foreground transition-colors">
                  Co-ords
                </Link>
              </li>
              <li>
                <Link to="/collections?category=dresses" className="hover:text-foreground transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/collections?category=tops" className="hover:text-foreground transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link to="/collections?category=skirts" className="hover:text-foreground transition-colors">
                  Skirts
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">HELP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-foreground transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-wide">FOLLOW US</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-muted-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-muted-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-muted-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Zaarava. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
