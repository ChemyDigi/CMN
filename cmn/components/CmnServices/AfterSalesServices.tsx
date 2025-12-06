"use client";

import { FaCircle, FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AfterSalesServices() {
    const services = [
        {
            title: "Product Installation & Commissioning",
            description:
                "Our certified technical team assists in proper installation, calibration, and commissioning of equipment to ensure optimal performance and adherence to industry standards.",
        },
        {
            title: "Preventive Maintenance Programs",
            description:
                "Regular inspections and scheduled maintenance to reduce downtime, enhance equipment lifespan, and maintain workplace safety.",
        },
        {
            title: "Diagnostics & Troubleshooting Support",
            description:
                "On-site and remote technical assistance for identifying faults, resolving system issues, and providing quick solutions to minimize operational disruptions.",
        },
        {
            title: "Repairs & Replacement Services",
            description:
                "We offer genuine spare parts, repairs, and component replacements for all distributed products to ensure continued reliability and efficiency.",
        },
        {
            title: "Warranty Handling & Claims Support",
            description:
                "Dedicated support for processing warranty claims, product evaluations, and manufacturer-backed service requests with complete transparency.",
        },
    ];

    return (
        <section className="w-full bg-white text-black py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* LEFT SIDE */}
                <div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        After Sales <br /> Services
                    </h2>

                    <p className="text-gray-600 mb-10 max-w-lg">
                        At CMN Distributors, our commitment to customers extends far beyond
                        the point of purchase. As a trusted supplier of premium industrial
                        tools, HVAC & R equipment, and niche engineering products, we ensure
                        that every client receives continuous support to maintain
                        performance, safety, and long-term value.
                    </p>

                    <Link
                        href="/products"
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
