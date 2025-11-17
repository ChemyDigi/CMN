"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  brand: string;
  productName: string;
  availability: string;
  description: string;
  warranty: string;
  material: string;
  finish: string;
  mainImage: string;
  subImages: string[];
  reviews: Review[];
  category?: string;
}

interface Review {
  customerName: string;
  email: string;
  reviewDescription: string;
  rating: number;
}

export default function SimilarACRefProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ Fetch from "AC&Ref" collection
        const querySnapshot = await getDocs(collection(db, "AC&Ref"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching AC & Ref products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const scrollTo = (index: number) => {
    setCurrentIndex(index);
  };

  const handleProductClick = (productId: string) => {
    // ✅ Redirect to AC & Ref product details page
    router.push(`/products/ac-ref/${productId}`);
  };

  const getCurrentProducts = () => {
    if (products.length === 0) return [];

    const itemsPerView = getItemsPerView();
    const displayedProducts = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % products.length;
      displayedProducts.push(products[index]);
    }
    return displayedProducts;
  };

  const getItemsPerView = () => {
    // Responsive items per view
    if (typeof window === 'undefined') return 4;
    
    const width = window.innerWidth;
    if (width < 640) return 1;  // Mobile
    if (width < 768) return 2;  // Small tablet
    if (width < 1024) return 3; // Tablet
    return 4; // Desktop
  };

  const currentProducts = getCurrentProducts();

  if (products.length === 0) {
    return null; // or return a loading spinner
  }

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6 md:mb-8 text-center px-4">
        Explore <span className="ml-1 sm:ml-2">Similar AC & Refrigerator Products</span>
      </h2>

      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl px-2 sm:px-4">
        {/* Navigation Arrows */}
        {products.length > getItemsPerView() && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-8 sm:-left-10 md:-left-12 lg:-left-16 top-1/2 transform -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 items-center justify-center"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M15 18L9 12L15 6L15 18Z" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-8 sm:-right-10 md:-right-12 lg:-right-16 top-1/2 transform -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 items-center justify-center"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                className="sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M9 18L15 12L9 6L9 18Z" />
              </svg>
            </button>
          </>
        )}

        {/* Products Carousel */}
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-hidden justify-center">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex-shrink-0 w-full max-w-[280px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px]"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-52">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover rounded-t-lg sm:rounded-t-xl"
                />
              </div>
              <div className="p-2 sm:p-3 md:p-4 text-center">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                  {product.productName}
                </h3>
                <p
                  className={`text-xs sm:text-sm font-medium mt-1 sm:mt-2 ${
                    product.availability === "in-stock"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {product.availability === "in-stock"
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        {products.length > getItemsPerView() && (
          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 gap-1.5 sm:gap-2">
            {Array.from({ length: Math.ceil(products.length / getItemsPerView()) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index * getItemsPerView())}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all ${
                  Math.floor(currentIndex / getItemsPerView()) === index
                    ? "w-4 sm:w-6 md:w-8 bg-gray-900"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}