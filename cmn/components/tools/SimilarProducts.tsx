"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  brand: string;
  productName: string;
  availability?: string;
  description?: string;
  warranty?: string;
  material?: string;
  finish?: string;
  mainImage: string;
  subImages?: string[];
  reviews?: { rating: number }[];
  category?: string;
  price?: number;
}

export default function SimilarProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const router = useRouter();

  // Determine items per view responsively
  useEffect(() => {
    const updateItems = () => {
      const w = window.innerWidth;
      if (w < 480) setItemsPerView(1);
      else if (w < 640) setItemsPerView(1);
      else if (w < 768) setItemsPerView(2);
      else if (w < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Product[];
        setProducts(list);
      } catch (err) {
        console.error("fetch products error", err);
      }
    };
    fetchProducts();
  }, []);

  // Create infinite carousel data
  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    
    // Create extended array for seamless looping
    const extendedProducts = [...products, ...products, ...products];
    const startIndex = products.length + currentIndex;
    return extendedProducts.slice(startIndex, startIndex + itemsPerView);
  };

  const visibleProducts = getVisibleProducts();

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    const THRESHOLD = 50;
    if (diff > THRESHOLD) handleNext();
    else if (diff < -THRESHOLD) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse drag support
  const dragStartX = useRef<number | null>(null);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    if (carouselRef.current) carouselRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current == null) return;
    const diff = dragStartX.current - e.clientX;
    const THRESHOLD = 50;
    if (diff > THRESHOLD) handleNext();
    else if (diff < -THRESHOLD) handlePrev();
    dragStartX.current = null;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    dragStartX.current = null;
    if (carouselRef.current) carouselRef.current.style.cursor = "grab";
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  // Auto-play (optional - remove if not needed)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-4 sm:mb-5 md:mb-6 text-center px-4">
        Explore <span className="ml-1 sm:ml-2">Similar Products</span>
      </h2>

      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Carousel viewport */}
        <div
          ref={carouselRef}
          className="overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "grab" }}
        >
          {/* Products row with smooth transition */}
          <div
            className={`flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 justify-center ${
              isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
            }`}
          >
            {visibleProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex-shrink-0 hover:scale-105"
                style={{ 
                  width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 0.5}rem)`, 
                  maxWidth: "280px",
                  display: "flex", 
                  flexDirection: "column" 
                }}
                onClick={() => router.push(`/products/tools/${product.id}`)}
              >
                <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 rounded-t-lg sm:rounded-t-xl overflow-hidden">
                  <Image
                    src={product.mainImage}
                    alt={product.productName}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  {/* Availability Badge */}
                  {product.availability && (
                    <span className={`absolute top-2 left-2 text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                      product.availability === "in-stock" 
                        ? "bg-green-600 text-white" 
                        : "bg-red-600 text-white"
                    }`}>
                      {product.availability === "in-stock" ? "In Stock" : "Out of Stock"}
                    </span>
                  )}
                </div>

                <div className="p-2 sm:p-3 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight mt-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                      {product.productName}
                    </h3>
                  </div>
                  
                  {/* Price and Reviews */}
                  <div className="mt-2">
                    {product.price && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                    )}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="text-xs text-gray-500">
                        {product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {products.length > itemsPerView && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-2 sm:-left-3 md:left-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white shadow-lg rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center hover:scale-105 transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous products"
            >
              <span className="text-white text-lg sm:text-xl select-none">‹</span>
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-2 sm:-right-3 md:right-2 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-black text-white shadow-lg rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center hover:scale-105 transition-all duration-200 backdrop-blur-sm"
              aria-label="Next products"
            >
              <span className="text-white text-lg sm:text-xl select-none">›</span>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {products.length > itemsPerView && (
          <div className="flex justify-center mt-3 sm:mt-4 gap-1.5 sm:gap-2">
            {Array.from({ length: Math.min(products.length, 10) }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  currentIndex === i 
                    ? "w-4 sm:w-6 bg-gray-900" 
                    : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}