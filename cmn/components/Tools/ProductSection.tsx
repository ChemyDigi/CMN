"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ExtraField {
  id: string;
  name: string;
  value: string;
}

interface Product {
  id: string;
  serialId?: string;
  brand: string;
  productName: string;
  description: string;
  warranty?: string;
  material?: string;
  category?: string;
  extraFields?: ExtraField[];
  mainImage: string;
  subImages: string[];
}

const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeBrand, setActiveBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch from Firestore → "tools" collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tools"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Build dynamic list of brands from DB
  const brandList = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];

  // Filtering
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      activeBrand === "All" || product.brand === activeBrand;

    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesBrand && matchesSearch;
  });

  return (
    <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 bg-white">

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">

        {/* Dynamic Brand Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {brandList.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveBrand(brand)}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm 
                font-medium transition-all flex-shrink-0
                ${
                  activeBrand === brand
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              `}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative flex items-center bg-gray-100 rounded-md px-3 py-2 w-full sm:w-48 md:w-56 lg:w-64">
          <input
            type="text"
            placeholder="Search Products"
            className="bg-transparent w-full text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 ml-2"
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
        <div className="flex justify-center items-center py-16 sm:py-20">
          <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            No products found.
          </p>
        </div>
      ) : (
        // Product Grid (4 columns)
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group flex flex-col"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-2 sm:p-3 md:p-4 text-center flex-grow flex flex-col justify-end">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                  {product.productName}
                </h3>

                <button
                  onClick={() => router.push(`/products/tools/${product.id}`)}
                  className="text-black w-full border border-gray-800 rounded-md py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-black hover:text-white transition-all"
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
