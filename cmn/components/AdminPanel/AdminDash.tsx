"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaTools, FaSnowflake, FaUsers, FaBox, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
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

export default function AdminDashboard() {
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

      const toolsCount = allProducts.filter((p) => p.type === "tool").length;
      const acRefCount = allProducts.filter((p) => p.type === "ac-ref").length;
      const outOfStockCount = allProducts.filter((p) => p.status === "out-of-stock").length;
      const activeProductsCount = allProducts.filter((p) => p.status === "active" || !p.status).length;

      const sortedProducts = [...allProducts].sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      const lowStock = allProducts
        .filter((p) => p.status === "out-of-stock" || p.status === "discontinued")
        .slice(0, 5);

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
      console.error("Error loading dashboard data:", error);
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

      fetchDashboardData();
      alert("Product marked as restocked!");
    } catch (error) {
      console.error(error);
      alert("Failed to restock item.");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleViewProduct = (product: Product) => {
    router.push(`/dashboard/view-product/${product.type}/${product.id}`);
  };

  const handleManageProducts = () => {
    router.push("/admin/manage-products");
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

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-[#d9d9d9] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-black">
            <div>
              <p className="text-sm">Total Products</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <FaBox className="text-3xl text-pink-500" />
          </div>
          
        </div>

        <div className="bg-[#d9d9d9] p-6 rounded-xl shadow-lg text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Tools & Equipment</p>
              <p className="text-3xl font-bold">{stats.tools}</p>
            </div>
            <FaTools className="text-3xl text-pink-500" />
          </div>
        </div>

        <div className="bg-[#d9d9d9] p-6 rounded-xl shadow-lg text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">AC & Refrigerators</p>
              <p className="text-3xl font-bold">{stats.acRef}</p>
            </div>
            <FaSnowflake className="text-3xl text-pink-500" />
          </div>
        </div>

        <div className="bg-[#d9d9d9] p-6 rounded-xl shadow-lg text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Active Products</p>
              <p className="text-3xl font-bold">{stats.activeProducts}</p>
            </div>
            <FaChartLine className="text-3xl text-pink-500" />
          </div>
        </div>

      </div>

      {/* RECENT PRODUCTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-black">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link href="/admin/add-products/tools" className="p-4 border rounded-lg hover:bg-pink-50">
              <div className="flex items-center gap-3">
                <FaTools className="text-xl text-blue-500" />
                <div>
                  <p className="font-medium text-black">Add Tool</p>
                  <p className="text-xs text-gray-500">Create new tool</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/add-products/ref-ac" className="p-4 border rounded-lg hover:bg-pink-50">
              <div className="flex items-center gap-3">
                <FaSnowflake className="text-xl text-teal-500" />
                <div>
                  <p className="font-medium text-black">Add AC / Refrigerator</p>
                  <p className="text-xs text-gray-500">Create new appliance</p>
                </div>
              </div>
            </Link>

            <button onClick={handleManageProducts} className="p-4 border rounded-lg hover:bg-pink-50 text-left">
              <div className="flex items-center gap-3">
                <FaBox className="text-xl text-purple-500" />
                <div>
                  <p className="font-medium text-black">Manage Products</p>
                  <p className="text-xs text-gray-500">View all</p>
                </div>
              </div>
            </button>

          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold text-black">Recent Products</h2>
            <span className="text-xs text-gray-500">{recentProducts.length}</span>
          </div>

          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-sm">No products yet</p>
          ) : (
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleViewProduct(product)}
                >
                  <div className="flex items-center gap-3 text-black">
                    <div className={`p-2 rounded-lg ${product.type === "tool" ? "bg-blue-100" : "bg-teal-100"}`}>
                      <FaTools className="text-blue-500 text-sm" />
                    </div>

                    <div>
                      <p className="font-medium text-sm">{product.productName}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>

                  
                </div>
              ))} 
            </div>
          )}
        </div>
      </div>

      {/* LOW STOCK ALERT */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-red-600 flex gap-2 items-center">
            Low Stock / Discontinued
          </h2>

          <div className="space-y-3 mt-4">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="flex justify-between items-center p-3 bg-red-50 border border-red-100 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{p.productName}</p>
                  <p className="text-xs text-gray-500">{p.category} • {p.brand}</p>
                </div>

                <button
                  onClick={() => markAsRestocked(p.id, p.type)}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded-md"
                >
                  Mark Restocked
                </button>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
