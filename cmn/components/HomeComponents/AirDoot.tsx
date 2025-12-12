"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, easeOut } from "framer-motion";
import { useRef } from "react";

export default function HeroIntroSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  const decorativeVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white py-28 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* BACKGROUND IMAGE + DECORATIVE SHAPE */}
      <div className="absolute inset-0">
        {/* Background image */}
        <Image
          src="/images/Home/ac-bg.jpg"
          alt="Background texture"
          fill
          className="object-cover opacity-20"
          priority
        />

        {/* WHITE DECORATIVE SHAPE - HIDDEN ON TABLET */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={decorativeVariants}
          className="
            absolute
            top-0
            right-0
            bg-white
            rounded-bl-[250px]
            w-[400px] md:w-[500px] lg:w-[600px]
            h-[400px] md:h-[500px] lg:h-[360px]
            overflow-hidden
            z-20
            hidden lg:block
          "
        />

        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* CONTENT */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-30 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-center lg:text-left"
      >
        {/* LEFT CONTENT - AIRDOOT CONTENT */}
        <motion.div
          variants={containerVariants}
          className="space-y-6 flex flex-col items-center lg:items-start"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold leading-snug"
          >
           Keep Your AC Healthy, and <br />
            Running Smoothly
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 leading-relaxed max-w-xl text-justify"
          >
            AirDoot is an innovative online platform that solves 
            service challenges for Air Conditioning & Refrigeration 
            products using technology. It serves both residential and 
            commercial users with a complete digital solution.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 leading-relaxed max-w-xl text-justify"
          >
            As part of CMN, the platform operates across Singapore 
            and India. It brings together customers, service providers, 
            and suppliers into one efficient ecosystem.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 leading-relaxed max-w-xl text-justify"
          >
            Through its web and mobile app, customers can 
            easily book and track services. This integrated model 
            ensures transparency and streamlines the entire service process 
            for all stakeholders.
          </motion.p>

          {/* CTA BUTTON */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/services/airdoot"
              className="inline-flex items-center gap-2 bg-[#F272A8] hover:bg-pink-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300"
            >
              AirDoot Solutions
              
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE - HIDDEN ON TABLET AND MOBILE - LARGER SIZE */}
        <div className="relative hidden lg:block">
          <motion.div
            variants={imageVariants}
            className="absolute -top-24 -right-5 z-40 drop-shadow-2xl"
          >
            <Image
              src="/images/Home/AC-airdoot2.png"
              alt="AC Unit"
              width={650} 
              height={650} 
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
