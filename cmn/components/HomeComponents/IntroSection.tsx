"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroIntroSection() {
  return (
    <section className="relative w-full bg-black text-white py-28 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* BACKGROUND IMAGE (LOW OPACITY) */}
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
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT WHITE ROUNDED CARD */}
        <div className="relative">
          <div
            className="
              absolute 
              -left-28 md:-left-52 lg:-left-72 xl:-left-80 2xl:-left-96
              top-0 
              bg-white 
              rounded-[280px]
              w-[420px] md:w-[620px] lg:w-[760px] xl:w-[820px] 2xl:w-[880px] 
              h-[420px] md:h-[620px] lg:h-[760px] xl:h-[820px] 2xl:h-[880px]
              overflow-hidden
            "
          ></div>
        </div>

        {/* RIGHT TEXT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Redefining Global Distribution with <br />
            Intelligent Supply Chain Solutions
          </h2>

          <p className="text-gray-300 leading-relaxed">
            CMD Distributors is transforming the distribution landscape through
            data driven intelligence and automation. Leveraging a vast global
            network and cutting edge technology, we’re setting new standards for
            reliability, efficiency, and scalability in product distribution.
          </p>

          <p className="text-gray-300 leading-relaxed">
            We empower industries to be Efficient by Design—building smarter,
            more agile distribution systems that anticipate challenges before
            they arise. With our automated distribution intelligence platform,
            we utilize AI and predictive analytics to optimize sourcing,
            logistics, and delivery operations across continents.
          </p>

          <p className="text-gray-300 leading-relaxed">
            This allows our partners to stay ahead of market demand—faster in
            response, stronger in performance, and deeper in insight.
          </p>

          {/* CTA BUTTON */}
          <Link
            href="#"
            className="
              inline-flex items-center gap-2 px-6 py-3 
              bg-[#F272A8] text-white font-medium rounded-md shadow-lg hover:bg-[#f45c98] transition
            "
          >
            Here’s How →
          </Link>
        </div>
      </div>
    </section>
  );
}
