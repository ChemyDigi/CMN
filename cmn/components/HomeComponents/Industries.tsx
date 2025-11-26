"use client";

import React, { JSX,useState } from "react";

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
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);

  return (
    <section
      className="w-full flex flex-col items-center justify-center py-20 relative select-none
                 md:pt-20 pt-32"
    >
      <h2 className="text-6xl font-semibold text-center mb-4 text-black">
        Industries We Serve
      </h2>

      <p className="text-center text-gray-700 mb-16 max-w-2xl">
        Our many sided spans different industries, so we deliver reliable
        products that meet your requirements and captivate users
      </p>

      {/* ------------------- DESKTOP ONLY DOT CIRCLES ------------------- */}
      <img
        src="/images/industries-center.svg"
        alt="outer-circle"
        className="hidden md:block absolute w-[1000px] h-[1000px] rounded-full -z-20 top-1/2 left-1/2 
        -translate-x-125 -translate-y-105 border-2 border-dotted border-white/30"
      />

      <img
        src="/images/industries-center.svg"
        alt="inner-circle"
        className="hidden md:block absolute w-[500px] h-[500px] rounded-full -z-20 top-1/2 left-1/2 
        -translate-x-63 -translate-y-43 border-3 border-dotted border-white/10"
      />

      {/* ------------------- DESKTOP LAYOUT ------------------- */}
      <div className="hidden md:flex relative flex-row items-center justify-center gap-48 z-10">
        {/* LEFT */}
        <div className="relative flex flex-col justify-center" style={{ height: 440 }}>
          <div className="absolute left-0 top-0 -translate-x-10 translate-y-10">
            <Pill
              item={industriesLeft[0]}
              hovered={hovered}
              setHovered={setHovered}
              align="right"
              outer
              large
            />
          </div>

          <div className="absolute left-0 top-1/2 -translate-x-20 -translate-y-10">
            <Pill
              item={industriesLeft[1]}
              hovered={hovered}
              setHovered={setHovered}
              align="right"
              outer
              large
            />
          </div>

          <div className="absolute left-0 bottom-0 -translate-x-10 -translate-y-10">
            <Pill
              item={industriesLeft[2]}
              hovered={hovered}
              setHovered={setHovered}
              align="right"
              outer
              large
            />
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
                outer
                large
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col justify-center" style={{ height: 440 }}>
          <div className="absolute right-0 top-0 translate-x-10 translate-y-10">
            <Pill
              item={industriesRight[0]}
              hovered={hovered}
              setHovered={setHovered}
              align="left"
              outer
              large
            />
          </div>

          <div className="absolute right-0 top-1/2 translate-x-28 -translate-y-10">
            <Pill
              item={industriesRight[1]}
              hovered={hovered}
              setHovered={setHovered}
              align="left"
              outer
              large
            />
          </div>

          <div className="absolute right-0 bottom-0 translate-x-10 -translate-y-10">
            <Pill
              item={industriesRight[2]}
              hovered={hovered}
              setHovered={setHovered}
              align="left"
              outer
              large
            />
          </div>
        </div>
      </div>

      {/* ------------------- MOBILE STACKED VIEW ------------------- */}
      <div className="flex flex-col gap-6 w-full px-6 md:hidden z-10">
        {[...industriesLeft, ...industriesMiddle, ...industriesRight].map(
          (item) => (
            <div key={item.name}>
              <button
                onClick={() =>
                  setOpenMobile(openMobile === item.name ? null : item.name)
                }
                className="w-full bg-white text-black border border-black rounded-full 
                           px-6 py-4 text-base font-medium"
              >
                {item.name}
              </button>

              {openMobile === item.name && (
                <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                  <p className="text-gray-700">{item.description}</p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}

/* ------------------- DESKTOP PILL COMPONENT ------------------- */
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

  const sizeClasses = large
    ? "px-12 py-4 text-base"
    : "px-10 py-3 text-sm";

  return (
    <div
      className="relative z-10"
      onMouseEnter={() => setHovered(item.name)}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={`rounded-full font-medium hover:scale-105 transform-gpu cursor-pointer whitespace-nowrap 
        transition-all duration-300 flex items-center justify-center ${baseClasses} ${sizeClasses}`}
      >
        {item.name}
      </div>

      {/* Tooltip */}
      {hovered === item.name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30">
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

/* ------------------- FADE-IN ANIMATION ------------------- */
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeInTop { 
    from { opacity: 0; transform: translateY(-12px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  .animate-fadeInTop { animation: fadeInTop 300ms ease-out forwards; }
`;
document.head.appendChild(style);
