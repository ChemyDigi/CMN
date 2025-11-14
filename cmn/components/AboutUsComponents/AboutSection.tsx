"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-20 overflow-hidden">
      {/* ABOUT HEADING + CONTENT */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
            About CMN Distributors
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base text-justify">
            <p>
              CMN Distributors Pvt Ltd “CMN” is a professionally managed company
              engaged mainly in Distributions of Premium Tools & Equipments for
              various industries. CMN is also in Distribution of Niche products
              related to Refrigeration, Airconditioning and Ventilation industry
              including Air Quality Treatment products.
            </p>

            <p>
              We are looking forward to become one of the leading supply chain
              companies for Aviation, Nuclear Power, Defence Research, Oil & Gas
              & Heavy Engineering Industry.
            </p>

            <p>
              In our retail distribution arm we intend to distribute niche quality
              products for HVAC & R industry for next level of comfort. We bind
              ourselves to usage and promotion of energy saving, productivity
              enhancing and environment friendly products and practices and also
              creating safe, hazard-free working conditions.
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end mt-10 md:mt-0"
        >
          <Image
            src="/images/CMN_logo.png"
            alt="CMN Distributors Logo"
            width={350}
            height={350}
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* MULTINATIONAL DISTRIBUTION COMPANY SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mt-20 border-t border-gray-200 pt-10"
      >
        {/* LEFT HEADING */}
        <div>
          <h3 className="text-xl md:text-5xl font-bold mb-4 text-black">
            Multinational Distribution <br />Company
          </h3>
        </div>

        {/* RIGHT TEXT */}
        <div className="space-y-3 text-gray-700 text-sm md:text-base">
          <p>
            <span className="font-semibold">CMN Distributors Pvt Ltd</span> is a
            professionally managed company engaged mainly in Distributions of
            Premium Tools & Equipments for various industries.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/AboutUs/sign.png"
              alt="CEO Signature"
              width={100}
              height={50}
              className="object-contain mt-2"
            />
            <p className="font-semibold text-gray-900">Richard Donovan</p>
            <p className="text-sm text-gray-600">CEO FOUNDER</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
