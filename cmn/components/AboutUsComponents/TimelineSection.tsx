"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TimelineSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 200px", "end end"],
  });

  // Stretch line only for desktop/tablet
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timeline = [
    {
      year: "2004",
      title: "Partnerships in HVAC & R Sector",
      desc: "CMN starts distribution of Niche products related to HVAC & R...",
      side: "right",
    },
    {
      year: "2005",
      title: "Diversification into Engineering Tools",
      desc: "CMN diversifies into engineering products...",
      side: "left",
    },
    {
      year: "2008",
      title: "Expansion into Key Industries",
      desc: "CMN starts its Tools sales PAN India...",
      side: "right",
    },
    {
      year: "2010",
      title: "Global Expansion",
      desc: "CMN starts its first international office in Singapore.",
      side: "left",
    },
    {
      year: "2011",
      title: "Partnership with YORK",
      desc: "Begins distribution of YORK Air Conditioners across Western India.",
      side: "right",
    },
    {
      year: "2016",
      title: "Regional Presence in Sri Lanka",
      desc: "Established a distribution office in Sri Lanka...",
      side: "left",
    },
    {
      year: "2018",
      title: "Partnership with Vance Chemicals",
      desc: "CMN takes up distribution from Vance Chemicals...",
      side: "right",
    },
    {
      year: "2018",
      title: "Strategic Alliance with Sagar Asia",
      desc: "Signs a distribution and sales representation agreement...",
      side: "left",
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-[#2E2E2E] text-white py-20 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-20"
      >
        History Time Line
      </motion.h2>

      <div className="relative max-w-6xl mx-auto">

        {/* ========== CENTER LINE — HIDE ON MOBILE ========== */}
        <motion.div
          style={{ height: lineHeight }}
          className="
            hidden md:block               /* HIDE ON MOBILE */
            absolute top-0 left-1/2 -translate-x-1/2 
            w-[2px] bg-[#F272A8] origin-top
          "
        />

        <div className="flex flex-col space-y-16">

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className={`
                flex flex-col md:flex-row relative
                md:${item.side === "left" ? "justify-start" : "justify-end"}
              `}
            >

              {/* ========== DOT — HIDE ON MOBILE ========== */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="
                  hidden md:block           /* HIDE ON MOBILE */
                  absolute left-1/2 -translate-x-1/2
                  w-5 h-5 bg-[#F272A8] rounded-full border-4 border-[#2E2E2E]
                "
              />

              {/* ========== TIMELINE CARD ========== */}
              <div
                className={`
                  w-full md:w-1/2 px-8

                  /* DESKTOP & TABLET LEFT/RIGHT */
                  md:${item.side === "left" ? "pr-16 text-right" : "pl-16 text-left"}

                  /* MOBILE CENTER EVERYTHING */
                  text-center md:text-inherit
                `}
              >
                <p className="text-[#F272A8] font-semibold text-lg mb-2">
                  {item.year}
                </p>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
