"use client";

import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaTools,
  FaSnowflake,
  FaBox,
  FaFilter,
} from "react-icons/fa";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  serialId: string;
  category: string;
  productName: string;
  brand: string;
  description: string;
  warranty: string;
  material: string;
  extraFields: Array<{ id: string; name: string; value: string }>;
  mainImage: string;
  subImages: string[];
  createdAt: any;
  type: "tool" | "ac-ref";
};

export default function ManageProductsDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "tool" | "ac-ref">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const DetailRow = ({ label, value }: { label: string; value: any }) => (
    <div className="flex flex-col">
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    type: "tool" | "ac-ref";
    name: string;
  } | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const allProducts: Product[] = [];

      const toolsSnapshot = await getDocs(collection(db, "tools"));
      toolsSnapshot.forEach((docSnap) => {
        allProducts.push({
          id: docSnap.id,
          type: "tool",
          ...docSnap.data(),
        } as Product);
      });

      const acRefSnapshot = await getDocs(collection(db, "AC-Ref"));
      acRefSnapshot.forEach((docSnap) => {
        allProducts.push({
          id: docSnap.id,
          type: "ac-ref",
          ...docSnap.data(),
        } as Product);
      });

      allProducts.sort((a, b) => {
        const dateA = a.createdAt?.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter + search
  const filteredProducts = products.filter((product) => {
    if (filter !== "all" && product.type !== filter) return false;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      return (
        product.productName.toLowerCase().includes(s) ||
        product.serialId.toLowerCase().includes(s) ||
        product.category.toLowerCase().includes(s) ||
        product.brand.toLowerCase().includes(s)
      );
    }
    return true;
  });

  // Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const collectionName = deleteTarget.type === "tool" ? "tools" : "AC-Ref";

      await deleteDoc(doc(db, collectionName, deleteTarget.id));

      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete product");
    } finally {
      setDeleteTarget(null);
    }
  };

  const getProductTypeIcon = (type: "tool" | "ac-ref") => {
    return type === "tool" ? (
      <FaTools className="text-blue-500" />
    ) : (
      <FaSnowflake className="text-teal-500" />
    );
  };

  const getProductTypeLabel = (type: "tool" | "ac-ref") => {
    return type === "tool" ? "Tools & Equipment" : "AC & Refrigerator";
  };

  // Modal: view product
  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Navigate to edit page
  const handleEdit = (product: Product) => {
    const editPath =
      product.type === "tool"
        ? `/admin/edit-products/tools/${product.id}`
        : `/admin/edit-products/ref-ac/${product.id}`;
    router.push(editPath);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 text-black">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 bg-[#F272A8] rounded-full"></div>
          <h1 className="text-2xl font-bold">Manage Products</h1>
        </div>
        <p className="text-gray-600 ml-4 text-xs">
          Manage all tools & AC/Ref products
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Tools & Equipment</p>
          <p className="text-2xl font-bold">
            {products.filter((x) => x.type === "tool").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-600">AC & Refrigerator</p>
          <p className="text-2xl font-bold">
            {products.filter((x) => x.type === "ac-ref").length}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="border rounded-lg px-4 py-2.5 w-full md:w-64 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Filter Dropdown */}
<div className="relative w-56">
  <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

  <select
    value={filter}
    onChange={(e) =>
      setFilter(e.target.value as "all" | "tool" | "ac-ref")
    }
    className="
      w-full appearance-none
      rounded-xl border border-gray-200
      bg-white pl-11 pr-10 py-3
      text-sm font-medium text-gray-700
      shadow-sm
      hover:border-gray-300 hover:bg-gray-50
      focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black
      transition-all
      cursor-pointer
    "
  >
    <option value="all">All Types</option>
    <option value="tool">Tools & Equipment</option>
    <option value="ac-ref">AC & Refrigerator</option>
  </select>

  {/* Chevron */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>

          </div>

          {/* Active Filter Badge */}
          {filter !== "all" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtered by:</span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {filter === "tool" ? (
                  <>
                    <FaTools className="w-3.5 h-3.5" />
                    Tools & Equipment
                  </>
                ) : (
                  <>
                    <FaSnowflake className="w-3.5 h-3.5" />
                    AC & Refrigerator
                  </>
                )}
                <button
                  onClick={() => setFilter("all")}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` matching "${searchTerm}"`}
          {filter !== "all" && ` in ${getProductTypeLabel(filter)}`}
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          {loading ? (
            <p className="text-center py-6">Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <FaBox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No products found</p>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : filter !== "all"
                  ? `No ${filter === "tool" ? "tools" : "AC & Refrigerator"} products available`
                  : "No products available"}
              </p>
              {(searchTerm || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                  className="mt-3 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Brand
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Warranty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.mainImage ? (
                          <img
                            src={product.mainImage}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            {getProductTypeIcon(product.type)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{product.productName}</p>
                          <p className="text-xs text-gray-500">
                            ID: {product.serialId}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">{product.category}</td>

                    <td className="px-4 py-3 flex items-center gap-2">
                      {getProductTypeIcon(product.type)}
                      {getProductTypeLabel(product.type)}
                    </td>

                    <td className="px-4 py-3">{product.brand}</td>

                    <td className="px-4 py-3">
                      {product.warranty || "Not specified"}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(product)}
                          className="p-2 hover:text-blue-500"
                          title="View Details"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:text-green-500"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() =>
                            setDeleteTarget({
                              id: product.id,
                              type: product.type,
                              name: product.productName,
                            })
                          }
                          className="p-2 hover:text-red-500"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-1">
              {selectedProduct.productName}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Product ID: {selectedProduct.serialId}
            </p>

            {/* Images Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Main Image</h3>
                {selectedProduct.mainImage ? (
                  <img
                    src={selectedProduct.mainImage}
                    className="rounded-xl shadow-lg w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Sub Images</h3>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProduct.subImages?.length ? (
                    selectedProduct.subImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full h-20 rounded-lg shadow object-cover"
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No Sub Images</p>
                  )}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                Product Details
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <DetailRow
                    label="Category"
                    value={selectedProduct.category}
                  />
                  <DetailRow label="Brand" value={selectedProduct.brand} />
                  <DetailRow
                    label="Type"
                    value={getProductTypeLabel(selectedProduct.type)}
                  />
                </div>

                <div className="space-y-3">
                  <DetailRow
                    label="Warranty"
                    value={selectedProduct.warranty || "Not specified"}
                  />
                  <DetailRow
                    label="Material"
                    value={selectedProduct.material || "Not specified"}
                  />
                  <DetailRow
                    label="Added On"
                    value={
                      selectedProduct.createdAt?.toDate
                        ? selectedProduct.createdAt.toDate().toLocaleString()
                        : "N/A"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 border-b pb-2">
                Description
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Extra Fields */}
            {selectedProduct.extraFields?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 border-b pb-2">
                  Additional Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {selectedProduct.extraFields.map((field) => (
                    <div
                      key={field.id}
                      className="p-4 bg-gray-50 rounded-xl shadow-sm"
                    >
                      <p className="text-xs font-semibold text-gray-600">
                        {field.name}
                      </p>
                      <p className="text-sm text-gray-800">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-scaleIn">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                <FaTrash className="text-red-500 text-2xl" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-center mb-2">
              Delete Product?
            </h2>

            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 rounded-xl border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}