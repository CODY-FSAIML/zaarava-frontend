import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { HeroVideo } from "@/components/HeroVideo";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import heroCoordMain from "@/assets/hero-coord-main.jpg";
import modelKurti from "@/assets/model-kurti-1.jpg";
import modelCoord from "@/assets/model-coord-1.jpg";
import modelCoord2 from "@/assets/model-coord-2.jpg";
import modelCoord3 from "@/assets/model-coord-3.jpg";
import modelCoord4 from "@/assets/model-coord-4.jpg";
import modelDress from "@/assets/model-dress-1.jpg";
import modelTop from "@/assets/model-top-1.jpg";
import modelSkirt from "@/assets/model-skirt-1.jpg";
import lifestyleEditorial from "@/assets/lifestyle-editorial.jpg";
import journalBts from "@/assets/journal-bts.jpg";

const featuredProducts = [{
  id: "1",
  name: "Sage Embroidered Co-ord",
  price: 3200,
  image: heroCoordMain,
  category: "Co-ords"
}, {
  id: "2",
  name: "Terracotta Blazer Set",
  price: 4100,
  image: modelCoord2,
  category: "Co-ords"
}, {
  id: "3",
  name: "Ivory Maroon Palazzo Set",
  price: 3800,
  image: modelCoord3,
  category: "Co-ords"
}, {
  id: "4",
  name: "Navy Heritage Co-ord",
  price: 3600,
  image: modelCoord4,
  category: "Co-ords"
}];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality and craftsmanship are exceptional. I feel so elegant and connected to my roots wearing Zaarava."
  },
  {
    name: "Aisha Khan",
    location: "Delhi",
    rating: 5,
    text: "Finally found a brand that understands modern Indian women. The designs are timeless yet contemporary."
  },
  {
    name: "Neha Patel",
    location: "Bangalore",
    rating: 5,
    text: "Every piece tells a story. The attention to detail and the fusion of traditional and modern is perfect."
  },
  {
    name: "Kavya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "Zaarava has become my go-to for special occasions. The outfits always receive compliments!"
  }
];
const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing! 🎉");
    setEmail("");
  };

  return <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner - Carousel */}
        <HeroVideo />

        {/* Featured Categories */}
        <section className="py-10 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="cultural-heading text-2xl md:text-4xl text-foreground mb-3">
                Shop by Category
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
              {[
                { name: "Kurtis", image: modelKurti, link: "/collections" },
                { name: "Co-ords", image: modelCoord, link: "/collections" },
                { name: "Dresses", image: modelDress, link: "/collections" },
                { name: "Tops", image: modelTop, link: "/collections" },
                { name: "Skirts", image: modelSkirt, link: "/collections" },
                { name: "New Arrivals", image: heroCoordMain, link: "/collections" }
              ].map((category) => (
                <Link
                  key={category.name}
                  to={category.link}
                  className="group relative aspect-[3/4] overflow-hidden bg-card rounded-sm"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <h3 className="cultural-button text-xs sm:text-sm md:text-base text-white text-center">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals - Clean Grid like Zara */}
        <section className="py-12 md:py-32 warli-border-top warli-border-bottom bg-background">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="cultural-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4">
                New Arrivals
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto font-light">
                Fresh styles that blend tradition with contemporary elegance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
              {featuredProducts.map(product => <ProductCard key={product.id} {...product} />)}
            </div>

            <div className="text-center">
              <Link to="/collections">
                <Button variant="outline" size="lg" className="cultural-button border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  VIEW ALL
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Shop the Story - Editorial Highlight */}
        <section className="py-12 md:py-32 bg-secondary/20 warli-pattern-bg">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
              <div className="order-2 md:order-1">
                <h2 className="cultural-heading text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 md:mb-6">
                  For Women Who Carry Grace, Art, and Rebellion
                </h2>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6 font-light">
                  Every Zaarava piece is a conversation—between heritage and now, between stillness and strength, between what was and what's becoming.
                </p>
                <p className="text-sm md:text-lg text-muted-foreground leading-relaxed mb-6 md:mb-8 font-light">
                  We celebrate the woman who carries both calm and courage, who honors her roots while embracing her evolution.
                </p>
                <Link to="/collections">
                  <Button size="lg" className="cultural-button bg-primary text-primary-foreground hover:bg-primary/90">
                    EXPLORE OUR STORY
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    src={lifestyleEditorial}
                    alt="Zaarava Lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zaarava Journal - Behind the Scenes */}
        <section className="py-12 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="cultural-heading text-2xl md:text-5xl text-foreground mb-3 md:mb-4">
                The Zaarava Journal
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg font-light">
                Stories of craft, culture, and the hands that create
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video overflow-hidden rounded-sm mb-8">
                <img
                  src={journalBts}
                  alt="Behind the Scenes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                  The Art of Slow-Made Fashion
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Step into our atelier where traditional Indian craftsmanship meets contemporary design. Each piece begins with a conversation between artisan and fabric, between heritage techniques and modern vision.
                </p>
                <Link to="/collections" className="text-primary hover:underline cultural-button">
                  Read More Stories →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Love Carousel */}
        <section className="py-12 md:py-32 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="cultural-heading text-2xl md:text-5xl mb-3 md:mb-4">
                Real Women in Zaarava
              </h2>
              <p className="text-sm md:text-lg font-light opacity-90">
                Stories from our community
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </section>


        {/* Newsletter */}
        <section className="py-12 md:py-32 warli-pattern-bg bg-background">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="cultural-heading text-2xl md:text-4xl lg:text-5xl text-foreground mb-4 md:mb-6">
                Be Part of Our Slow-Made Story
              </h2>
              <p className="text-muted-foreground text-sm md:text-lg mb-6 md:mb-8 font-light">
                Join our community for first access to new collections, behind-the-scenes stories, and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-sm text-sm md:text-base" 
                />
                <Button type="submit" size="lg" className="cultural-button bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  SUBSCRIBE
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Index;