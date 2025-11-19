"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import heroImage from "../../public/images/hero/heroHome.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
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
          CMN Distributors
        </motion.p>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold leading-tight mb-3 sm:mb-4 md:mb-5"
        >
          Powering Industries with<br/>
          Precision Tools & Trusted<br/>
          Solutions
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
            mb-6 sm:mb-8
          "
        >
          Offices in Singapore, India & Sri Lanka
        </motion.p>

        {/* CONTACT BUTTON - RESPONSIVE */}
        <Link href="/contact">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="
              /* Base styles */
              bg-[#F272A8] text-white font-medium rounded-md shadow-lg 
              hover:bg-[#f45c98] transition-all duration-300
              
              /* Mobile: Smaller padding and text */
              px-4 py-2 text-sm
              
              /* Small mobile: Slightly larger */
              xs:px-5 xs:py-2.5 xs:text-base
              
              /* Tablet: Medium size */
              sm:px-6 sm:py-3 sm:text-lg
              
              /* Desktop: Larger size */
              md:px-8 md:py-3.5
              
              /* Hover effects */
              hover:scale-105 hover:shadow-xl
              
              /* Focus state for accessibility */
              focus:outline-none focus:ring-2 focus:ring-[#F272A8] focus:ring-offset-2 focus:ring-offset-transparent
            "
          >
            Contact Us
          </motion.button>
        </Link>

      </div>
    </section>
  );
}