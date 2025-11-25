"use client";

import React, { useState } from "react";

type Industry = {
  name: string;
  description: string;
};

const industriesLeft: Industry[] = [
  {
    name: "HouseHold",
    description:
      "Smart appliances, home automation, and consumer-focused digital systems designed to enhance everyday living and comfort.",
  },
  {
    name: "Automobile",
    description:
      "Connected mobility solutions, vehicle diagnostics, telematics, and in-car digital experiences for next-generation automotive innovation.",
  },
  {
    name: "Construction",
    description:
      "Digital tools and automation platforms that optimize project planning, structural modeling, material estimation, and on-site coordination.",
  },
];

const industriesMiddle: Industry[] = [
  {
    name: "Manufacturing",
    description:
      "Industry 4.0 systems for production automation, quality control, predictive maintenance, and seamless factory digitalization.",
  },
  {
    name: "Power",
    description:
      "Energy management solutions, smart grids, and optimization systems that enhance reliability, sustainability, and operational efficiency.",
  },
];

const industriesRight: Industry[] = [
  {
    name: "Oil&Gas",
    description:
      "Advanced monitoring, asset tracking, and safety-driven digital solutions for upstream, midstream, and downstream operations.",
  },
  {
    name: "General Industries",
    description:
      "Cross-industry engineering platforms, workflow automation, monitoring systems, and scalable enterprise-grade digital tools.",
  },
  {
    name: "Aviation",
    description:
      "Flight operations software, aerospace diagnostics, safety systems, and high-reliability digital tools for modern aviation ecosystems.",
  },
];

export default function Industries(): JSX.Element {
  const [hovered, setHovered] = useState<string | null>(null); // Desktop hover
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null); // Mobile click

  return (
    <section className="w-full flex flex-col items-center justify-center py-20 relative select-none">
      <h2 className="text-6xl font-semibold text-center mb-4 text-black">
        Industries We Serve
      </h2>
      <p className="text-center text-gray-700 mb-16 max-w-2xl">
        Our many sided spans different industries, so we deliver reliable products
        that meet your requirements and captivate users
      </p>

      {/* Outer Dotted Circle – visible on desktop only */}
      <img
        src="/images/industries-center.svg"
        alt="outer-circle"
        className="hidden sm:block absolute w-[1000px] h-[1000px] rounded-full -z-10 top-1/2 left-1/2 -translate-x-125 -translate-y-105 border-2 border-dotted border-white/30"
      />

      {/* Inner Dotted Circle – visible on desktop only */}
      <img
        src="/images/industries-center.svg"
        alt="inner-circle"
        className="hidden sm:block absolute w-[500px] h-[500px] rounded-full -z-10 top-1/2 left-1/2 -translate-x-63 -translate-y-43 border-3 border-dotted border-white/10"
      />

      {/* Fade Mask */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
        <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden sm:flex relative flex-row items-center justify-center gap-48">
        {/* LEFT COLUMN */}
        <div className="relative flex flex-col justify-center" style={{ height: 440 }}>
          <div className="absolute left-0 top-0 transform -translate-x-10 translate-y-10">
            <Pill item={industriesLeft[0]} hovered={hovered} setHovered={setHovered} align="right" outer large />
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-25 -translate-y-10">
            <Pill item={industriesLeft[1]} hovered={hovered} setHovered={setHovered} align="right" outer large />
          </div>
          <div className="absolute left-0 bottom-0 transform -translate-x-10 -translate-y-10">
            <Pill item={industriesLeft[2]} hovered={hovered} setHovered={setHovered} align="right" outer large />
          </div>
        </div>

        {/* CENTER */}
        <div className="relative flex items-center justify-center">
          <div style={{ width: 320, height: 320 }}></div>
          <div className="absolute flex flex-col gap-12">
            {industriesMiddle.map((item) => (
              <Pill
                key={item.name}
                item={item}
                hovered={hovered}
                setHovered={setHovered}
                align="center"
                outer={true}
                large
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex flex-col justify-center" style={{ height: 440 }}>
          <div className="absolute right-0 top-0 transform translate-x-10 translate-y-10">
            <Pill item={industriesRight[0]} hovered={hovered} setHovered={setHovered} align="left" outer large />
          </div>
          <div className="absolute right-0 top-1/2 translate-x-33 -translate-y-10">
            <Pill item={industriesRight[1]} hovered={hovered} setHovered={setHovered} align="left" outer large />
          </div>
          <div className="absolute right-0 bottom-0 transform translate-x-10 -translate-y-10">
            <Pill item={industriesRight[2]} hovered={hovered} setHovered={setHovered} align="left" outer large />
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="flex sm:hidden flex-col gap-6 px-4 pt-6">
        {[...industriesLeft, ...industriesMiddle, ...industriesRight].map((item) => (
          <div key={item.name} className="flex flex-col w-full">
            <div
              onClick={() =>
                setExpandedMobile(expandedMobile === item.name ? null : item.name)
              }
            >
              <Pill
                item={item}
                hovered={expandedMobile === item.name ? item.name : null}
                setHovered={setExpandedMobile}
                align="center"
                outer={true}
                large
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pill({
  item,
  hovered,
  setHovered,
  align,
  outer,
  large,
}: {
  item: Industry;
  hovered: string | null;
  setHovered: any;
  align: "left" | "right" | "center";
  outer?: boolean;
  large?: boolean;
}) {
  const baseClasses = outer
    ? "bg-white text-black border border-black hover:bg-[#2E2E2E] hover:[color:#F272A8]"
    : "bg-black [color:#F272A8] border border-black hover:bg-[#2E2E2E] hover:text-black";

  const sizeClasses = large ? "px-12 py-4 text-base leading-none" : "px-10 py-3 text-sm leading-none";

  return (
    <div
      className="relative z-50"
      onMouseEnter={() => setHovered(item.name)}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={`rounded-full font-medium hover:scale-105 transform-gpu cursor-pointer whitespace-nowrap 
        transition-colors duration-300 flex items-center justify-center ${baseClasses} ${sizeClasses}`}
        style={{ lineHeight: "1" }}
      >
        {item.name}
      </div>

      {hovered === item.name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50">
          <div className="w-52 p-3 bg-white rounded-xl border border-gray-100 text-sm shadow-lg animate-fadeInTop relative">
            <h4 className="font-semibold mb-1" style={{ color: "#F272A8" }}>
              {item.name}
            </h4>
            <p className="text-gray-600 leading-tight">{item.description}</p>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
}

// Animation
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeInTop { 
    from { opacity: 0; transform: translateY(-12px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  .animate-fadeInTop { animation: fadeInTop 300ms ease-out forwards; }
`;
document.head.appendChild(style);
