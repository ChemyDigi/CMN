"use client";

import { useState, useEffect } from "react";

const carouselImages = [
  {
    src: "/images/products-tools/product_sample.jpg",
    alt: "Professional construction tools and equipment",
  },
  {
    src: "/images/products-tools/product_sample.jpg",
    alt: "Quality hand tools for precision work",
  },
  {
    src: "/images/products-tools/product_sample.jpg",
    alt: "Heavy duty equipment for job sites",
  },
];

const HeroCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const scrollNext = () => {
    setSelectedIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const scrollTo = (index: number) => {
    setSelectedIndex(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Touch swipe functionality
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scrollNext();
    }
    if (isRightSwipe) {
      scrollPrev();
    }
  };

  return (
    <section className="relative w-full bg-white">
      {/* Hero Text Section */}
      <div className="container mx-auto px-4 py-12 text-center sm:px-6 md:px-8 lg:py-16 xl:px-12">
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-black sm:mb-5 sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl xl:text-6xl">
          Built for Those Who Build the World
        </h1>
        <p className="mx-auto text-sm text-black sm:max-w-md sm:text-base md:max-w-2xl md:text-lg lg:max-w-3xl lg:text-xl">
          From precision hand tools to heavy duty equipment, our products are
          engineered for performance, durability, and results you can trust job after
          job.
        </p>
      </div>

      {/* Carousel Section */}
      <div 
        className="relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-[4/3] w-full sm:aspect-[3/2] md:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[24/9]">
                  <img
                    src={image.src} 
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 sm:h-10 sm:w-10 md:left-4 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15 18L9 12L15 6L15 18Z" />
          </svg>
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 sm:h-10 sm:w-10 md:right-4 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 18L15 12L9 6L9 18Z" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 sm:bottom-4 sm:gap-1.5 md:bottom-6 md:gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              style={{
                width: index === selectedIndex ? "24px" : "8px",
                height: "8px"
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-1 text-xs text-white sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-sm md:right-6 md:top-6 md:px-4 md:py-2 md:text-base">
          {selectedIndex + 1} / {carouselImages.length}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;