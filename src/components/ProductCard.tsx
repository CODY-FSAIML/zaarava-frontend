import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { QuickViewModal } from "@/components/QuickViewModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  showQuickView?: boolean;
}

export const ProductCard = ({ id, name, price, image, category, showQuickView = false }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <Link to={`/product/${id}`} className="group block">
        <div className="aspect-[3/4] overflow-hidden bg-muted rounded-sm relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Quick View Button - Shows on Hover */}
          {showQuickView && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                onClick={handleQuickView}
                variant="secondary"
                size="sm"
                className="cultural-button bg-white text-primary hover:bg-white/90"
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xs text-muted-foreground tracking-wide uppercase">{category}</p>
          <h3 className="text-sm font-light group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm font-medium">₹{price}</p>
        </div>
      </Link>

      {showQuickView && (
        <QuickViewModal
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          product={{ id, name, price, image, category }}
        />
      )}
    </>
  );
};
