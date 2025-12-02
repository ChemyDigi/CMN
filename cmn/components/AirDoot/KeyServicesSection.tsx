"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function KeyServicesSection() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-20">
      {/* TAGLINE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left"
      >
        
        {/* LEFT HEADING */}
        <div className="mx-auto md:mx-0">
          {/* Logo */}
          <div className="mb-6 flex justify-center md:justify-start">
            <Image
              src="/images/AirDoot/logo.png"
              alt="AirDoot Logo"
              width={200}
              height={80}
              className="h-12 w-auto sm:h-16 md:h-20 lg:h-24"
            />
          </div>
          
          <h3 className="text-xl md:text-5xl font-bold mb-4 text-black leading-snug">
            Going Beyond <br />
            Repairs
          </h3>
        </div>

        {/* RIGHT TEXT */}
        <div className="space-y-3 text-gray-700 text-sm md:text-base mx-auto md:mx-0 max-w-md md:max-w-none text-center md:text-left">
          <p>
            <span className="font-semibold">AirDoot</span> is a revolutionary platform that uses cutting-edge technology to simplify and streamline air-conditioning and refrigeration services for every need.
          </p>

          <p>
            Our comprehensive value-added services ensure your comfort is managed with maximum efficiency, complete transparency at every step, and unwavering reliability, providing you with peace of mind and optimal performance for all your HVAC-R requirements throughout the year.         
          </p>
        </div>
      </motion.div>
    </section>
  );
}