"use client";

import Image from "next/image";
import toshibalogo from "../../public/images/Home/toshiba.png";
import verifyBadge from "../../public/images/Home/verified.png";

export default function AuthorizedCarrierDistributor() {
  return (
    <section className="w-full bg-[#f7f7f7] py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT SIDE */}
        <div className="flex items-start gap-6 max-w-xl">

          {/* ICON - height auto matches the text block */}
          <div className="flex-shrink-0 flex items-start">
            <Image
              src={verifyBadge}
              alt="Verified Icon"
              width={90}        // Adjust this value to control icon size
              height={90}
              className="object-contain h-full"
            />
          </div>

          {/* TEXT BLOCK */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
              Authorized Carrier <br /> Distributor
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              CMN Distributors: Authorized Carrier distributor offering certified
              HVAC solutions and expert support.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE – Logo */}
        <div className="flex justify-center">
          <Image
            src={toshibalogo}
            alt="Carrier Logo"
            width={420}
            height={200}
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}
