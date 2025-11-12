"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  status?: "sale" | "out-of-stock";
}

const categories = ["All", "Snap-on", "Blue Point", "Sioux", "ATI", "Bacho", "Bosch", "Williams"];

const products: Product[] = [
  { id: 1, name: "Professional Socket Set", image: "/images/product_sample.jpg", category: "Snap-on", status: "sale" },
  { id: 2, name: "Cordless Impact Wrench", image: "/images/product_sample.jpg", category: "Bosch" },
  { id: 3, name: "Digital Torque Wrench", image: "/images/product_sample.jpg", category: "Blue Point", status: "out-of-stock" },
  { id: 4, name: "Precision Screwdriver Set", image: "/images/product_sample.jpg", category: "Bacho" },
  { id: 5, name: "Professional Socket Set", image: "/images/product_sample.jpg", category: "Williams", status: "sale" },
  { id: 6, name: "Cordless Impact Wrench", image: "/images/product_sample.jpg", category: "ATI" },
  { id: 7, name: "Digital Torque Wrench", image: "/images/product_sample.jpg", category: "Sioux", status: "out-of-stock" },
  { id: 8, name: "Precision Screwdriver Set", image: "/images/product_sample.jpg", category: "Bosch" },
];

const ProductSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-8 py-12 bg-white">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 overflow-x-auto scrollbar-hide bg-gray-100 rounded-md p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative flex items-center bg-gray-100 rounded-md px-4 py-2 w-full sm:w-64">
          <input
            type="text"
            placeholder="Search Products"
            className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-700 ml-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
          </svg>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative w-full h-56 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />

              {product.status === "sale" && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  SALE
                </span>
              )}

              {product.status === "out-of-stock" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-white text-black text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                    OUT OF STOCK
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{product.name}</h3>
              <button className="text-black w-full border border-gray-800 rounded-md py-2 text-sm font-medium hover:bg-black hover:text-white transition-all">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default refac;
