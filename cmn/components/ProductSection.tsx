"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ Import router
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

const categories = ["All", "Toshiba", "Panasonic", "LG"];

const ProductSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.brand === activeCategory;
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-8 py-12 bg-white">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-1 bg-gray-100 rounded-md p-1">
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

        <div className="relative flex items-center bg-gray-100 rounded-md px-4 py-2 w-full sm:w-64">
          <input
            type="text"
            placeholder="Search Products"
            className="bg-transparent w-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="relative w-full h-56 flex items-center justify-center">
              <Image
                src={product.mainImage}
                alt={product.productName}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {product.productName}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{product.brand}</p>

              {/* ✅ Redirect to /products/tools/[id] */}
<button
  onClick={() => {
    console.log("Navigating to:", `/products/tools/${product.id}`);
    router.push(`/products/tools/${product.id}`);
  }}
  className="text-black w-full border border-gray-800 rounded-md py-2 text-sm font-medium hover:bg-black hover:text-white transition-all"
>
  Read More
</button>


            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
