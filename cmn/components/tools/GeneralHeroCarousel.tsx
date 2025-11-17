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
  page: keyof typeof import('@/data/carousel-data.json');
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
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Load carousel data based on page
  useEffect(() => {
    const loadCarouselData = async () => {
      try {
        setIsLoading(true);
        const data = await import('@/data/carousel-data.json');
        setCarouselData(data.default[page] || data[page]);
      } catch (error) {
        console.error(`Error loading carousel data for page: ${page}`, error);
      } finally {
        setIsLoading(false);
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

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scrollNext();
    } else if (isRightSwipe) {
      scrollPrev();
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!autoAdvance || !carouselData || carouselData.images.length <= 1) return;

    const interval = setInterval(() => {
      scrollNext();
    }, autoAdvanceInterval);

    return () => clearInterval(interval);
  }, [autoAdvance, autoAdvanceInterval, carouselData]);

  // Show loading state
  if (isLoading || !carouselData) {
    return (
      <section className={`relative w-full bg-white ${className}`}>
        <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20 text-center">
          <div className="animate-pulse">
            <div className="mx-auto mb-4 md:mb-6 h-6 md:h-8 lg:h-10 w-3/4 bg-gray-300 rounded"></div>
            <div className="mx-auto h-4 md:h-5 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] bg-gray-200"></div>
      </section>
    );
  }

  return (
    <section className={`relative w-full bg-white overflow-hidden ${className}`}>
      {/* Hero Text Section */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16 text-center">
        <h1 className="mb-4 md:mb-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-black leading-tight">
          {carouselData.heroText.title}
        </h1>
        <p className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed">
          {carouselData.heroText.description}
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {carouselData.images.map((image, index) => (
              <div key={index} className="min-w-0 flex-[0_0_100%] select-none">
                <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] w-full">
                  <img
                    src={image.src} 
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding={index === 0 ? "sync" : "async"}
                  />
                  {/* Mobile indicator */}
                  <div className="absolute top-4 right-4 md:hidden bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {index + 1} / {carouselData.images.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showArrows && carouselData.images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 md:left-4 top-1/2 flex h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
              >
                <path d="M15 18L9 12L15 6L15 18Z" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 md:right-4 top-1/2 flex h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
              >
                <path d="M9 18L15 12L9 6L9 18Z" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {showDots && carouselData.images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 flex -translate-x-1/2 gap-1 md:gap-2 px-4">
            {carouselData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`flex-shrink-0 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-white shadow-lg scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                style={{
                  width: index === selectedIndex ? "24px" : "8px",
                  height: "8px"
                }}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}

        {/* Progress Bar for Auto Advance */}
        {autoAdvance && carouselData.images.length > 1 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-black/10">
            <div 
              className="h-full bg-white transition-all duration-300 ease-linear"
              style={{
                width: autoAdvance ? '100%' : '0%',
                animation: autoAdvance ? `progress ${autoAdvanceInterval}ms linear` : 'none'
              }}
            />
          </div>
        )}
      </div>

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default DynamicHeroCarousel;