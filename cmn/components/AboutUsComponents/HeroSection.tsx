"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center">
      <Image
        src="/images/AboutUs/AboutHero.jpg"
        alt="CMN Distributor Hero"
        fill
        className="object-cover brightness-50"
      />
      <div className=" text-left text-white z-5 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          CMN Distributors is the <br />Global Distribution <br />Powerhouse
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          We strive to end supply and distribution solutions for premium tools,
          equipment, and industrial products across continents.
        </p>
      </div>
    </section>
  );
}
