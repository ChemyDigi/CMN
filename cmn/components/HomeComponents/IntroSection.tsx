"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroIntroSection() {
  return (
    <section className="relative w-full bg-black text-white py-28 px-6 md:px-16 lg:px-24 overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/Home/HomeIntro.jpg"
          alt="Background texture"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENT WRAPPER */}
      <div
        className="
          relative z-10 max-w-7xl mx-auto 
          grid grid-cols-1 lg:grid-cols-2 gap-16
          items-center 
          text-center lg:text-left      /* Center content on mobile */
        "
      >
        {/* LEFT DECORATIVE AREA – HIDE ON MOBILE/TABLET */}
        <div className="relative hidden lg:block">
          {/* Decorative Image – Desktop Only */}
          <Image
            src="/images/Home/Tools.png"
            alt="Top Decorative Image"
            width={600}
            height={600}
            className="
              absolute 
              -top-10
              -left-30
              z-20
              drop-shadow-xl
            "
          />

          {/* White Decorative Shape – Desktop Only */}
          <div
            className="
              absolute
              -left-28 md:-left-52 lg:-left-72 xl:-left-80 2xl:-left-96
              top-0
              bg-white
              rounded-[280px]
              w-[360px] md:w-[520px] lg:w-[650px] xl:w-[700px] 2xl:w-[760px]
              h-[420px] md:h-[620px] lg:h-[760px] xl:h-[820px] 2xl:h-[880px]
              overflow-hidden
              z-10
            "
          ></div>
        </div>

        {/* RIGHT CONTENT – CENTERED ON MOBILE */}
        <div className="space-y-6 flex flex-col items-center lg:items-start">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Redefining Global Distribution with <br />
            Intelligent Supply Chain Solutions
          </h2>

          <p className="text-gray-300 leading-relaxed max-w-xl">
            CMD Distributors is transforming the distribution landscape through
            data driven intelligence and automation. Leveraging a vast global
            network and cutting-edge technology, we’re setting new standards for
            reliability, efficiency, and scalability.
          </p>

          <p className="text-gray-300 leading-relaxed max-w-xl">
            We empower industries to be Efficient by Design—building smarter,
            more agile distribution systems that anticipate challenges before
            they arise. Using AI and predictive analytics, we optimize sourcing,
            logistics, and delivery operations across continents.
          </p>

          <p className="text-gray-300 leading-relaxed max-w-xl">
            This allows our partners to stay ahead of market demand—faster in
            response, stronger in performance, and deeper in insight.
          </p>

          {/* CTA BUTTON */}
          <Link
            href="#"
            className="
              inline-flex items-center gap-2 px-6 py-3 
              bg-[#F272A8] text-white font-medium rounded-md shadow-lg 
              hover:bg-[#f45c98] transition
            "
          >
            Here’s How
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
