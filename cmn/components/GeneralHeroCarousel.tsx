"use client";

import { useState, useEffect } from "react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface HeroText {
  title: string;
  description: string;
}

interface CarouselData {
  heroText: HeroText;
  images: CarouselImage[];
}

interface DynamicHeroCarouselProps {
  page: keyof typeof import('../data/carousel-data.json');
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

const DynamicHeroCarousel = ({
  page,
  autoAdvance = true,
  autoAdvanceInterval = 5000,
  showArrows = true,
  showDots = true,
  className = "",
}: DynamicHeroCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselData, setCarouselData] = useState<CarouselData | null>(null);

  // Load carousel data based on page
  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        const data = await import('../data/carousel-data.json');
        setCarouselData(data.default[page] || data[page]);
      } catch (error) {
        console.error(`Error loading carousel data for page: ${page}`, error);
      }
    };

    loadCarouselData();
  }, [page]);

  const scrollPrev = () => {
    if (!carouselData) return;
    setSelectedIndex((prev) => 
      prev === 0 ? carouselData.images.length - 1 : prev - 1
    );
  };

  const scrollNext = () => {
    if (!carouselData) return;
    setSelectedIndex((prev) => 
      prev === carouselData.images.length - 1 ? 0 : prev + 1
    );
  };

  const scrollTo = (index: number) => {
    setSelectedIndex(index);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!autoAdvance || !carouselData) return;

    const interval = setInterval(() => {
      scrollNext();
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [autoAdvance, autoAdvanceInterval, carouselData]);

  // Show loading state
  if (!carouselData) {
    return (
      <section className={`relative w-full bg-white ${className}`}>
        <div className="container mx-auto px-8 py-16 text-center">
          <div className="animate-pulse">
            <div className="mx-auto mb-6 h-8 w-3/4 bg-gray-300 rounded"></div>
            <div className="mx-auto h-4 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="relative w-full aspect-[16/9] bg-gray-200"></div>
      </section>
    );
  }

  return (
    <section className={`relative w-full bg-white ${className}`}>
      {/* Hero Text Section */}
      <div className="container mx-auto px-8 py-16 text-center">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl lg:text-4xl">
          {carouselData.heroText.title}
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-black md:text-base">
          {carouselData.heroText.description}
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out" 
            style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          >
            {carouselData.images.map((image, index) => (
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
        {showArrows && (
          <>
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
          </>
        )}

        {/* Dots Navigation */}
        {showDots && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {carouselData.images.map((_, index) => (
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
        )}
      </div>
    </section>
  );
};

export default DynamicHeroCarousel;