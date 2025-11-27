"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Lucide Icons
import {
  Factory,
  Car,
  Flame,
  Settings,
  Home,
  Plane,
  Zap,
  Hammer,
} from "lucide-react";

import indsutry from "../../public/images/Home/industry.jpg";

export default function IndustrySection() {
  const industryItems = [
    { label: "Manufacturing", icon: Factory },
    { label: "Automobile", icon: Car },
    { label: "Oil&Gas", icon: Flame },
    { label: "General Industries", icon: Settings },
    { label: "HouseHold", icon: Home },
    { label: "Aviation", icon: Plane },
    { label: "Power", icon: Zap },
    { label: "Construction", icon: Hammer },
  ];

  const HoverTab = ({ label, Icon }: { label: string; Icon: any }) => (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { backgroundColor: "#fff", color: "#000" },
        hover: {
          backgroundColor: "#000",
          color: "#fff",
          transition: { duration: 0.35 },
        },
      }}
      className="
        relative w-full flex items-center justify-between
        border border-black/20 px-5 py-3 md:px-6 md:py-4
        rounded-full cursor-pointer transition-all duration-300
        shadow-sm overflow-hidden
      "
    >
      <span className="text-sm md:text-base font-medium z-10">{label}</span>

      <div className="z-10 w-8 h-8 flex items-center justify-center rounded-full border border-black/20">
        <Icon size={18} />
      </div>

      <motion.div
        variants={{
          rest: { x: "-100%" },
          hover: { x: "0%" },
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute left-0 top-0 w-full h-full rounded-full bg-neutral-800"
      />
    </motion.div>
  );

  return (
    <section className="w-full py-16 px-4 md:px-16">
      {/* FLEX ON MOBILE — GRID ON DESKTOP */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* IMAGE TOP ON MOBILE */}
        <div className="w-full order-1">
          <div className="w-full h-[300px] sm:h-[380px] md:h-[550px] overflow-hidden rounded-xl shadow-md">
            <Image
              src={indsutry}
              alt="Industry Worker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* TEXT + TABS BELOW IMAGE ON MOBILE */}
        <div className="w-full flex flex-col gap-6 md:gap-8 order-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug text-black">
              Delivering Solutions Across Every Industry
            </h2>

            <p className="text-gray-600 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
              We provide reliable distribution services tailored to meet the unique needs of every sector -
              from manufacturing and automotive to household and aviation - ensuring your business stays
              connected, efficient, and ahead of the curve.
            </p>
          </div>

          {/* GRID OF TABS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 md:mt-8">
            {industryItems.map(({ label, icon: Icon }, index) => (
              <HoverTab key={index} label={label} Icon={Icon} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
