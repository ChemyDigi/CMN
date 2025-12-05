"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import drill from "../../../public/images/admin/drill.jpg";
import ac from "../../../public/images/admin/AC.jpeg";
import ref from "../../../public/images/admin/ref.avif";

// SAMPLE DATA WITH IMAGES
const initialProducts = [
  {
    id: 1,
    name: "Professional Drill Set",
    brand: "Bosch",
    category: "Tools",
    updated: "2025-11-10",
    image: drill,
  },
  {
    id: 2,
    name: "Industrial AC Unit",
    brand: "Daikin",
    category: "AC Units",
    updated: "2025-11-08",
    image: ac,
  },
  {
    id: 3,
    name: "Commercial Refrigerator",
    brand: "Samsung",
    category: "Refrigerators",
    updated: "2025-11-12",
    image: ref,
  },
  {
    id: 4,
    name: "Premium Tool Kit",
    brand: "Makita",
    category: "Tools",
    updated: "2025-11-15",
    image: drill,
  },
  {
    id: 5,
    name: "Split AC Unit",
    brand: "LG",
    category: "AC Units",
    updated: "2025-11-14",
    image: ac,
  },
];

const brandOptions = ["All Brands", "Bosch", "Daikin", "Samsung", "Makita", "LG"];
const categoryOptions = ["All Categories", "Tools", "AC Units", "Refrigerators"];

export default function ManageProductsPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [category, setCategory] = useState("All Categories");
  const [products, setProducts] = useState(initialProducts);

  const handleView = (id: number) => alert(`Viewing product ID: ${id}`);
  const handleEdit = (id: number) => alert(`Editing product ID: ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = brand === "All Brands" || p.brand === brand;
      const matchesCategory = category === "All Categories" || p.category === category;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [search, brand, category, products]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-[14px]">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Manage Products</h1>
        <p className="text-gray-600 mt-1">View, edit, and manage all your products</p>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-8 text-[13px]">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="text-[#F272A8]" />
          <h2 className="font-medium text-gray-800">Filters & Search</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* SEARCH */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 bg-gray-50 rounded-md px-10 py-2 text-gray-800 focus:ring-2 focus:ring-[#F272A8]/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* BRAND */}
          <select
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#F272A8]/30"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {brandOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#F272A8]/30"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs text-gray-600 mt-4 border-t pt-3">
          Showing <span className="text-[#F272A8] font-medium">{filteredProducts.length}</span> of{" "}
          <span className="font-semibold">{products.length}</span> products
        </p>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-gray-100 text-gray-700 border-b">
              <tr>
                <th className="p-3 font-semibold">#</th>
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Brand</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-black">{index + 1}</td>

                  {/* PRODUCT WITH IMAGE */}
                  <td className="p-4 text-gray-900 font-medium">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover border h-[60px] w-[60px]"
                      />
                      {product.name}
                    </div>
                  </td>

                  <td className="p-4 text-black">{product.brand}</td>
                  <td className="p-4 text-black">{product.category}</td>

                  {/* ACTIONS */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(product.id)}
                        className="p-2 rounded-md border border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="p-2 rounded-md border border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-sm">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
}
