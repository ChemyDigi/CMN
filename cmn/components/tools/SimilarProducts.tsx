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
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
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
    
    const displayedProducts = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % products.length;
      displayedProducts.push(products[index]);
    }
    return displayedProducts;
  };

  const currentProducts = getCurrentProducts();

  if (products.length === 0) {
    return null; // or return a loading state
  }

  return (
    <section className="w-full bg-white pb-12 pt-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-black mb-12">
        Explore <span className="ml-2">Similar Products</span>
      </h2>

      <div className="relative w-full max-w-6xl">
        {/* Navigation Arrows - Positioned outside the image container */}
        {products.length > 4 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-16 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center hover:scale-110 transition-transform"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M15 18L9 12L15 6L15 18Z" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-16 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center hover:scale-110 transition-transform"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M9 18L15 12L9 6L9 18Z" />
              </svg>
            </button>
          </>
        )}

        {/* Products Container */}
        <div className="flex gap-8 overflow-hidden justify-center px-6 py-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex-shrink-0 w-80 hover:-translate-y-2 flex flex-col"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image Container - Added padding and better spacing */}
              <div className="relative w-full h-64 rounded-t-xl overflow-hidden p-4">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              </div>

              {/* Product Details - Added more vertical padding and spacing */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-center">
                {/* Brand */}
                <p className="text-gray-600 text-sm font-medium">
                  {product.brand}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  {product.productName}
                </h3>

                {/* Review Count */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="flex items-center pt-1">
                    <span className="text-xs text-gray-600">
                      {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation - Added more margin top */}
        {products.length > 4 && (
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index * 4)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / 4) === index
                    ? "w-8 bg-gray-900"
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