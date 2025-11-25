"use client";
import React, { useState } from "react";

interface Industry {
  name: string;
  description: string;
  group: "inner" | "outer";
}

const industries: Industry[] = [
  // Outer circle — spaced evenly around
  { name: "Oil & Gas", description: "Ride-sharing and fleet platforms.", group: "outer" },
  { name: "Automobile", description: "Connected vehicle systems.", group: "outer" },
  { name: "Power", description: "Game systems and interactive apps.", group: "outer" },
  { name: "General Industries", description: "Automation and predictive engines.", group: "outer" },
  { name: "HouseHold", description: "Online shopping systems.", group: "outer" },
  { name: "Construction", description: "Property CRM systems.", group: "outer" },

  // Inner circle — compact
  { name: "Manufacturing", description: "Cloud product solutions.", group: "inner" },
  { name: "Aviation", description: "Blockchain-based tools.", group: "inner" }
];

export default function Industries() {
  const [hovered, setHovered] = useState<string | null>(null);

  // NEW SCALED SIZES
  const OUTER_SIZE = 1050; // was 750
  const INNER_SIZE = 600;  // was 450
  const LAYOUT_SIZE = 900; // was 900
  const OUTER_RADIUS = 450; // was 320

  return (
    <section className="w-full py-20 flex flex-col items-center">
      <h2 className="text-5xl font-bold mb-4 text-black">Industries</h2>
      <p className="text-center max-w-4xl text-gray-800 mb-16">
        Our many-sided expertise spans different industries, delivering reliable products.
      </p>

      <div className="relative flex items-center justify-center">

        {/* Outer Circle */}
        <div
          className="absolute rounded-full border-2 border-dashed border-gray-300"
          style={{ width: OUTER_SIZE, height: OUTER_SIZE }}
        ></div>

        {/* Inner Circle */}
        <div
          className="absolute rounded-full border-2 border-dashed border-gray-300"
          style={{ width: INNER_SIZE, height: INNER_SIZE }}
        ></div>

        {/* Layout wrapper */}
        <div
          className="relative z-10 pointer-events-none"
          style={{ width: LAYOUT_SIZE, height: LAYOUT_SIZE }}
        >

          {/* Outer Pills */}
          {industries
            .filter((i) => i.group === "outer")
            .map((item, index) => {
              const total = 6;
              const angle = (index / total) * (2 * Math.PI) - Math.PI / 2;
              const radius = OUTER_RADIUS;

              const center = LAYOUT_SIZE / 2;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={item.name}
                  className="absolute pointer-events-auto"
                  style={{ left: center + x, top: center + y }}
                  onMouseEnter={() => setHovered(item.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="relative">
                    <div
                      className={`relative rounded-full px-8 py-4 border-2 text-lg font-medium overflow-hidden transition-all duration-500
                      ${hovered === item.name
                        ? "text-pink-400 border-black"
                        : "text-black border-gray-400 bg-white"}`}
                    >
                      <div
                        className={`absolute inset-0 bg-black transition-transform duration-500 ease-out origin-top
                        ${hovered === item.name ? "scale-y-100" : "scale-y-0"}`}
                      ></div>

                      <span className="relative z-10">{item.name}</span>
                    </div>

                    {hovered === item.name && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-20 w-64 p-4 bg-white border rounded-lg shadow-lg text-sm z-20">
                        <p className="mb-2 text-gray-700">{item.description}</p>
                        <button className="text-pink-500 font-medium">Learn more</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Inner Pills */}
          <div
            className="absolute grid grid-cols-2 gap-4 pointer-events-auto"
            style={{
              width: 380, // scaled from 300
              top: LAYOUT_SIZE / 2 - 190, // center offset
              left: LAYOUT_SIZE / 2 - 190
            }}
          >
            {industries
              .filter((i) => i.group === "inner")
              .map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHovered(item.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={`relative rounded-full px-6 py-3 border-2 text-lg font-medium overflow-hidden transition-all duration-500
                    ${hovered === item.name
                      ? "text-black border-pink-400"
                      : "text-pink-400 border-black bg-black"}`}
                  >
                    <div
                      className={`absolute inset-0 bg-pink-400 transition-transform duration-500 ease-out origin-bottom
                      ${hovered === item.name ? "scale-y-100" : "scale-y-0"}`}
                    ></div>

                    <span className="relative z-10">{item.name}</span>
                  </div>

                  {hovered === item.name && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-20 w-64 p-4 bg-white border rounded-lg shadow-lg text-sm z-20">
                      <p className="mb-2 text-gray-700">{item.description}</p>
                      <button className="text-pink-500 font-medium">Learn more</button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
