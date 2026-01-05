"use client";

import { FaCircle, FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AfterSalesServices() {
const services = [
  {
    title: "In-House & Mobile Service Teams",
    description:
      "Dedicated in-house and mobile technical teams providing reliable service support for tools and equipment across customer locations.",
  },
  {
    title: "Authorized Bosch Power Tools Service",
    description:
      "Professional repair and servicing of Bosch Power Tools carried out at our authorized service center to ensure quality and reliability.",
  },
  {
    title: "Bosch Service Center – Boralesgamuwa",
    description:
      "All Bosch Power Tools repairs are handled at our fully equipped service center located at No. 145, Lake Road, Boralesgamuwa.",
  },
  {
    title: "Mobile Service for John Bean & Hoffmann",
    description:
      "On-site service support for John Bean and Hoffmann equipment, including installation and technical assistance.",
  },
  {
    title: "Installation, Calibration & Repairs",
    description:
      "Comprehensive services including equipment installation, calibration, specification updates, and breakdown repair services.",
  },
];


    return (
        <section className="w-full bg-white text-black py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Tools & Equipment <br /> Solutions
                    </h2>

                    <p className="text-gray-600 mb-10 max-w-lg">
                        At CMN Distributors, our commitment to customers extends far beyond
                        the point of purchase. As a trusted supplier of premium industrial
                        tools, HVAC & R equipment, and niche engineering products, we ensure
                        that every client receives continuous support to maintain
                        performance, safety, and long-term value.
                    </p>

                    <Link
                        href="/home/#featured-products"
                        className="inline-block bg-[#F272A8] text-white px-10 py-4 rounded-full font-semibold hover:bg-pink-600 transition-all"
                    >
                        Discover Products
                    </Link>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col space-y-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start gap-6"
                            initial={{ opacity: 0, y: -30 }}        // ⬅ fade + move from top
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.0, delay: index * 0.2 }}
                        >
                            {/* Icon + Line */}
                            <div className="flex flex-col items-center">

                                {/* Icon animation */}
                                <div className="relative w-8 h-8 flex items-center justify-center">

                                    {/* Animated circle */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.25 }}
                                        className="absolute"
                                    >
                                        <FaCircle className="text-black text-4xl" />
                                    </motion.div>

                                    {/* Animated check */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.35 }}
                                        className="absolute"
                                    >
                                        <FaCheck className="text-pink-500 text-lg" />
                                    </motion.div>

                                </div>

                                {/* Bolder connecting line */}
                                {index !== services.length - 1 && (
                                    <div className="w-[3px] h-16 bg-gray-400 mt-3"></div>
                                )}
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="font-semibold text-xl mb-1">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}
