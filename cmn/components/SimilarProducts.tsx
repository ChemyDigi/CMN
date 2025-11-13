"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { id: 1, image: "/images/home-carousel-1.jpg" },
  { id: 2, image: "/images/home-carousel-1.jpg" },
  { id: 3, image: "/images/home-carousel-1.jpg" },
  { id: 4, image: "/images/home-carousel-1.jpg" },
];

export default function SimilarProducts() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-white py-10 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-black mb-8">
        Explore <span className="ml-2">Similar Products</span>
      </h2>

      <div className="relative flex items-center justify-center w-full max-w-6xl">
        <button
          onClick={handlePrev}
          className="absolute left-4 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-6 overflow-hidden">
          {products
            .slice(currentIndex, currentIndex + 4)
            .concat(
              products.slice(0, Math.max(0, currentIndex + 4 - products.length))
            )
            .map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={product.image}
                  alt="similar product"
                  className="w-72 h-52 object-cover rounded-xl"
                />
              </div>
            ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex mt-6 gap-2">
        {products.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition ${
              index === currentIndex ? "bg-gray-900" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

