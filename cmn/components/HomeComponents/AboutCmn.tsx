"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import worker from "../../public/images/Home/worker.png";
import Link from "next/link";

export default function HeroIndustrySection() {
    return (
        <section className="w-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
            
            {/* LEFT — IMAGE BOX */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex justify-center w-full lg:w-[45%] mb-6 sm:mb-8 lg:mb-0 lg:pl-6 xl:pl-10"
            >
                <div className="bg-white rounded-2xl flex items-center justify-center p-4 sm:p-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                    <Image
                        src={worker}
                        alt="Industry Worker"
                        width={400}
                        height={360}
                        className="rounded-lg object-contain w-full h-auto"
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
                    />
                </div>
            </motion.div>

            {/* VERTICAL DIVIDER - Hidden on mobile, visible on lg screens and above */}
            <div className="hidden lg:flex h-60 xl:h-70 w-px bg-black mx-6 xl:mx-10 opacity-40" />

            {/* RIGHT — TEXT SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
                className="w-full lg:w-[55%] text-center lg:text-left px-4 sm:px-6 lg:pl-6 xl:pl-10 lg:pt-0"
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-black leading-tight sm:leading-snug lg:leading-snug">
                    Empowering Industries{" "}
                    <span className="block">with Precision Tools &</span>
                    <span className="block">Trusted Distribution</span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                    Quality-driven. Industry-ready. Globally aligned.
                </p>

                {/* BUTTON */}
                <Link
                    href="/services/airdoot"
                    className="inline-flex items-center justify-center gap-2 bg-[#F272A8] hover:bg-pink-600 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base w-full sm:w-auto"
                >
                    Explore More
                </Link>
            </motion.div>

        </section>
    );
}