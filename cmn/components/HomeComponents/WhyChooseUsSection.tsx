"use client";

import Image from "next/image";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: "/images/Home/network.png",
      title: "NETWORK",
      desc: "Experts in Retail & Distribution network",
    },
    {
      icon: "/images/Home/International.png",
      title: "INTERNATIONAL PRESENCE",
      desc: "Presence in Singapore / Sri Lanka / India",
    },
    {
      icon: "/images/Home/Team.png",
      title: "DEDICATED TEAM",
      desc: "Technically qualified Execution Team",
    },
    {
      icon: "/images/Home/Service.png",
      title: "BEST SERVICE",
      desc: "Experts in Retail & Distribution network",
    },
    {
      icon: "/images/Home/Wide.png",
      title: "WIDE NETWORK",
      desc: "Presence in Singapore / Sri Lanka / India",
    },
    {
      icon: "/images/Home/Cost.png",
      title: "COST EFFICIENT",
      desc: "Technically qualified Execution Team",
    },
  ];

  return (
    <section className="w-full bg-[#0D0808] text-white py-20 px-6 md:px-16 lg:px-24">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-12">
        <p className="text-gray-400 text-sm mb-2">Why Choose Us</p>
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
          Delivering Quality, Reliability & <br /> Service You Can Trust
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-10">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {/* ICON CIRCLE */}
            <div className="w-28 h-28 flex items-center justify-center rounded-full border-2 border-white mb-4">
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="object-contain"
              />
            </div>

            {/* TITLE */}
            <h3 className="text-[#F272A8] text-sm font-semibold tracking-wide mb-1">
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
