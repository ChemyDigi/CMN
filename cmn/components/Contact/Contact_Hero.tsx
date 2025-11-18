"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex items-center overflow-hidden">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/Contacts_hero.jpg"
          alt="CMN Distributor Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
      </motion.div>

      {/* CONTENT */}
      <div
        className="
          relative z-10 text-white max-w-4xl w-full

          /* Mobile & Tablet: Center aligned */
          px-4 xs:px-6 sm:px-8 md:px-12
          mx-auto
          text-center

          /* Desktop: Left aligned with original padding */
          lg:pl-[180px] xl:pl-[230px]
          lg:mx-0
          lg:text-left
          lg:px-0
        "
      >
        {/* SMALL HEADING */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs sm:text-sm md:text-base mb-2 sm:mb-3 opacity-80"
        >
          Contact
        </motion.p>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-5"
        >
          You're more resilient <br/>
          when you know what's coming
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="
            text-sm xs:text-base sm:text-lg md:text-lg
            max-w-xs xs:max-w-sm sm:max-w-md md:max-w-xl
            text-gray-200
            mx-auto
            lg:mx-0
            mb-4 sm:mb-5
          "
        >
          Managing risk across complex aviation supply networks is challenging
          but CMN Distributors makes it seamless, reliable, and future-ready.
          Our intelligent distribution platform gives you real time visibility and control
          over every stage of your supply chain.
        </motion.p>

        {/* DESKTOP UNDERLINE (Original) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "320px", opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="
            mt-4 md:mt-6 h-[2px] bg-[#F272A8] rounded
            hidden lg:block
          "
        />

        {/* TABLET UNDERLINE (Medium screens) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
          className="
            mt-4 md:mt-6 h-[2px] bg-[#F272A8] rounded
            hidden md:block lg:hidden mx-auto
          "
        />

        {/* MOBILE UNDERLINE (Small screens) */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "120px", opacity: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
          className="
            mt-4 h-[2px] bg-[#F272A8] rounded 
            block md:hidden mx-auto
          "
        />
      </div>
    </section>
  );
}