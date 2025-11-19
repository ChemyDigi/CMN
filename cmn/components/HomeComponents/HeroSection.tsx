"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import heroImage from "../../public/images/hero/heroHome.png"

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden rounded-br-[120px]">

      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
          alt="CMN Distributor Home Hero"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-16 lg:pl-[120px] 
                      text-center md:text-left      /* NEW */
                      ">
        <div className="max-w-full mx-auto md:mx-0 flex flex-col items-center md:items-start"> {/* NEW */}
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-sm text-white/80 mb-3"
          >
            CMN Distributors
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-snug max-w-full"
          >
            Powering Industries with <br />
            Precision Tools & Trusted <br />
            Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-lg text-white/80 mt-4 mb-6"
          >
            Offices in Singapore, India & Sri Lanka
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="px-6 py-3 bg-[#F272A8] text-white font-medium rounded-md shadow-lg hover:bg-[#f45c98] transition"
          >
            Contact Us
          </motion.button>

        </div>
      </div>
    </section>
  );
}
