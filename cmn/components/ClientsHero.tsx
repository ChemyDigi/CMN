// components/ClientsHero.tsx
"use client";

import Image from "next/image";

export default function ClientsHero() {
  return (
    <div className="relative h-[70vh] min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/clients-hero-bg.png"
          alt="Our Clients Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-10 relative z-10">
        <div className="max-w-4xl mx-[1in]">
          <p className="text-white text-sm font-medium mb-4 tracking-wider">
            Our Clients
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Empowering Global<br />
            Brands through<br />
            Seamless Distribution
          </h1>
          
          <p className="text-gray-200 text-lg max-w-2xl leading-relaxed">
            Our client network spans continents, built on trust, precision, and <br/> performance. 
            Together, we deliver success through every shipment, <br/> every time.
          </p>
        </div>
      </div>
    </div>
  );
}