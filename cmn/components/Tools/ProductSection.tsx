"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Collapsible state for sidebar
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  // Fetch products from "tools" collection
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

  // Fetch categories from "categories_tools" collection
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, "categories_tools"));
        const querySnapshot = await getDocs(q);

        const categoryList = querySnapshot.docs
          .map((doc) => doc.data().name as string)
          .filter(Boolean); // Remove empty names

        setCategories(categoryList.sort()); // optional sort
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Build dynamic list of brands
  const brandList = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean))
  ).sort();

  // Handle Checkbox Change
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
  };

  // Filtering products
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesCategory =
      selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category));

    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesBrand && matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <div className="border border-gray-200 rounded-lg p-5 sticky top-24 bg-white shadow-sm space-y-6">
            {/* Brands */}
            <div>
              <button
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                className="flex items-center justify-between w-full group"
              >
                <h3 className="font-semibold text-gray-900 text-lg">Brands</h3>
                {isBrandsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                )}
              </button>

              {isBrandsOpen && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-3">
                    {brandList.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 border-2 border-gray-300 rounded text-black focus:ring-black transition-colors checked:border-black checked:bg-black"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                          />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors select-none">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="border-t border-gray-100 pt-6">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center justify-between w-full group"
              >
                <h3 className="font-semibold text-gray-900 text-lg">Categories</h3>
                {isCategoriesOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
                )}
              </button>

              {isCategoriesOpen && (
                <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 border-2 border-gray-300 rounded text-black focus:ring-black transition-colors checked:border-black checked:bg-black"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                          />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-black transition-colors select-none">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={clearAllFilters}
                className="w-full py-2 px-4 bg-[#F272A8] hover:bg-pink-600 text-white font-medium rounded-lg transition-colors text-sm shadow-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {/* Search Box */}
          <div className="mb-6 flex justify-end">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search Products"
                className="w-full pl-4 pr-10 py-2.5 border border-gray-500 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Loading & Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">
                No products found matching your criteria.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
                    <Image
                      src={product.mainImage}
                      alt={product.productName}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {product.brand}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem]">
                      {product.productName}
                    </h3>

                    <div className="mt-auto">
                      <button
                        onClick={() => router.push(`/products/tools/${product.id}`)}
                        className="w-full py-2 px-4 bg-white border border-gray-900 text-gray-900 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
