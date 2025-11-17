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
          src="/images/RefAC/refhero.jpg"
          alt="CMN Distributor Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
      </motion.div>

      {/* CONTENT */}
      <div
        className="
          relative z-10 text-white max-w-4xl

          pl-0                  /* Mobile */
          sm:pl-0               /* Small tablets */
          md:pl-0               /* Tablets */
          lg:pl-[230px]         /* Desktop ONLY — ORIGINAL */

          px-6 md:px-10
          mx-auto lg:mx-0
          text-center lg:text-left
        "
      >
        {/* SMALL HEADING */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-sm mb-2 opacity-80"
        >
          Refrigerators & Air Conditioners
        </motion.p>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
        >
          Climate &<br />
          Kitchen Excellence
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="
            text-base md:text-lg max-w-xl text-gray-200
            mx-auto lg:mx-0
          "
        >
          Find the perfect cooling solution for every space, from powerful AC units to keep you comfortable to sophisticated fridges that organize your life.
        </motion.p>

        {/* UNDERLINE */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "520px", opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="
            mt-6 h-[2px] bg-[#F272A8] rounded
            hidden lg:block                 /* Desktop ONLY */
          "
        />

        {/* MOBILE UNDERLINE (CENTERED, SMALLER) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "120px", opacity: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
          className="mt-6 h-[2px] bg-[#F272A8] rounded mx-auto lg:hidden"
        />
      </div>
    </section>
  );
}
