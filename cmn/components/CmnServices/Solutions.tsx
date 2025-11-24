"use client";

import Image from "next/image";
import image1 from "../../public/images/cmnServices/1.webp"

export default function BusinessSolutions() {
  return (
    <section className="w-full bg-white text-[#3a3a3a] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-[52px] leading-[1.1] font-light md:text-[42px]">
            Business <br /> solutions for
          </h1>

          <h2 className="text-[52px] leading-[1.1] font-light md:text-[52px] mt-2 text-[#f271a8]">
            Manufacturing <br /> Operations
          </h2>

          <p className="mt-6 max-w-xl leading-relaxed text-black">
            For Virya Energy, the energy transition must be adapted to each
            reality. Our “fit for purpose” approach reflects our commitment
            to developing customized solutions that exactly meet everyone’s
            needs. By simplifying access to renewable energy, we are building
            a path towards a sustainable future.
          </p>

          <button className="mt-8 px-8 py-3 bg-[#D3D3D3] text-[#3a3a3a] rounded-full hover:bg-black]transition">
            Learn more
          </button>
        </div>

        {/* RIGHT IMAGE + FLOATING LABELS */}
        <div className="relative flex justify-center">

          {/* MAIN IMAGE */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={image1}
              alt="Manufacturing Operator"
              width={650}
              height={650}
              className="object-cover"
            />
          </div>

          {/* FLOATING TAGS */}
          <span className="absolute top-6 left-[-10px] px-5 py-2 bg-[#D3D3D3] rounded-xl text-sm shadow">
            Energy Cost Reduction
          </span>

          <span className="absolute top-[80px] right-[-20px] px-5 py-2 bg-[#D3D3D3] rounded-xl text-sm shadow">
            Regulatory Compliance
          </span>

          <span className="absolute bottom-[130px] left-[-10px] px-5 py-2 bg-[#D3D3D3] rounded-xl text-sm shadow">
            Energy Resilience
          </span>

          <span className="absolute bottom-[40px] right-[-20px] px-5 py-2 bg-[#D3D3D3] rounded-xl text-sm shadow">
            Energy Independence
          </span>
        </div>

      </div>
    </section>
  );
}
