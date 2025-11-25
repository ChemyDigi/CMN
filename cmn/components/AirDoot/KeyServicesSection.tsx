"use client";
import Image from "next/image";

export default function KeyServicesSection() {
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
  ];

  return (
    <section className="relative w-full bg-white">
      {/* Combined Header Section */}
      <div className="container mx-auto px-4 py-12 text-center sm:px-6 md:px-8 lg:py-16 xl:px-12">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/images/AirDoot/logo.png" 
            alt="AirDoot Logo"
            width={200} 
            height={80} 
            className="h-12 w-auto sm:h-16 md:h-20 lg:h-24" 
          />
        </div>

        <p className="mx-auto text-sm text-gray-600 sm:max-w-md sm:text-base md:max-w-xl md:text-lg lg:max-w-2xl lg:text-xl mb-8">
          Going Beyond Repairs: Our Value-Added Services
        </p>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Comprehensive HVAC-R Solutions
        </h1>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Service Image */}
                <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}