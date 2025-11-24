"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface StepCard {
  step: number;
  title: string;
  subtitle: string;
  image: string;
}

export default function StepsShowcaseSection(): React.ReactElement {
  const steps: StepCard[] = [
    {
      step: 1,
      title: "Log Issue",
      subtitle: "Book service via app/website and describe your problem.",
      image: "/images/AirDoot/Step1.png",
    },
    {
      step: 2,
      title: "Track Progress",
      subtitle: "Get instant confirmation and track technician in real-time.",
      image: "/images/AirDoot/Step2.png",
    },
    {
      step: 3,
      title: " Receive Service",
      subtitle: "Certified technician arrives and resolves your issue.",
      image: "/images/AirDoot/Step3.png",
    },
    {
      step: 4,
      title: "Digital Completion",
      subtitle: "Get digital report and make secure payment.",
      image: "/images/AirDoot/Step4.png",
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-6 md:px-16 lg:px-24">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">
          Getting Help is Simple <br />
          Just <span className="italic font-light">Follow These Steps.</span>
        </h2>

        <p className="text-gray-500 mt-4">
          Simple steps to get your HVAC issues resolved.
        </p>
      </div>

      {/* Cards Grid - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="
              bg-white rounded-2xl shadow-md 
              border border-gray-200 
              p-6 flex flex-col gap-4
              transition-all duration-300 
              h-full
            "
          >
            {/* Step Number */}
            <div className="text-gray-900 font-bold text-5xl opacity-10">
              {step.step}
            </div>

            {/* Image */}
            <div className="w-full h-32 relative rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="mt-2 flex-grow">
              <h3 className="text-lg font-semibold text-black">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{step.subtitle}</p>
            </div>

           
          </motion.div>
        ))}
      </div>
    </section>
  );
}