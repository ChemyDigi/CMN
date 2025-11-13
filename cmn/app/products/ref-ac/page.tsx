"use client";

import React from "react";
import RefrigeratorHeroSection from "@/components/refrigeratorHero";
import Refrigerator from "@/components/refac";

const Page = () => {
  return (
    <main className="w-full overflow-hidden">
      {/* Hero Section */}
      <RefrigeratorHeroSection />

      {/* Product Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Refrigeration Tools & Equipment
          </h2>
          <Refrigerator />
        </div>
      </section>
    </main>
  );
};

export default Page;
