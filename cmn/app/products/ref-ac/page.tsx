"use client";

import React from "react";
import Refrigerator from "@/components/refac";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Refrigeration Tools & Equipment
        </h1>
        <Refrigerator />
      </div>
    </main>
  );
};

export default Page;
