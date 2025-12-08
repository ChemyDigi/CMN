"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import map from "../../public/images/cmnServices/map.jpg";

export default function WorldwideImpact() {
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <section className="w-full bg-black py-12 md:py-24 px-6 md:px-8 lg:px-10 xl:px-12"> {/* Added horizontal padding */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">

                {/* LEFT TEXT SECTION */}
                <div className="space-y-4 md:space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                        Engineering Excellence
                        <span className="block text-[#f271a8]">Worldwide</span>
                    </h1>

                    <p className="text-lg sm:text-xl leading-relaxed text-white">
                        Serving the world's most demanding{" "}
                        <span className="font-semibold text-white">engineering environments</span>
                    </p>

                    <Link href="#service-ranges">
                        <button
                            className="
                                px-6 py-3 rounded-full bg-white text-[#554c4a] text-sm sm:text-base
                                shadow-md hover:shadow-lg
                                transition-all duration-300 ease-out
                                hover:scale-105 hover:-translate-y-1
                            "
                        >
                            View Products
                        </button>
                    </Link>
                </div>

                {/* RIGHT WORLD MAP */}
                <div className="flex justify-center relative mt-8 lg:mt-0">
                    {/* Map Image */}
                    <Image
                        src={map}
                        alt="World map"
                        width={900}
                        height={500}
                        className="object-contain max-w-full"
                    />

                    {/* MARKERS WITH LABELS */}

                    {/* India */}
                    <div
                        className="absolute flex items-center"
                        style={{ top: "58%", left: "43%" }}
                    >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f271a8] rounded-full animate-ping"></div>
                        <span
                            className="
                                ml-1 sm:ml-2 px-2 sm:px-3 py-1 
                                rounded-full 
                                text-white text-xs sm:text-sm font-semibold 
                                backdrop-blur-sm
                                shadow-md
                                border border-[#f271a8]/40
                                bg-[#f271a8]/30
                            "
                        >
                            India
                        </span>
                    </div>

                    {/* Sri Lanka */}
                    <div
                        className="absolute flex items-center"
                        style={{ top: "68%", left: "45%" }}
                    >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f271a8] rounded-full animate-ping"></div>
                        <span
                            className="
                                ml-1 sm:ml-2 px-2 sm:px-3 py-1 
                                rounded-full 
                                text-white text-xs sm:text-sm font-semibold 
                                backdrop-blur-sm
                                shadow-md
                                border border-[#f271a8]/40
                                bg-[#f271a8]/30
                            "
                        >
                            Sri Lanka
                        </span>
                    </div>

                    {/* Singapore */}
                    <div
                        className="absolute flex items-center"
                        style={{ top: "74%", left: "61%" }}
                    >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#f271a8] rounded-full animate-ping"></div>
                        <span
                            className="
                                ml-1 sm:ml-2 px-2 sm:px-3 py-1 
                                rounded-full 
                                text-white text-xs sm:text-sm font-semibold 
                                backdrop-blur-sm
                                shadow-md
                                border border-[#f271a8]/40
                                bg-[#f271a8]/30
                            "
                        >
                            Singapore
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}