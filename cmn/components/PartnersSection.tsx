// components/PartnersSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface Client {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

export default function PartnersSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const clients: Client[] = [
    {
      id: 1,
      name: "ABC Corporation",
      logo: "/images/clients/client1.png",
      industry: "manufacturing"
    },
    {
      id: 2,
      name: "XYZ Industries",
      logo: "/images/clients/client2.png",
      industry: "construction"
    },
    {
      id: 3,
      name: "Tech Solutions Ltd",
      logo: "/images/clients/client3.png",
      industry: "technology"
    },
    {
      id: 4,
      name: "BuildRight Constructions",
      logo: "/images/clients/client4.png",
      industry: "construction"
    },
    {
      id: 5,
      name: "Modern Manufacturing Co",
      logo: "/images/clients/client5.png",
      industry: "manufacturing"
    },
    {
      id: 6,
      name: "Innovate Tech",
      logo: "/images/clients/client6.png",
      industry: "technology"
    },
    {
      id: 7,
      name: "Global Builders",
      logo: "/images/clients/client7.png",
      industry: "construction"
    },
    {
      id: 8,
      name: "Precision Tools Inc",
      logo: "/images/clients/client8.png",
      industry: "manufacturing"
    },
  ];

  const categories = [
    { id: "all", name: "All" },
    { id: "manufacturing", name: "Manufacturing" },
    { id: "construction", name: "Construction" },
    { id: "technology", name: "Technology" },
  ];

  const filteredClients = activeCategory === "all" 
    ? clients 
    : clients.filter(client => client.industry === activeCategory);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Clients we've partnered with
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We've had the privilege of collaborating with renowned brands across multiple industries.
            Below is a snapshot of some of the partners who placed their trust in our expertise.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32"
            >
              <div className="relative w-full h-16">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}