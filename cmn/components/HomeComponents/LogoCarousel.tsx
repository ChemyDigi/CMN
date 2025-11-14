"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LogoCarousel() {
  const logos = [
    "/images/Home/Logos/2.png",
    "/images/Home/Logos/4.png",
    "/images/Home/Logos/5.png",
    "/images/Home/Logos/6.png",
    "/images/Home/Logos/8.png",
    "/images/Home/Logos/9.png",
    "/images/Home/Logos/10.png",
  ];

  // Duplicate list once only
  const fullList = [...logos, ...logos];

  return (
    <section className="w-full py-12 overflow-hidden">
      <h3 className="text-center text-base md:text-lg font-semibold text-black mb-10">
        Trusted by Leading Global Brands and Industry Pioneers
      </h3>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }} // only -50% for perfect loop
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {fullList.map((src, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[200px] px-6"
            >
              <Image
                src={src}
                alt={`Logo ${i}`}
                width={60}
                height={60}
                className="object-contain opacity-90 hover:opacity-100 transition"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
