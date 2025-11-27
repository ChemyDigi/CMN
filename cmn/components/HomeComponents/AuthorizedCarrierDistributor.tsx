"use client";

import Image from "next/image";
import toshibalogo from "../../public/images/Home/toshiba.png";
import verifyBadge from "../../public/images/Home/verified.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

export default function AuthorizedCarrierDistributor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Properly typed animation variants
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
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: 30 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const dividerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scaleY: 0 
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  return (
    <section ref={ref} className="w-full bg-white py-16 md:py-20">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
      >

        {/* LEFT SIDE */}
        <motion.div 
          variants={containerVariants}
          className="flex items-stretch gap-6 md:gap-8 max-w-xl"
        >
          {/* ICON */}
          <motion.div 
            variants={iconVariants}
            className="flex-shrink-0 flex items-center"
          >
            <div className="relative h-full flex items-center">
              <Image
                src={verifyBadge}
                alt="Verified Icon"
                width={80}
                height={80}
                className="object-contain h-full w-auto"
              />
            </div>
          </motion.div>

          {/* TEXT BLOCK */}
          <div className="flex-1">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              Authorized Carrier <br />
              <motion.span 
                variants={itemVariants}
                className="text-[#152c73]"
              >
                Distributor
              </motion.span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-4 md:mt-6 text-gray-600 leading-relaxed text-base md:text-lg max-w-md"
            >
              CMN Distributors: Authorized Carrier distributor offering certified
              HVAC solutions and expert support for all your heating and cooling needs.
            </motion.p>
          </div>
        </motion.div>

        {/* VERTICAL DIVIDER */}
        <motion.div 
          variants={dividerVariants}
          className="hidden lg:block h-32 w-px bg-gray-300 mx-8 lg:mx-12 flex-shrink-0" 
        />

        {/* RIGHT SIDE – Logo */}
        <motion.div 
          variants={logoVariants}
          className="flex justify-center lg:justify-end mr-8 lg:mr-12"
        >
          <motion.div 
            className="relative"
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={toshibalogo}
              alt="Toshiba Logo"
              width={400}
              height={180}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}