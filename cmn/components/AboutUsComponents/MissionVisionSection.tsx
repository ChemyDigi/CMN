"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MissionVisionSection() {
  return (
    <section className="relative w-full bg-white py-20 px-6 md:px-20 overflow-hidden">
      {/* BACKGROUND LOGO (WATERMARK) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Image
          src="/images/CMN_logo.png"
          alt="CMN Logo Watermark"
          width={600}
          height={800}
          className="object-contain pointer-events-none select-none"
        />
      </motion.div>

      {/* CONTENT */}
      <div className="relative max-w-5xl mx-auto text-gray-800">
        {/* OUR MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-[#F272A8] text-xl mb-4 italic">Our Mission</p>
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#F272A8] text-8xl absolute -left-6 -top-2"
            >
              “
            </motion.span>
            <br />
            <br />
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="italic text-lg leading-relaxed md:text-xl text-gray-500"
            >
              To provide world-class products and services that empower industries
              through quality, technology, and trust. We aim to continuously expand
              our global footprint, strengthen relationships with our partners, and
              uphold the highest standards of professionalism, integrity, and customer
              satisfaction.
            </motion.blockquote>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[#F272A8] text-8xl absolute -right-4 bottom-0"
            >
              ”
            </motion.span>
            <br />
            <br />
            <br />
            <br />
          </div>
        </motion.div>

        {/* OUR VISION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <p className="text-[#F272A8] text-xl mb-4 text-right">Our Vision</p>
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-[#F272A8] text-8xl absolute -left-6 -top-2"
            >
              “
            </motion.span>
            <br />
            <br />
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="italic text-lg leading-relaxed md:text-xl text-gray-500"
            >
              To build a sustainable and globally trusted network of industrial
              solutions that empower businesses to grow through innovation,
              reliability, and excellence — while creating a better, more connected
              future.
            </motion.blockquote>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[#F272A8] text-8xl absolute -right-4 bottom-0"
            >
              ”
            </motion.span>
            <br />
            <br />
            <br />
            <br />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
