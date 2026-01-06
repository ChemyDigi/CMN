"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTools,
  FaSnowflake,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartLine,
  FaSync,
  FaEye,
} from "react-icons/fa";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ADMIN_EMAIL = "admin@gmail.com";

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
  const [authChecked, setAuthChecked] = useState(false);

  const [stats, setStats] = useState({
    totalProducts: 0,
    tools: 0,
    acRef: 0,
    outOfStock: 0,
    activeProducts: 0,
  });

  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // ❌ Not logged in
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      // ❌ Logged in but not admin
      if (user.email !== ADMIN_EMAIL) {
        signOut(auth);
        router.replace("/admin/login");
        return;
      }

      // ✅ Authorized admin
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [router]);

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
      const outOfStockCount = allProducts.filter(
        (p) => p.status === "out-of-stock"
      ).length;
      const activeProductsCount = allProducts.filter(
        (p) => p.status === "active" || !p.status
      ).length;

      const sortedProducts = [...allProducts].sort((a, b) => {
        const dateA = a.createdAt?.toDate
          ? a.createdAt.toDate()
          : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate
          ? b.createdAt.toDate()
          : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      const lowStock = allProducts
        .filter(
          (p) => p.status === "out-of-stock" || p.status === "discontinued"
        )
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

  const markAsRestocked = async (
    productId: string,
    type: "tool" | "ac-ref"
  ) => {
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
    if (authChecked) {
      fetchDashboardData();
    }
  }, [authChecked]);

  const handleViewProduct = (product: Product) => {
    router.push(`/dashboard/view-product/${product.type}/${product.id}`);
  };

  const handleManageProducts = () => {
    router.push("/admin/manage-products");
  };

  if (!authChecked || loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh] md:min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F272A8]"></div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 md:space-y-6 px-3 md:px-0">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2 md:py-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-black text-center sm:text-left">
            Admin Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center">
            Welcome to your product management dashboard
          </p>
        </div>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={fetchDashboardData}
            className="px-3 py-2 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <FaSync className="text-xs md:text-sm" />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleManageProducts}
            className="px-3 py-2 md:px-4 md:py-2 bg-[#F272A8] text-white rounded-lg hover:bg-[#e06597] text-sm md:text-base"
          >
            Manage All Products
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-[#d9d9d9] p-4 md:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-black">
            <div>
              <p className="text-xs md:text-sm">Total Products</p>
              <p className="text-2xl md:text-3xl font-bold">
                {stats.totalProducts}
              </p>
            </div>
            <FaBox className="text-2xl md:text-3xl text-pink-500" />
          </div>
        </div>

        <div className="bg-[#d9d9d9] p-4 md:p-6 rounded-xl shadow-lg text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm">Tools & Equipment</p>
              <p className="text-2xl md:text-3xl font-bold">{stats.tools}</p>
            </div>
            <FaTools className="text-2xl md:text-3xl text-pink-500" />
          </div>
        </div>

        <div className="bg-[#d9d9d9] p-4 md:p-6 rounded-xl shadow-lg text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm">AC & Refrigerators</p>
              <p className="text-2xl md:text-3xl font-bold">{stats.acRef}</p>
            </div>
            <FaSnowflake className="text-2xl md:text-3xl text-pink-500" />
          </div>
        </div>

        <div className="bg-[#d9d9d9] p-4 md:p-6 rounded-xl shadow-lg text-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm">Active Products</p>
              <p className="text-2xl md:text-3xl font-bold">
                {stats.activeProducts}
              </p>
            </div>
            <FaChartLine className="text-2xl md:text-3xl text-pink-500" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* QUICK ACTIONS */}
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-3 md:mb-4 text-black">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
            <Link
              href="/admin/add-products/tools"
              className="p-3 md:p-4 border rounded-lg hover:bg-pink-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaTools className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base text-black">
                    Add Tool
                  </p>
                  <p className="text-xs text-gray-500 hidden xs:block">
                    Create new tool
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/add-products/ref-ac"
              className="p-3 md:p-4 border rounded-lg hover:bg-pink-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <FaSnowflake className="text-teal-500" />
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base text-black">
                    Add AC / Refrigerator
                  </p>
                  <p className="text-xs text-gray-500 hidden xs:block">
                    Create new appliance
                  </p>
                </div>
              </div>
            </Link>

            <button
              onClick={handleManageProducts}
              className="p-3 md:p-4 border rounded-lg hover:bg-pink-50 transition-colors text-left col-span-1 xs:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaBox className="text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base text-black">
                    Manage Products
                  </p>
                  <p className="text-xs text-gray-500">View all products</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* RECENT PRODUCTS */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">
              Recent Products
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {recentProducts.length}
            </span>
          </div>

          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No products yet
            </p>
          ) : (
            <div className="space-y-2 md:space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center p-2 md:p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  onClick={() => handleViewProduct(product)}
                >
                  <div className="flex items-center gap-2 md:gap-3 text-black flex-1 min-w-0">
                    <div
                      className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${
                        product.type === "tool" ? "bg-blue-100" : "bg-teal-100"
                      }`}
                    >
                      {product.type === "tool" ? (
                        <FaTools className="text-blue-500 text-sm md:text-base" />
                      ) : (
                        <FaSnowflake className="text-teal-500 text-sm md:text-base" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">
                        {product.productName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProduct(product);
                    }}
                    className="ml-2 p-1.5 text-gray-500 hover:text-[#F272A8] transition-colors flex-shrink-0"
                  >
                    <FaEye className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LOW STOCK ALERT */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="w-2 h-6 bg-red-600 rounded-full"></div>
            <h2 className="text-lg font-semibold text-red-600">
              Low Stock / Discontinued
            </h2>
            <span className="ml-auto text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
              {lowStockProducts.length} items
            </span>
          </div>

          <div className="space-y-2 md:space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 p-3 bg-red-50 border border-red-100 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {p.productName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {p.category} • {p.brand}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProduct(p);
                    }}
                    className="px-2 py-1.5 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => markAsRestocked(p.id, p.type)}
                    className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md transition-colors whitespace-nowrap"
                  >
                    Mark Restocked
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
