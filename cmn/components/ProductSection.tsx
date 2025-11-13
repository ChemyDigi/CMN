"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Review {
  customerName: string;
  email: string;
  reviewDescription: string;
  rating: number;
}

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

const categories = ["All", "Bosch", "Craftsman", "DeWalt","Makita","Milwaukee","Snap-on"];

const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.brand === activeCategory;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 overflow-x-auto scrollbar-hide bg-gray-100 rounded-md p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
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
        <div className="relative flex items-center bg-gray-100 rounded-md px-3 sm:px-4 py-2 w-full sm:w-64">
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            />
          </svg>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        // No Products Found
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg font-medium">No products found.</p>
        </div>
      ) : (
        // Product Grid - 4 columns at all breakpoints
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover"
                />
                {product.availability === "in-stock" && (
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    In Stock
                  </span>
                )}
                {product.availability === "out-of-stock" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 text-center flex-grow flex flex-col justify-end">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {product.productName}
                </h3>
                <button
                  onClick={() => router.push(`/products/tools/${product.id}`)}
                  className="text-black w-full border border-gray-800 rounded-md py-2 text-xs sm:text-sm font-medium hover:bg-black hover:text-white transition-all"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;