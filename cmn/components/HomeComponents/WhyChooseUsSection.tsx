"use client";

import Image from "next/image";
import React from "react";

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export default function WhyChooseUsSection(): React.ReactElement {
  const features: FeatureItem[] = [
    {
      icon: "/images/Home/Network.png",
      title: "NETWORK",
      desc: "Experts in Retail & Distribution network",
    },
    {
      icon: "/images/Home/International.png",
      title: "INTERNATIONAL PRESENCE",
      desc: "Presence in Singapore / Sri Lanka / India",
    },
    {
      icon: "/images/Home/Team.png",
      title: "DEDICATED TEAM",
      desc: "Technically qualified Execution Team",
    },
    {
      icon: "/images/Home/Service.png",
      title: "BEST SERVICE",
      desc: "Experts in Retail & Distribution network",
    },
    {
      icon: "/images/Home/Wide.png",
      title: "WIDE NETWORK",
      desc: "Presence in Singapore / Sri Lanka / India",
    },
    {
      icon: "/images/Home/Cost.png",
      title: "COST EFFICIENT",
      desc: "Technically qualified Execution Team",
    },
  ];

  return (
    <section className="w-full bg-[#000000] text-white py-20 px-6 md:px-16 lg:px-24">
      
      {/* Title (CENTERED NOW) */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <p className="text-gray-400 text-sm mb-2">Why Choose Us</p>
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
          Delivering Quality, Reliability & <br /> Service You Can Trust
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {features.map((item: FeatureItem, index: number) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center group cursor-pointer transition-all duration-500 ease-in-out"
          >
            
            {/* ICON CIRCLE with enhanced hover effects */}
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-white mb-4 group-hover:border-[#F272A8] group-hover:bg-[#F272A8] group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#F272A8]/20 transition-all duration-500 ease-in-out">
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="object-contain group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-500 ease-in-out"
              />
            </div>

            {/* TITLE with hover effect */}
            <h3 className="text-[#F272A8] text-sm font-semibold tracking-wide mb-1 group-hover:text-white group-hover:scale-105 transition-all duration-300 ease-in-out">
              {item.title}
            </h3>

            {/* DESCRIPTION with hover effect */}
            <p className="text-gray-300 text-sm group-hover:text-white group-hover:scale-105 transition-all duration-300 ease-in-out max-w-xs">
              {item.desc}
            </p>

            {/* Subtle bottom border effect on hover */}
            <div className="w-0 group-hover:w-12 h-0.5 bg-[#F272A8] mt-3 transition-all duration-500 ease-in-out"></div>
          </div>
        ))}
      </div>
    </section>
  );
}