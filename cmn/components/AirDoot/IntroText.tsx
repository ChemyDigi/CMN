"use client";
import Image from "next/image";

export default function IntroText() {
  return (
    <section className="relative w-full bg-white">
      {/* Hero Text Section */}
      <div className="container mx-auto px-4 py-10 text-center sm:px-6 md:px-8 lg:py-12 xl:px-12">
        {/* Logo */}
        <div className="mb-3 flex justify-center">
          <Image
            src="/images/AirDoot/logo.png" 
            alt="AirDoot Logo"
            width={200} 
            height={80} 
            className="h-12 w-auto sm:h-16 md:h-20 lg:h-24" 
          />
        </div>

        <p className="mx-auto text-xs text-black sm:max-w-md sm:text-sm 
                      md:max-w-xl md:text-base lg:max-w-2xl lg:text-lg">
          Going Beyond Repairs: Our Value-Added Services
        </p>
      </div>
    </section>
  );
}