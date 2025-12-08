"use client";

import React, { useState } from "react";

type ServiceCardProps = {
  title: string;
  products: string[];
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, products }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 3; // Number of products to show initially

  const displayedProducts = expanded ? products : products.slice(0, limit);

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group w-full">
      <h4 className="text-base text-[#F272A8] sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">
        {title}
      </h4>
      <ul className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 text-justify leading-relaxed list-disc list-inside">
        {displayedProducts.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
      {products.length > limit && (
        <button
          className="mt-2 text-sm text-white text-white font-medium transition-all"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default function ServicesRange() {
  const services = [
    {
      title: "TOOLS",
      products: [
        "Hand Tools (Snap-on, Blue Point)",
        "Cutting Tools (Bhaco)",
        "Power Tools (Bosch)",
        "Air Tools",
        "Battery/Cordless Tools (Bosch)",
      ],
    },
    {
      title: "AUTOMOTIVE SOLUTIONS (John Bean)",
      products: [
        "Wheel alignment systems",
        "Wheel balancers",
        "Tyre changers",
        "Vehicle hoists",
        "Brake and suspension testers",
        "Speed testers",
        "Air inflators",
      ],
    },
    {
      title: "MEASURING TOOLS (Bosch)",
      products: ["Distance measures", "Line lasers", "Detectors", "Levelers"],
    },
    {
      title: "ACCESSORIES",
      products: [
        "Drill bits",
        "Grinding wheels",
        "Cutting wheels",
        "Circular saw blades",
        "Jig saw blades",
        "Screw bits",
        "Accessories kits",
      ],
    },
    {
      title: "CONSUMABLES & CHEMICALS (MrMckenic)",
      products: [
        "Rust removers",
        "Special cleaners",
        "Lithium grease",
        "AC cleaners",
        "Contact cleaners",
      ],
    },
    {
      title: "GROUND SUPPORT EQUIPMENT (Malabar, Tronair)",
      products: [
        "Axel jacks",
        "Tripod jacks",
        "Hydraulic systems",
        "Pressure testing equipment",
        "Tugs and towing equipment",
        "Aircraft service equipment",
        "Engine servicing tools",
        "Ground power units",
        "Air conditioning services for aircraft",
      ],
    },
    {
      title: "FILTRATION SYSTEMS (Pall)",
      products: ["Fuel filtration products"],
    },
    {
      title: "OTHER TOOLS & EQUIPMENT",
      products: ["Air blowers", "Hot air guns", "Vacuum cleaners", "High pressure washers"],
    },
  ];

  return (
    <section
      id="service-ranges"
      className="w-full bg-black text-white px-4 sm:px-6 md:px-16 py-16 md:py-20 font-sans"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6 lg:gap-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold max-w-xl leading-tight">
          Providing the Right Tools and Equipment for Every Industry 
        </h2>

        <a href="/home/#featured-products" className="inline-block">
          <button
            className="px-4 sm:px-6 py-3 rounded-full bg-white text-[#554c4a] text-sm sm:text-base font-medium
              shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 whitespace-nowrap w-full sm:w-auto"
          >
            Discover all our Products
          </button>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-white/10 border border-white/10">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} products={service.products} />
        ))}
      </div>
    </section>
  );
}
