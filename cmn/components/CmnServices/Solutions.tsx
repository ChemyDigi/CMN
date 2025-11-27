"use client";

import Image from "next/image";
import { BarChart3, Smartphone, Settings, Shield, Wrench, Factory } from "lucide-react";
import image from "../../public/images/cmnServices/install.png";

export default function FeaturesSection() {
  const features = [
    {
      icon: <BarChart3 size={26} />,
      title: "AC Installation & System Setup",
      desc: "Professional installation with accurate mounting, safe connections, and full system testing for reliable long-term cooling.",
    },
    {
      icon: <Smartphone size={26} />,
      title: "AC Commissioning & Initial Calibration",
      desc: "We perform airflow balancing, electrical checks, and refrigerant validation to ensure peak efficiency from day one.",
    },
    {
      icon: <Settings size={26} />,
      title: "Routine Servicing & Performance Checks",
      desc: "Includes coil cleaning, filter replacement, drainage clearing, and performance testing to reduce energy usage.",
    },
    {
      icon: <Shield size={26} />,
      title: "Breakdown Repair & Troubleshooting",
      desc: "Quick diagnosis and repair for compressor faults, electrical failures, cooling issues, and gas leaks.",
    },
    {
      icon: <Wrench size={26} />,
      title: "Annual Maintenance Contracts (AMC)",
      desc: "Scheduled cleaning, inspections, and preventive repairs for smooth year-round AC performance.",
    },
    {
      icon: <Factory size={26} />,
      title: "System Upgrades & Efficiency Enhancements",
      desc: "Improve cooling efficiency with component upgrades, airflow optimization, and smart system enhancements.",
    },
  ];

  return (
    <section className="w-full py-20 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">
          Core Services Designed for Performance & Reliability
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Explore our essential service offerings built to ensure long-lasting performance,
          improved efficiency, and dependable operation across all environments.
        </p>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* LEFT FEATURES */}
          <div className="flex flex-col gap-8">
            {features.slice(0, 3).map((f, i) => (
              <div
                key={i}
                className="p-6 bg-gray-100 rounded-xl text-left shadow-md 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white hover:scale-[1.03]"
              >
                <div className="mb-3 text-[#F272A8]">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm text-justify">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CENTER IMAGE — hidden on mobile/tablet */}
          <div className="hidden lg:flex justify-center">
            <Image
              src={image}
              alt="AC service illustration"
              width={520}
              className="h-[650px] rounded-xl object-cover shadow-lg"
            />
          </div>

          {/* RIGHT FEATURES */}
          <div className="flex flex-col gap-8">
            {features.slice(3, 6).map((f, i) => (
              <div
                key={i}
                className="p-6 bg-gray-100 rounded-xl text-left shadow-md 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white hover:scale-[1.03]"
              >
                <div className="mb-3 text-[#F272A8]">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-600 text-sm text-justify">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}