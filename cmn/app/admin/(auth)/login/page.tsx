"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImg from "../../../../public/images/admin/adminlogin.webp";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true); 

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.message || "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-white">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <Image
            src={loginImg}
            alt="Admin Login Image"
            className="rounded-2xl object-cover"
            style={{ maxHeight: "450px", width: "100%", height: "auto" }}
            priority
          />
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-200">

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Admin Login
          </h1>

          {error && (
            <p className="text-red-500 text-center text-sm mt-3">{error}</p>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-5">

            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-black">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black text-black"
                required
              />
            </div>

            {/* LOGIN BUTTON WITH LOADING */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-lg font-medium text-white transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              style={{ backgroundColor: "#F272A8" }}
              onMouseEnter={(e) =>
                !loading && (e.currentTarget.style.backgroundColor = "#e26095")
              }
              onMouseLeave={(e) =>
                !loading && (e.currentTarget.style.backgroundColor = "#F272A8")
              }
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}
