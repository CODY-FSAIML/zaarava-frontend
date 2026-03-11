import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import founderStory from "@/assets/founder-story.jpg";
import craftsmanship from "@/assets/about-craftsmanship.jpg";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-light text-center mb-6">
            The Zaarava Story
          </h1>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto italic">
            "Where Timeless Meets Today"
          </p>
        </div>

        {/* Brand Philosophy */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6">Brand Philosophy</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Born from the desire to celebrate women who carry grace, art, and rebellion in the same breath. 
              Zaarava is for the soulful woman — the one who finds beauty in slow moments, honors her roots, 
              yet walks boldly into the new. We create Indo-Western pieces that feel like poetry stitched into fabric.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed italic">
              "For women who carry both calm and courage."
            </p>
          </div>
        </section>

        {/* The Meaning Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-light mb-6">The Meaning of Zaarava</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A word that feels like poetry — it's not just a brand, it's a reflection of you. 
                Zaarava embodies the essence of timeless elegance meeting contemporary spirit. 
                It's the whisper of tradition in every stitch, the boldness of modernity in every silhouette.
              </p>
            </div>
          </div>
        </section>

        {/* Founder's Note */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-light mb-6">Founder's Note</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Growing up surrounded by the rich tapestry of Indian textiles and the evolving landscape of modern fashion, 
                I always felt there was a space waiting to be filled — a space where tradition doesn't confine, 
                but rather inspires freedom of expression.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Zaarava was born from this vision. Every piece we create is a conversation between heritage and 
                contemporary life, designed for women who refuse to choose between their roots and their wings.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                My design belief is simple: fashion should feel like an extension of your soul, not a costume. 
                It should empower you to move through the world with both grace and audacity.
              </p>
              <p className="text-sm text-muted-foreground italic">
                — Founder, Zaarava
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-[3/4] overflow-hidden bg-muted rounded-sm">
                <img
                  src={founderStory}
                  alt="Founder in studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="aspect-[4/3] overflow-hidden bg-background rounded-sm">
                <img
                  src={craftsmanship}
                  alt="Artisan craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-light mb-6">Our Process</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Ethically Made</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Every Zaarava piece is crafted with respect — for the artisans who create it, 
                      the environment it comes from, and the woman who will wear it.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Hand-Chosen Fabrics</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We source natural, breathable fabrics that feel as good as they look. 
                      Cotton, linen, and silk blends that honor your skin and the earth.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Slow-Crafted Details</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In a world of fast fashion, we choose slow. Hand-block prints, delicate embroidery, 
                      and thoughtful finishing touches that make each piece uniquely special.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-light mb-8">
              Explore Our Story Through Our Designs
            </h2>
            <Link to="/shop">
              <Button size="lg" className="cultural-button h-12 px-8 text-sm tracking-wide">
                SHOP THE COLLECTION
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
