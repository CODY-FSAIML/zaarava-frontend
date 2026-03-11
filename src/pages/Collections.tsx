import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import collectionBanner from "@/assets/collection-banner.jpg";
import modelCoord1 from "@/assets/model-coord-1.jpg";
import modelCoord2 from "@/assets/model-coord-2.jpg";
import modelCoord3 from "@/assets/model-coord-3.jpg";
import modelCoord4 from "@/assets/model-coord-4.jpg";
import modelKurti from "@/assets/model-kurti-1.jpg";
import modelDress from "@/assets/model-dress-1.jpg";

const Collections = () => {
  const lookbookItems = [
    {
      id: 1,
      image: modelCoord1,
      name: "Sunset Co-ord Set",
      price: 2100
    },
    {
      id: 2,
      image: modelCoord2,
      name: "Terracotta Dreams",
      price: 1850
    },
    {
      id: 3,
      image: modelCoord3,
      name: "Sage Elegance",
      price: 2400
    },
    {
      id: 4,
      image: modelCoord4,
      name: "Indigo Breeze",
      price: 1950
    }
  ];

  const shopItems = [
    {
      id: "1",
      image: modelKurti,
      name: "Block Print Kurti",
      price: 1650,
      category: "Kurtis"
    },
    {
      id: "2",
      image: modelDress,
      name: "Maxi Dress",
      price: 2800,
      category: "Dresses"
    },
    {
      id: "3",
      image: modelCoord1,
      name: "Coord Set",
      price: 2100,
      category: "Co-ords"
    },
    {
      id: "4",
      image: modelCoord2,
      name: "Terracotta Set",
      price: 1850,
      category: "Co-ords"
    },
    {
      id: "5",
      image: modelCoord3,
      name: "Sage Coord",
      price: 2400,
      category: "Co-ords"
    },
    {
      id: "6",
      image: modelCoord4,
      name: "Indigo Coord",
      price: 1950,
      category: "Co-ords"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Banner Section */}
        <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          <img
            src={collectionBanner}
            alt="Roots Rewritten Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-light mb-4">Roots Rewritten</h1>
              <p className="text-lg md:text-xl italic">Spring/Summer 2025</p>
            </div>
          </div>
        </div>

        {/* Collection Story */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6">The Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Roots Rewritten is a celebration of heritage reimagined. Inspired by the timeless artistry of 
              traditional Indian textiles, this collection breathes new life into age-old motifs through 
              contemporary silhouettes and mindful craftsmanship.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Each piece tells a story of cultural continuity and modern evolution — hand-block prints meet 
              clean lines, earthy tones blend with unexpected pops, and flowing fabrics create movement that 
              feels both rooted and free.
            </p>
            <p className="text-lg italic text-muted-foreground">
              "For women who honor their past while writing their own future."
            </p>
          </div>
        </section>

        {/* Lookbook Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-light text-center mb-12">Featured Looks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {lookbookItems.map((item) => (
                <div key={item.id} className="group">
                  <div className="aspect-[3/4] overflow-hidden bg-background rounded-sm mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm font-light">{item.name}</h3>
                  <p className="text-sm font-medium">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop the Collection Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light mb-4">Shop the Collection</h2>
            <p className="text-muted-foreground">Discover the complete Roots Rewritten collection</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {shopItems.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-muted rounded-sm mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground tracking-wide uppercase">{item.category}</p>
                  <h3 className="text-sm font-light group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm font-medium">₹{item.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="h-12 px-8 text-sm tracking-wide">
                VIEW ALL PRODUCTS
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
