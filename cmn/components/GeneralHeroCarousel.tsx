"use client";

import { useState, useEffect } from "react";

interface HeroText {
  title: string;
  description: string;
}

interface CarouselData {
  heroText: HeroText;
}

interface DynamicHeroCarouselProps {
  page: keyof typeof import('../data/carousel-data.json');
  className?: string;
}

const DynamicHeroCarousel = ({
  page,
  className = "",
}: DynamicHeroCarouselProps) => {
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
    </section>
  );
};

export default DynamicHeroCarousel;