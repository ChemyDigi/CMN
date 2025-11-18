"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MissionVisionSection() {
  return (
    <section className="w-full bg-white text-black">

      {/* ---------- OUR MISSION SECTION ---------- */}
      <div className="grid md:grid-cols-2">
        
        {/* IMAGE */}
        <div className="relative w-full min-h-[450px] md:min-h-[550px]">
          <Image
            src="/images/AboutUs/mission1.jpg"
            alt="Mission"
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT */}
        <div className="flex flex-col justify-center items-center text-center px-10 py-14 md:px-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-xl"
          >
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>

            <div className="relative">
              <span className="text-gray-400 text-7xl absolute left-0 -top-6">“</span>

              <blockquote className="italic text-lg leading-relaxed md:text-xl text-gray-600 px-6">
                To provide world-class products and services that empower industries
                through quality, technology, and trust. We aim to continuously expand
                our global footprint, strengthen relationships with our partners, and
                uphold the highest standards of professionalism, integrity, and
                customer satisfaction.
              </blockquote>

              <span className="text-gray-400 text-7xl absolute right-0 bottom-0">”</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- ICON ROW ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#2E2E2E] text-center text-[#F272A8]">
        <div className="p-12 border-b md:border-b-0 md:border-r border-white">
          <i className="ri-home-2-line text-3xl mb-3 block"></i>
          <p className="text-sm">Vast Experience</p>
        </div>

        <div className="p-12 border-b md:border-b-0 md:border-r border-white">
          <i className="ri-puzzle-line text-3xl mb-3 block"></i>
          <p className="text-sm">Professional Team</p>
        </div>

        <div className="p-12 border-b md:border-b-0 md:border-r border-white">
          <i className="ri-layout-line text-3xl mb-3 block"></i>
          <p className="text-sm">High Finish</p>
        </div>

        <div className="p-12">
          <i className="ri-bank-line text-3xl mb-3 block"></i>
          <p className="text-sm">Sustainable & Accountable</p>
        </div>
      </div>

      {/* ---------- OUR VISION SECTION ---------- */}
      <div className="grid md:grid-cols-2">

        {/* TEXT */}
        <div className="flex flex-col justify-center items-center text-center px-10 py-14 md:px-16 md:py-20 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-xl"
          >
            <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>

            <div className="relative">
              <span className="text-gray-400 text-7xl absolute left-0 -top-6">“</span>

              <blockquote className="italic text-lg leading-relaxed md:text-xl text-gray-600 px-6">
                To build a sustainable and globally trusted network of industrial
                solutions that empower businesses to grow through innovation,
                reliability, and excellence — while creating a better, more connected
                future.
              </blockquote>

              <span className="text-gray-400 text-7xl absolute right-0 bottom-0">”</span>
            </div>
          </motion.div>
        </div>

        {/* IMAGE */}
        <div className="relative w-full min-h-[450px] md:min-h-[550px] order-1 md:order-2">
          <Image
            src="/images/AboutUs/vision1.jpg"
            alt="Vision"
            fill
            className="object-cover"
          />
        </div>
      </div>

    </section>
  );
}
