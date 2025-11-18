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

const categories = ["All", "Samsung", "LG", "Panasonic", "Whirlpool"];

const ACRefSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AC&Ref"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching AC & Ref products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      activeCategory === "All" || product.brand === activeCategory;

    const searchMatch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <section className="w-full bg-white px-4 md:px-8 py-10">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">

        {/* Categories */}
        <div className="w-full md:w-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide bg-gray-100 rounded-xl p-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap
                  ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 bg-gray-100 rounded-xl px-4 py-2 flex items-center">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search AC & Refrigerators"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-700 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            />
          </svg>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg font-medium">
            No products found.
          </p>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={product.mainImage}
                    alt={product.productName}
                    fill
                    className="object-cover"
                  />

                  {/* Stock Badge */}
                  {product.availability === "in-stock" && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      In Stock
                    </span>
                  )}

                  {product.availability === "out-of-stock" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        OUT OF STOCK
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-3 flex flex-col flex-grow text-center">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 min-h-[38px]">
                    {product.productName}
                  </h3>

                  <button
                    onClick={() => router.push(`/products/ref-ac/${product.id}`)}
                    className="mt-auto w-full py-2 border border-black text-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-all"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ACRefSection;
