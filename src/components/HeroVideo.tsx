import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-video-poster.jpg";

export const HeroVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        setScrollY(window.scrollY);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const parallaxOffset = scrollY * 0.35;
  const contentOpacity = Math.max(1 - scrollY / (window.innerHeight * 0.6), 0);
  const contentTranslate = scrollY * 0.15;

  return (
    <section ref={sectionRef} className="relative w-full h-[100vh] overflow-hidden bg-black">
      {/* Video Background with parallax */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.15)` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {!isLoaded && (
          <img
            src={heroPoster}
            alt="Zaarava Fashion"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/25 z-10" />

      {/* Content Overlay with parallax fade */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 will-change-transform"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, -${contentTranslate}px, 0)`,
        }}
      >
        <div
          className={`transition-all duration-[800ms] ease-out ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h1
            className="font-cultural text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-[0.15em] mb-4 md:mb-6 drop-shadow-2xl"
            style={{ fontWeight: 500 }}
          >
            ZAARAVA
          </h1>
          <p className="text-white/85 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.25em] uppercase mb-10 md:mb-14 max-w-xl mx-auto">
            Indo-Western Co-ord Sets for the Modern Muse
          </p>
          <Link to="/collections">
            <button className="px-8 py-3 md:px-12 md:py-4 border border-white/70 text-white text-xs md:text-sm tracking-[0.2em] uppercase rounded-full bg-transparent hover:bg-white hover:text-black transition-all duration-500 ease-out backdrop-blur-sm">
              Shop Collection
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollDown}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white transition-all duration-500 animate-[bounce_2s_infinite] ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: showContent ? contentOpacity : 0 }}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1} />
      </button>
    </section>
  );
};
