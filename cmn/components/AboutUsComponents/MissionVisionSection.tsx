"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MissionVisionSection1() {
  return (
    <section className="w-full bg-white text-black">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left Image */}
        <div className="relative w-full h-[380px] md:h-[500px]">
          <Image
            src="/images/AboutUs/mission1.jpg"
            alt="Mission"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-center px-10 py-12 mx-12">
          {/* OUR Mission */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10"
            >
            <h2 className="text-black text-3xl font-semibold mb-4 text-right">Our Mission</h2>
            <div className="relative">
                <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-500 text-8xl absolute -left-6 -top-2"
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
                className="text-gray-500 text-8xl absolute -right-4 bottom-0"
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
      </div>

         {/* Icon Boxes Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#2E2E2E] text-center text-[#F272A8]">
        <div className="p-12 border-b md:border-b-0 md:border-r border-white">
          <i className="ri-home-2-line text-3xl mb-3 block "></i>
          <p className="text-sm">Vast Experience</p>
        </div>

        <div className="p-12 border-b md:border-b-0 md:border-r border-white text-[#F272A8]">
          <i className="ri-puzzle-line text-3xl mb-3 block "></i>
          <p className="text-sm ">Professional Team</p>
        </div>

        <div className="p-12 border-b md:border-b-0 md:border-r border-white text-[#F272A8]">
          <i className="ri-layout-line text-3xl mb-3 block"></i>
          <p className="text-sm">High Finish</p>
        </div>

        <div className="p-12 text-[#F272A8]">
          <i className="ri-bank-line text-3xl mb-3 block"></i>
          <p className="text-sm">
            Sustainable & Accountable
          </p>
        </div>
      </div>


      {/* About Us Section */}
      <div className="grid md:grid-cols-2">
        {/* Left */}
        <div className="p-12 md:p-20 flex flex-col justify-center mx-12 -mb-1">

          {/* OUR VISION */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10"
            >
            <h2 className="text-black text-3xl font-semibold mb-4 text-right">Our Vision</h2>
            <div className="relative">
                <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-500 text-8xl absolute -left-6 -top-2"
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
                reliability, and excellence while creating a better, more connected
                future.
                </motion.blockquote>
                <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-gray-500 text-8xl absolute -right-4 bottom-0"
                >
                ”
                </motion.span>
                <br />
                <br />
                <br />
               
            </div>
            </motion.div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[380px] md:h-[500px]">
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
