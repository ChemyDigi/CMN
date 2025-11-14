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
    const interval = setInterval(() => {
      scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white">
      {/* Hero Text Section */}
<div className="container mx-auto px-8 py-16 text-center">
    <h1 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl lg:text-4xl">
        Built for Those Who Build the World
    </h1>
    <p className="mx-auto max-w-3xl text-sm text-black md:text-base">
        From precision hand tools to heavy duty equipment, our products are
        engineered for performance, durability, and results you can trust job after
        job.
    </p>
</div>

      {/* Carousel Section */}
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" 
               style={{ transform: `translateX(-${selectedIndex * 100}%)` }}>
            {carouselImages.map((image, index) => (
              <div key={index} className="min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                  <img
                    src={image.src} 
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center"
        aria-label="Previous slide"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="white"
        >
            <path d="M15 18L9 12L15 6L15 18Z" />
        </svg>
        </button>
        <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center"
        aria-label="Next slide"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="white"
        >
            <path d="M9 18L15 12L9 6L9 18Z" />
        </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "w-8 bg-background"
                  : "bg-background/50 hover:bg-background/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;