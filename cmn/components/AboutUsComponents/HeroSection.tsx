"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/AboutUs/AboutHero.jpg"
          alt="CMN Distributor Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-4xl pl-[230px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-sm mb-2 opacity-80"
        >
          About Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
        >
          CMN Distributors is the <br />
          Global Distribution <br />
          Powerhouse
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-base md:text-lg max-w-xl text-gray-200"
        >
          We deliver end-to-end supply and distribution solutions for premium
          tools, equipment, and industrial products across continents.
        </motion.p>

        {/* Optional subtle underline or divider animation */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "520px", opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-6 h-[2px] bg-[#F272A8] rounded"
        />
      </div>
    </section>
  );
}
