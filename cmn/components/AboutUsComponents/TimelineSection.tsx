"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TimelineSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 200px", "end end"], // start when timeline hits viewport
  });

  // Map scroll progress (0–1) to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timeline = [
    {
      year: "2004",
      title: "Partnerships in HVAC & R Sector",
      desc: "CMN starts distribution of Niche products related to HVAC & R tie-up with YUTAS – A Tata Group Company & Carrier – A UTC Group Company in Mumbai (India).",
      side: "right",
    },
    {
      year: "2005",
      title: "Diversification into Engineering Tools",
      desc: "CMN diversifies into engineering products – dealing in premium and mid-tier tools of SNAP ON & BLUE POINT from Snap On Tools Inc – USA.",
      side: "left",
    },
    {
      year: "2008",
      title: "Expansion into Key Industries",
      desc: "CMN starts its Tools sales PAN India to key customers in Aviation, Nuclear Power, Defence Research, Oil & Gas industry etc.",
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
      desc: "Begins distribution of YORK Air Conditioners and Air Purifiers across Western India.",
      side: "right",
    },
    {
      year: "2016",
      title: "Regional Presence in Sri Lanka",
      desc: "Established a distribution office in Sri Lanka, strengthening CMN’s reach in the South Asian region.",
      side: "left",
    },
    {
      year: "2018",
      title: "Partnership with Vance Chemicals",
      desc: "CMN takes up distribution from Vance Chemicals of Mr McKenic, Germ Killer & Mrs McKenic for India and Sri Lanka.",
      side: "right",
    },
    {
      year: "2018",
      title: "Strategic Alliance with Sagar Asia",
      desc: "Signs a distribution and sales representation agreement with Sagar Asia for South East Asia and Bangladesh for their brands – Litelift, Finet, Euro Star and Unite Giant.",
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
        {/* Animated Vertical Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] bg-[#F272A8] origin-top"
        ></motion.div>

        {/* Timeline Items */}
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
              className={`flex flex-col md:flex-row ${
                item.side === "left"
                  ? "md:justify-start"
                  : "md:justify-end"
              } relative`}
            >
              {/* Connector Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#F272A8] rounded-full border-4 border-[#2E2E2E]"
              ></motion.div>

              {/* Timeline Card */}
              <div
                className={`w-full md:w-1/2 px-8 ${
                  item.side === "left"
                    ? "md:pr-16 text-right md:text-right"
                    : "md:pl-16 text-left md:text-left"
                }`}
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
