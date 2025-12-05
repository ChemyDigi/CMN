"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaTools, FaSnowflake, FaBox } from "react-icons/fa";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
 

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
  type: "tool" | "ac-ref"; // To identify which collection it belongs to
};

export default function ManageProductsDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "tools" | "ac-ref">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products from both collections
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const allProducts: Product[] = [];

      // Fetch tools
      const toolsSnapshot = await getDocs(collection(db, "tools"));
      toolsSnapshot.forEach((doc) => {
        allProducts.push({
          id: doc.id,
          type: "tool",
          ...doc.data(),
        } as Product);
      });

      // Fetch AC/Refrigerators
      const acRefSnapshot = await getDocs(collection(db, "AC-Ref"));
      acRefSnapshot.forEach((doc) => {
        allProducts.push({
          id: doc.id,
          type: "ac-ref",
          ...doc.data(),
        } as Product);
      });

      // Sort by creation date (newest first)
      allProducts.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
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

  // Filter products based on selection
  const filteredProducts = products.filter((product) => {
    // Apply type filter
    if (filter !== "all" && product.type !== filter) return false;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.productName.toLowerCase().includes(searchLower) ||
        product.serialId.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Delete product
  const handleDelete = async (id: string, type: "tool" | "ac-ref") => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const collectionName = type === "tool" ? "tools" : "AC-Ref";
      await deleteDoc(doc(db, collectionName, id));
      
      // Remove from state
      setProducts(products.filter((p) => p.id !== id));
      
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  // Get product type icon
  const getProductTypeIcon = (type: "tool" | "ac-ref") => {
    switch (type) {
      case "tool":
        return <FaTools className="text-blue-500" />;
      case "ac-ref":
        return <FaSnowflake className="text-teal-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  // Get product type label
  const getProductTypeLabel = (type: "tool" | "ac-ref") => {
    switch (type) {
      case "tool":
        return "Tools & Equipment";
      case "ac-ref":
        return "AC & Refrigerator";
      default:
        return "Product";
    }
  };

  // View product details
  const handleView = (product: Product) => {
    // Create a modal or redirect to detailed view
    alert(`Viewing: ${product.productName}\nType: ${getProductTypeLabel(product.type)}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 text-black">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 bg-[#F272A8] rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
        </div>
        <p className="text-gray-600 ml-4 text-xs">
          Manage all tools, equipment, ACs, and refrigerators in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <FaBox className="text-3xl text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tools & Equipment</p>
              <p className="text-2xl font-bold">
                {products.filter(p => p.type === "tool").length}
              </p>
            </div>
            <FaTools className="text-3xl text-blue-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AC & Refrigerators</p>
              <p className="text-2xl font-bold">
                {products.filter(p => p.type === "ac-ref").length}
              </p>
            </div>
            <FaSnowflake className="text-3xl text-teal-400" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
           
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full md:w-64"
            />
             
             
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#F272A8]"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <FaBox className="text-4xl text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">No products found</p>
              <p className="text-gray-500 text-sm">Add your first product using the buttons above</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warranty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                            alt={product.productName}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            {getProductTypeIcon(product.type)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{product.productName}</p>
                          <p className="text-xs text-gray-500">ID: {product.serialId || "N/A"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getProductTypeIcon(product.type)}
                        <span className="text-sm">{getProductTypeLabel(product.type)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.brand}</td>
                    <td className="px-4 py-3 text-sm">
                      {product.warranty || (
                        <span className="text-gray-400 italic">Not specified</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(product)}
                          className="p-2 text-gray-500 hover:text-blue-500"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            // Navigate to edit page based on type
                            const editPath = product.type === "tool" 
                              ? `/dashboard/edit-tool/${product.id}`
                              : `/dashboard/edit-ac-ref/${product.id}`;
                            // You would use router.push(editPath) here
                            alert(`Edit ${product.productName}`);
                          }}
                          className="p-2 text-gray-500 hover:text-green-500"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.type)}
                          className="p-2 text-gray-500 hover:text-red-500"
                          title="Delete"
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

      {/* Quick Actions */}
      
    </div>
  );
}