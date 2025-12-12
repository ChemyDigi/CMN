"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import heroImageDesktop from "../../public/images/hero/homeHero.png";
import heroImageMobile from "../../public/images/hero/homeHero-mobile.png"; // Add your mobile image here
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // 768px is typically md breakpoint
      };
      
      // Initial check
      checkMobile();
      
      // Add event listener for resize
      window.addEventListener("resize", checkMobile);
      
      // Cleanup
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image - Mobile */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 md:hidden" // Only show on mobile
      >
        <Image
          src={heroImageMobile}
          alt="CMN Distributor Hero - Mobile"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Background Image - Desktop */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 hidden md:block" // Only show on desktop
      >
        <Image
          src={heroImageDesktop}
          alt="CMN Distributor Hero - Desktop"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Optional: Single image component with dynamic src (Alternative approach) */}
      {/* 
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={isMobile ? heroImageMobile : heroImageDesktop}
          alt="CMN Distributor Hero"
          fill
          className="object-cover brightness-50"
          priority
          sizes="100vw"
        />
      </motion.div>
      */}

      {/* CONTENT */}
      <div
        className="
          relative z-10 text-white max-w-4xl w-full

          /* Mobile & Tablet: Center aligned */
          px-4 xs:px-6 sm:px-8 md:px-12
          mx-auto
          text-center

          /* Desktop: Left aligned with original padding */
          lg:pl-[180px] xl:pl-[110px]
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
          className="text-xs sm:text-sm md:text-base mb-2 sm:mb-3 opacity-80 text-[#F272A8] font-bold"
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
          Powering Industries with<br />
          Precision Tools & Trusted Solutions
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

        <Link href="/contact">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="inline-flex items-center gap-2 bg-[#F272A8] hover:bg-pink-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300"
          >
            Contact Us
          </motion.button>
        </Link>
      </div>
    </section>
  );
}