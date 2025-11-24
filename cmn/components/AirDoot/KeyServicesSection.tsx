"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function KeyServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const services = [
    {
      title: "Proactive Maintenance Plans",
      desc: "Scheduled check-ups, cleaning, and performance optimization to avoid costly repairs.",
      img: "/images/AirDoot/1.png",
    },
    {
      title: "System Design & Engineering",
      desc: "Tailored solutions for commercial and residential clients with top-tier standards.",
      img: "/images/AirDoot/2.png",
    },
    {
      title: "Emergency Repair Services",
      desc: "Fast response teams available 24/7 to diagnose and fix system failures.",
      img: "/images/AirDoot/1.png",
    },
    {
      title: "Energy Efficiency Upgrades",
      desc: "Reduce power consumption with modern upgrades that increase system lifespan.",
      img: "/images/AirDoot/2.png",
    },
    {
      title: "Smart Monitoring Solutions",
      desc: "Advanced IoT sensors and dashboards to track performance in real-time.",
      img: "/images/AirDoot/1.png",
    },
  ];

  return (
    <section className="w-full bg-[#f4f4f4] text-black px-6 md:px-16 lg:px-24 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE TEXT - Made heading bigger */}
        <div className="w-full">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl font-bold leading-tight">
            Key Services <br /> to Highlight
          </h2>
          <p className="mt-6 text-lg max-w-md text-black/70">
            AirDoot, a flagship service of CMN Distribution, is a revolutionary platform that uses cutting-edge technology to simplify and streamline air-conditioning and refrigeration services for every need.
          </p>
        </div>

        {/* RIGHT SIDE SCROLL SECTION */}
        <div className="relative w-full">
          {/* BUTTON LEFT */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg h-10 w-10 flex items-center justify-center rounded-full"
          >
            <span className="text-xl">‹</span>
          </button>

          {/* SCROLLABLE CARDS */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pr-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial="rest"
                whileHover="hover"
                animate="rest"
                transition={{ duration: 0.25 }}
                className="relative min-w-[260px] md:min-w-[320px] h-[420px] rounded-lg overflow-hidden shadow-lg flex-shrink-0 group cursor-pointer"
                >
                <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                <div className="absolute bottom-6 px-6 text-white">
                    <h3 className="text-xl font-semibold">{s.title}</h3>
                    <motion.p 
                    variants={{
                        rest: { opacity: 0, height: 0 },
                        hover: { opacity: 1, height: "auto" }
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm mt-3 leading-relaxed overflow-hidden"
                    >
                    {s.desc}
                    </motion.p>
                </div>
                </motion.div>
            ))}
          </div>

          {/* BUTTON RIGHT */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg h-10 w-10 flex items-center justify-center rounded-full"
          >
            <span className="text-xl">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}