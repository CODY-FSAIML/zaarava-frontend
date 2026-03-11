import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Instagram } from "lucide-react";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";

const Community = () => {
  const [formData, setFormData] = useState({
    name: "",
    instagram: "",
    story: ""
  });

  const communityPhotos = [
    {
      id: 1,
      image: community1,
      name: "Priya S.",
      quote: "Wearing Zaarava makes me feel like the best version of myself — rooted yet free."
    },
    {
      id: 2,
      image: community2,
      name: "Ananya M.",
      quote: "These pieces aren't just clothes, they're conversations. Every detail tells a story."
    },
    {
      id: 3,
      image: community3,
      quote: "From morning meetings to evening walks, my Zaarava co-ord moves with me effortlessly.",
      name: "Kavya R."
    },
    {
      id: 4,
      image: community1,
      name: "Meera D.",
      quote: "I love how Zaarava celebrates my Indian heritage while keeping it modern and minimal."
    },
    {
      id: 5,
      image: community2,
      name: "Isha K.",
      quote: "Quality you can feel, style you can own. That's Zaarava for me."
    },
    {
      id: 6,
      image: community3,
      name: "Rhea P.",
      quote: "Finally, a brand that understands what the modern Indian woman wants to wear."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
    alert("Thank you for sharing your story! We'll review and feature it soon.");
    setFormData({ name: "", instagram: "", story: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-light text-center mb-6">
            Stories Woven With You
          </h1>
          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto italic">
            "Real women, real stories, real Zaarava moments."
          </p>
        </div>

        {/* Instagram Banner */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="h-8 w-8" />
              <h2 className="text-2xl md:text-3xl font-light">Tag Us & Get Featured</h2>
            </div>
            <p className="text-lg mb-6">
              Share your Zaarava moments with <span className="font-medium">@zaarava</span>
            </p>
            <p className="text-sm opacity-90">
              Use #ZaaravaOnYou to be part of our community gallery
            </p>
          </div>
        </section>

        {/* Community Gallery */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
            Zaarava on You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityPhotos.map((photo) => (
              <div key={photo.id} className="group">
                <div className="aspect-square overflow-hidden bg-muted rounded-sm mb-4">
                  <img
                    src={photo.image}
                    alt={photo.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <blockquote className="space-y-2">
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "{photo.quote}"
                  </p>
                  <footer className="text-sm font-medium">— {photo.name}</footer>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Your Story */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-center mb-6">
                Share Your Zaarava Story
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                We'd love to feature you! Tell us about your favorite Zaarava piece and how it makes you feel.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 rounded-sm">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                    Instagram Handle (Optional)
                  </label>
                  <Input
                    id="instagram"
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@yourusername"
                  />
                </div>
                <div>
                  <label htmlFor="story" className="block text-sm font-medium mb-2">
                    Your Zaarava Story
                  </label>
                  <Textarea
                    id="story"
                    required
                    rows={5}
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    placeholder="Tell us what you love about your Zaarava piece..."
                  />
                </div>
                <Button type="submit" className="w-full h-12 cultural-button">
                  SUBMIT YOUR STORY
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to let Zaarava feature your story on our website and social media.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Customer Love Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-muted p-8 rounded-sm">
              <p className="text-muted-foreground italic mb-4">
                "Zaarava pieces are investment pieces. The quality speaks for itself, and I know I'll be wearing them for years."
              </p>
              <p className="text-sm font-medium">— Sneha T.</p>
            </div>
            <div className="bg-muted p-8 rounded-sm">
              <p className="text-muted-foreground italic mb-4">
                "I get so many compliments whenever I wear Zaarava. People always ask where I got my outfit from!"
              </p>
              <p className="text-sm font-medium">— Aditi V.</p>
            </div>
            <div className="bg-muted p-8 rounded-sm">
              <p className="text-muted-foreground italic mb-4">
                "The attention to detail is incredible. You can tell every piece is made with love and intention."
              </p>
              <p className="text-sm font-medium">— Naina S.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
