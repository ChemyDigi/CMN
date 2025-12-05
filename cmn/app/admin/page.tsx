"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaTools, FaSnowflake, FaUsers, FaBox, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  productName: string;
  category: string;
  brand: string;
  status?: "active" | "out-of-stock" | "discontinued";
  type: "tool" | "ac-ref";
  createdAt: any;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    tools: 0,
    acRef: 0,
    outOfStock: 0,
    activeProducts: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  const fetchDashboardData = async () => {
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

      // Calculate statistics
      const toolsCount = allProducts.filter(p => p.type === "tool").length;
      const acRefCount = allProducts.filter(p => p.type === "ac-ref").length;
      const outOfStockCount = allProducts.filter(p => p.status === "out-of-stock").length;
      const activeProductsCount = allProducts.filter(p => p.status === "active" || !p.status).length;

      // Get recent products (last 5)
      const sortedProducts = [...allProducts].sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      // Get products with low stock or out of stock
      const lowStock = allProducts.filter(p => 
        p.status === "out-of-stock" || p.status === "discontinued"
      ).slice(0, 5);

      setStats({
        totalProducts: allProducts.length,
        tools: toolsCount,
        acRef: acRefCount,
        outOfStock: outOfStockCount,
        activeProducts: activeProductsCount,
      });

      setRecentProducts(sortedProducts.slice(0, 5));
      setLowStockProducts(lowStock);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRestocked = async (productId: string, type: "tool" | "ac-ref") => {
    try {
      const collectionName = type === "tool" ? "tools" : "AC-Ref";
      const productRef = doc(db, collectionName, productId);
      await updateDoc(productRef, {
        status: "active",
        updatedAt: new Date(),
      });
      
      // Refresh data
      fetchDashboardData();
      
      alert("Product marked as restocked!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product status");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleManageProducts = () => {
    router.push("/dashboard/products");
  };

  const handleViewProduct = (product: Product) => {
    const viewPath = `/dashboard/view-product/${product.type}/${product.id}`;
    router.push(viewPath);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F272A8]"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-black">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to your product management dashboard</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button
            onClick={handleManageProducts}
            className="px-4 py-2 bg-[#F272A8] text-white rounded-lg hover:bg-[#e06597]"
          >
            Manage All Products
          </button>
        </div>
      </div>
{/* Stats Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-[#d9d9d9] text-black p-6 rounded-xl shadow-lg border border-[#d9d9d9]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">Total Products</p>
        <p className="text-3xl font-bold">{stats.totalProducts}</p>
      </div>
      <FaBox className="text-3xl text-pink-500" />
    </div>
    <div className="mt-4 text-sm">
      <span className="opacity-90">{stats.activeProducts} active</span>
      <span className="ml-3 opacity-90">{stats.outOfStock} out of stock</span>
    </div>
  </div>

  <div className="bg-[#d9d9d9] text-black p-6 rounded-xl shadow-lg border border-[#d9d9d9]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">Tools & Equipment</p>
        <p className="text-3xl font-bold">{stats.tools}</p>
      </div>
      <FaTools className="text-3xl text-pink-500" />
    </div>
    <div className="mt-4 text-sm opacity-90">
      All tool categories
    </div>
  </div>

  <div className="bg-[#d9d9d9] text-black p-6 rounded-xl shadow-lg border border-[#d9d9d9]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">AC & Refrigerators</p>
        <p className="text-3xl font-bold">{stats.acRef}</p>
      </div>
      <FaSnowflake className="text-3xl text-pink-500" />
    </div>
    <div className="mt-4 text-sm opacity-90">
      Appliances inventory
    </div>
  </div>

  <div className="bg-[#d9d9d9] text-black p-6 rounded-xl shadow-lg border border-[#d9d9d9]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">Active Products</p>
        <p className="text-3xl font-bold">{stats.activeProducts}</p>
        <p className="text-sm opacity-90 mt-1">
          {((stats.activeProducts / stats.totalProducts) * 100).toFixed(1)}% of total
        </p>
      </div>
      <FaChartLine className="text-3xl text-pink-500" />
    </div>
  </div>

</div>


      {/* Quick Actions & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-black">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/add-tool"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#F272A8] hover:bg-[#ffe3ef]  transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2  rounded-lg">
                  <FaTools className="text-blue-500 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-black">Add Tool</p>
                  <p className="text-xs text-gray-500">Create new tool/equipment</p>
                </div>
              </div>
            </Link>
            <Link
              href="/dashboard/add-ac-ref"
              className="p-4 border border-gray-200 rounded-lg hover:border-[#F272A8] hover:bg-[#ffe3ef] transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2  rounded-lg">
                  <FaSnowflake className="text-teal-500 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-black">Add AC/Refrigerator</p>
                  <p className="text-xs text-gray-500">Create new appliance</p>
                </div>
              </div>
            </Link>
            <button
              onClick={handleManageProducts}
              className="p-4 border border-gray-200 rounded-lg hover:border-[#F272A8] hover:bg-[#ffe3ef] transition-all hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2  rounded-lg">
                  <FaBox className="text-purple-500 text-xl" />
                </div>
                <div>
                  <p className="font-medium text-black">Manage Products</p>
                  <p className="text-xs text-gray-500">View all products</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                // Export functionality
                alert("Export functionality would go here");
              }}
              className="p-4 border border-gray-200 rounded-lg hover:border-[#F272A8] hover:bg-[#ffe3ef] transition-all hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2   rounded-lg">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-black">Export Data</p>
                  <p className="text-xs text-gray-500">Export product list</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">Recent Products</h2>
            <span className="text-xs text-gray-500">{recentProducts.length} items</span>
          </div>
          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <p className="text-gray-500 text-sm">No products added yet</p>
            ) : (
              recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="text-black flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleViewProduct(product)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${product.type === "tool" ? "bg-blue-100" : "bg-teal-100"}`}>
                      {product.type === "tool" ? (
                        <FaTools className={`text-sm ${product.type === "tool" ? "text-blue-500" : "text-teal-500"}`} />
                      ) : (
                        <FaTools className="text-sm text-blue-500" />                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.productName}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {product.type === "tool" ? "Tool" : "Appliance"}
                  </span>
                </div>
              ))
            )}
          </div>
          {recentProducts.length > 0 && (
            <button
              onClick={handleManageProducts}
              className="w-full mt-4 text-center text-sm text-[#F272A8] hover:text-[#e06597]"
            >
              View all products →
            </button>
          )}
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-lg font-semibold">Attention Needed</h2>
            </div>
            <span className="text-xs text-gray-500">{lowStockProducts.length} items</span>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${product.type === "tool" ? "bg-blue-100" : "bg-teal-100"}`}>
                    {product.type === "tool" ? (
                      <FaTools className={`text-sm ${product.type === "tool" ? "text-blue-500" : "text-teal-500"}`} />
                    ) : (
                      <FaTools className="text-sm text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{product.productName}</p>
                    <p className="text-xs text-gray-500">{product.category} • {product.brand}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                    {product.status === "out-of-stock" ? "Out of Stock" : "Discontinued"}
                  </span>
                  {product.status === "out-of-stock" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRestocked(product.id, product.type);
                      }}
                      className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                    >
                      Mark Restocked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Distribution */}
      {/* <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Product Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">By Product Type</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tools & Equipment</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(stats.tools / stats.totalProducts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.tools}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AC & Refrigerators</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full" 
                      style={{ width: `${(stats.acRef / stats.totalProducts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.acRef}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Stock Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Products</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(stats.activeProducts / stats.totalProducts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.activeProducts}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Out of Stock</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(stats.outOfStock / stats.totalProducts) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{stats.outOfStock}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}