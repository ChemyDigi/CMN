"use client";

import Image from "next/image";
import carrierLogo from "../../public/images/Home/carrier.png";
import toshibaLogo from "../../public/images/Home/toshiba (2).png";
import verifyBadge from "../../public/images/Home/verified.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

export default function AuthorizedCarrierDistributor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const dividerVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <section ref={ref} className="w-full bg-white py-16 md:py-20">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 px-6 md:px-8 lg:px-10 xl:px-12" // Added horizontal padding
      >

        {/* LEFT SIDE — ICON + TEXT */}
        <motion.div 
          variants={containerVariants} 
          className="flex items-start gap-4 md:gap-6 max-w-2xl flex-[2]"
        >
          
          {/* ICON — moved more left */}
          <motion.div 
            variants={itemVariants} 
            className="flex-shrink-0 mr-2 md:mr-4"
          >
            <Image 
              src={verifyBadge} 
              alt="Verified Icon" 
              width={140} 
              height={80} 
              className="object-contain"
            />
          </motion.div>

          {/* TEXT BLOCK — wider */}
          <div className="flex-1 pr-2 md:pr-4">
            <motion.h2 
              variants={itemVariants} 
              className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight"
            >
              Authorized Distributor for <br />
              <motion.span 
                variants={itemVariants} 
                className="text-[#152c73]"
              >
                Carrier & Toshiba
              </motion.span>
            </motion.h2>

            <motion.p 
              variants={itemVariants} 
              className="mt-4 md:mt-6 text-gray-600 leading-relaxed text-base md:text-lg max-w-xl"
            >
              CMN Distributors is the Authorized Distributor for Carrier and Toshiba, 
              delivering certified HVAC and air-conditioning solutions with trusted 
              technical expertise and industry-leading reliability.
            </motion.p>
          </div>

        </motion.div>

        {/* VERTICAL DIVIDER */}
        <motion.div
          variants={dividerVariants}
          className="hidden lg:block h-32 w-px bg-gray-300 mx-8 lg:mx-12"
        />

        {/* RIGHT SIDE — TWO LOGOS */}
        <motion.div
          variants={logoVariants}
          className="flex items-center justify-center lg:justify-end gap-6 flex-[1]"
        >

          {/* CARRIER LOGO */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={carrierLogo}
              alt="Carrier Logo"
              width={220}   // reduced for better alignment
              height={80}
              className="object-contain"
            />
          </motion.div>

          {/* TOSHIBA LOGO */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={toshibaLogo}
              alt="Toshiba Logo"
              width={260}  // adjust based on your design
              height={80}
              className="object-contain"
            />
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}