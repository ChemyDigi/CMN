"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepCard {
  step: number;
  title: string;
  subtitle: string;
}

export default function StepsShowcaseSection(): React.ReactElement {
  const steps: StepCard[] = [
    {
      step: 1,
      title: "LOG ISSUE",
      subtitle: "Book service via app/website and describe your problem.",
    },
    {
      step: 2,
      title: "TRACK PROGRESS",
      subtitle: "Get instant confirmation and track technician in real-time.",
    },
    {
      step: 3,
      title: "RECEIVE SERVICE",
      subtitle: "Certified technician arrives and resolves your issue.",
    },
    {
      step: 4,
      title: "DIGITAL COMPLETION",
      subtitle: "Get digital report and make secure payment.",
    },
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16 lg:px-24">
      
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <p className="text-sm mb-2 text-[#F272A8]">Beyond Maintenance</p>
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
          Proactive Comfort Solutions <br />
          For Every Environment
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center group cursor-pointer transition-all duration-500 ease-in-out"
          >
            
            {/* NUMBER CIRCLE with enhanced hover effects */}
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-white mb-4 group-hover:border-[#F272A8] group-hover:bg-[#F272A8] group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#F272A8]/20 transition-all duration-500 ease-in-out">
              <span className="text-white text-3xl font-bold group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-500 ease-in-out">
                {step.step}
              </span>
            </div>

            {/* TITLE with hover effect */}
            <h3 className="text-[#F272A8] text-sm font-semibold tracking-wide mb-1 group-hover:text-white group-hover:scale-105 transition-all duration-300 ease-in-out">
              {step.title}
            </h3>

            {/* DESCRIPTION with hover effect */}
            <p className="text-gray-300 text-sm group-hover:text-white group-hover:scale-105 transition-all duration-300 ease-in-out max-w-xs">
              {step.subtitle}
            </p>

            {/* Subtle bottom border effect on hover */}
            <div className="w-0 group-hover:w-12 h-0.5 bg-[#F272A8] mt-3 transition-all duration-500 ease-in-out"></div>
          </div>
        ))}
      </div>
    </section>
  );
}