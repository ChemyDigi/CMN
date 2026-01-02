"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 sm:px-6 md:px-20 overflow-hidden">

      {/* ABOUT HEADING + CONTENT */}
      <div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10
          items-center md:items-start
        "
      >
        {/* LEFT TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto md:mx-0"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black text-center md:text-left">
            About CMN Distributors
          </h2>

          <div
            className="
              space-y-4 text-gray-700 leading-relaxed 
              text-sm md:text-base
              text-justify
              mx-auto md:mx-0
              max-w-xl md:max-w-none
            "
          >
            <p>
              CMN Distributors Pvt Ltd &quot;CMN&quot; is a professionally managed company
              engaged mainly in Distributions of Premium Tools & Equipments for
              various industries. CMN is also in Distribution of Niche products
              related to Refrigeration, Airconditioning and Ventilation industry
              including Air Quality Treatment products.
            </p>

            <p>
              We are looking forward to become one of the leading solution provider in both tooling and air conditioning industries. We under take turnkey projects and successful executed many in the past. We have islandwide sales and service dealer network which is our strong hold and our inhouse technical teams provides the best after sales services to all our customers.
            </p>

            <p>
              We present the worlds best brands in each business vertical which helps us to provide the best engineering solutions to our customers
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-start md:ml-46 mt-8 md:mt-0"
        >
          <Image
            src="/images/CMNLogo.png"
            alt="CMN Distributors Logo"
            width={350}
            height={350}
            className="object-contain mx-auto md:mx-0 max-w-[280px] sm:max-w-[320px] md:max-w-[350px]"
          />
        </motion.div>
      </div>

      {/* MULTINATIONAL DISTRIBUTION COMPANY SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="
          max-w-7xl mx-auto 
          grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-16 md:mt-20
          border-t border-gray-200 pt-8 md:pt-10
        "
      >
        {/* LEFT HEADING */}
        <div className="mx-auto md:mx-0">
          <h3 className="text-xl md:text-5xl font-bold mb-4 text-black leading-tight md:leading-snug text-center md:text-left">
            Multinational Distribution <br className="hidden md:block" />
            Company
          </h3>
        </div>

        {/* RIGHT TEXT */}
        <div
          className="
            space-y-3 text-gray-700 text-sm md:text-base
            mx-auto md:mx-0
            max-w-md md:max-w-none
            text-justify 
          "
        >
          <p>
            As a multinational distribution company, we specialize in delivering high-quality industrial tools, equipment, and engineered products across global markets with unmatched reliability.
            Our strategically positioned presence across regions enables seamless sourcing, efficient logistics, and timely delivery, ensuring customers receive consistent value regardless of location. 
            With a strong commitment to operational excellence, we bridge international supply chains and empower industries with the products they need to perform at their best.
          </p>

          {/* SIGNATURE BLOCK */}
          
        </div>
      </motion.div>
    </section>
  );
}