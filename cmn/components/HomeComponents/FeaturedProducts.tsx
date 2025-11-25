"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import toolsbg from "../../public/images/hero/toolsHero.png";
import refbg from "../../public/images/hero/heroAC.png";

const categories = [
  {
    title: "Tools & Equipment",
    description:
      "Professional-grade tools and equipment for all your AC installation and maintenance needs. From precision instruments to heavy-duty machinery.",
    image: toolsbg,
    link: "/products/tools",
    buttonText: "Explore Tools",
    stats: "100+ Products",
  },
  {
    title: "AC & Refrigerators",
    description:
      "Complete range of air conditioning units and refrigeration systems. Energy-efficient solutions for residential and commercial applications.",
    image: refbg,
    link: "/products/ref-ac",
    buttonText: "Browse AC Units",
    stats: "50+ Models",
  },
];

export default function CategoriesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Our Products & Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-large text-gray-600 max-w-2xl mx-auto"
          >
            Discover our comprehensive range of professional tools, equipment,
            and cooling solutions
          </motion.p>
        </motion.div>

        {/* CATEGORY CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={
                isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }
              }
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 0.8,
                delay: index * 0.2,
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Link href={category.link} className="group block">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[500px]"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* BACKGROUND IMAGE */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* BLACK OVERLAY */}
                    <div
                      className={`absolute inset-0 bg-black transition-all duration-300 ${
                        hoveredCard === index ? "opacity-50" : "opacity-40"
                      }`}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                    {/* STAT BADGE */}
                    <motion.div 
                      className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 self-start"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-sm font-semibold">
                        {category.stats}
                      </span>
                    </motion.div>

                    <h3 className="text-4xl font-bold mb-4 leading-tight">
                      {category.title}
                    </h3>

                    <p className="text-lg mb-6 opacity-90 leading-relaxed">
                      {category.description}
                    </p>

                    {/* CTA BUTTON */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        {category.buttonText} →
                      </span>

                      {/* HOVER ICON */}
                      <div
                        className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                          hoveredCard === index
                            ? "scale-110 rotate-45"
                            : "scale-100 rotate-0"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* SOFT WHITE HOVER FILTER */}
                  <div
                    className={`absolute inset-0 bg-white/5 backdrop-blur-sm transition-opacity duration-300 ${
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}