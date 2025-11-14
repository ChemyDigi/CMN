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
  price?: number;
  specifications?: Record<string, string>;
}

interface Review {
  customerName: string;
  email: string;
  reviewDescription: string;
  rating: number;
}

export default function SimilarProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.ceil(products.length / 4) - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === Math.ceil(products.length / 4) - 1 ? 0 : prev + 1));
  };

  const scrollTo = (index: number) => {
    setCurrentIndex(index);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/tools/${productId}`);
  };

  // Get the current products to display (4 at a time)
  const getCurrentProducts = () => {
    if (products.length === 0) return [];
    
    const startIndex = currentIndex * 4;
    const displayedProducts = [];
    
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % products.length;
      displayedProducts.push(products[index]);
    }
    return displayedProducts;
  };

  const currentProducts = getCurrentProducts();
  const totalPages = Math.ceil(products.length / 4);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white pb-12 pt-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-black mb-8">
        Explore <span className="ml-2">Similar Products</span>
      </h2>

      <div className="relative w-full max-w-7xl px-12">
        {/* Products Container - Grid layout for consistent 4-card display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Left Arrow - Positioned inside the container */}
          {products.length > 4 && (
            <button
              onClick={handlePrev}
              className="absolute -left-10 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center hover:scale-110 transition-transform z-10"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M15 18L9 12L15 6L15 18Z" />
              </svg>
            </button>
          )}

          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col h-full"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image Container - Smaller */}
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Product Details - Compact */}
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                {/* Brand */}
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                  {product.brand}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                  {product.productName}
                </h3>

                {/* Review Count */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Right Arrow - Positioned inside the container */}
          {products.length > 4 && (
            <button
              onClick={handleNext}
              className="absolute -right-10 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center hover:scale-110 transition-transform z-10"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M9 18L15 12L9 6L9 18Z" />
              </svg>
            </button>
          )}
        </div>

        {/* Dots Navigation */}
        {products.length > 4 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-6 bg-gray-900"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}