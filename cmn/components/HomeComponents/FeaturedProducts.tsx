"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import toolsbg from "../../public/images/hero/toolsHero.png";
import refbg from "../../public/images/hero/heroAC.png";

const categories = [
  {
    title: "Tools & Equipment",
    description:
      "Professional grade tools and equipment for all your AC installation and maintenance needs. From precision instruments to heavy duty machinery.",
    image: toolsbg,
    link: "/products/tools",
    buttonText: "Explore Tools",
  },
  {
    title: "AC & Refrigerators",
    description:
      "Complete range of air conditioning units and refrigeration systems. Energy efficient solutions for residential and commercial applications.",
    image: refbg,
    link: "/products/ref-ac",
    buttonText: "Explore Tools",
  },
];

export default function CategoriesSection() {
  return (
    <section id="featured-products" className="w-full bg-white py-">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-black  py-10">
            Our Featured Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of professional tools, equipment, and cooling solutions
          </p>
        </div>
      </div>

      {/* FULL-WIDTH 2 COLUMNS */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">

        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <Link href={category.link}>
              <div className="relative w-full h-[500px] group overflow-hidden">

                {/* IMAGE + HOVER MATCHED */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-500 ease-out" />

                {/* CENTERED CONTENT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="max-w-lg"
                  >
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                      {category.title}
                    </h3>

                    <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <button className="bg-[#F272A8] hover:bg-pink-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300">
                      {category.buttonText}
                    </button>
                  </motion.div>
                </div>

              </div>
            </Link>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
