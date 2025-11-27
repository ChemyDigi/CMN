"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import worker from "../../public/images/Home/worker.png";
import Link from "next/link";



export default function HeroIndustrySection() {
    return (
        <section className="w-full flex flex-col md:flex-row items-center justify-center px-4 md:px-12 py-12">

            {/* LEFT — IMAGE BOX */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex justify-center md:justify-start w-full md:w-[45%] md:pl-10"
            >
                <div className="bg-white pl-15 rounded-2xl flex items-center justify-center">
                    <Image
                        src={worker}
                        alt="Industry Worker"
                        width={360}
                        height={320}
                        className="rounded-lg object-contain"
                    />
                </div>
            </motion.div>


            <div className="hidden md:flex h-70 w-px bg-black mx-10 opacity-40" />

            {/* RIGHT — TEXT SECTION */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.1 }}
  className="w-full md:w-[55%] text-center md:text-left pl-10 pt-6"
>
  <h1 className="text-3xl md:text-5xl font-bold text-black leading-snug">
    Empowering Industries <br />
    with Precision Tools & <br />
    Trusted Distribution
  </h1>

  <p className="text-base md:text-lg text-gray-700 mt-4">
    Quality-driven. Industry-ready. Globally aligned.
  </p>

  {/* BUTTON */}
  <Link
    href="/services/airdoot"
    className="inline-flex items-center gap-2 bg-[#F272A8] hover:bg-pink-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 mt-6"
  >
    Explore More
    
  </Link>
</motion.div>


        </section>
    );
}
