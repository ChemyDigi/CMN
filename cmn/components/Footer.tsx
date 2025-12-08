"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-white pt-16 pb-8 relative">

      {/* Background image */}
      <Image
        src="/images/CMN_Footer_img.png"
        alt=""
        fill
        className="object-cover opacity-90 pointer-events-none"
      />

      {/* MAIN GRID */}
      <div
        className="
          container mx-auto px-10 
          grid grid-cols-1 md:grid-cols-3 gap-12 
          relative z-10
          text-center md:text-left     /* Center on mobile, left on desktop */
        "
      >
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/images/CMN_logo.png"
            alt="Logo"
            width={140}
            height={140}
            className="mb-6"
          />

          <p className="text-sm leading-relaxed text-gray-300 max-w-xs md:max-w-sm">
            CMN Distributors Pvt Ltd “CMN” is a professionally managed company 
            engaged mainly in Distributions of Premium Tools & Equipment for 
            various Industries.
          </p>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="space-y-8 flex flex-col items-center md:items-start">

          {/* SITEMAP */}
          <div className="w-full">
            <h3 className="font-semibold text-sm tracking-wide mb-4">SITEMAP</h3>

            <ul
              className="
                flex flex-wrap justify-center md:justify-start
                gap-x-6 gap-y-2
                text-sm text-gray-300
              "
            >
              <li className="hover:text-[#F272A8]"><Link href="/">Home</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/about">About</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/products">Products</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/services">Services</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/clients">Clients</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="w-full flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-sm tracking-wide mb-2">
              SUBSCRIBE NEWSLETTER
            </h3>

            <p className="text-sm text-gray-400 mb-4 text-center md:text-left">
              Get all the latest information on Events, Sales and Offers. <br />
              Sign up for newsletter today.
            </p>

            <div className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full border border-gray-500 bg-transparent 
                  px-4 py-2 text-sm outline-none text-center md:text-left
                "
              />
              <button className="bg-[#F272A8] text-white px-6 py-2 text-sm font-semibold hover:bg-[#d6488d] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 text-sm flex flex-col items-center md:items-start">

          <h3 className="font-semibold tracking-wide">CONTACT INFO</h3>

          <div>
            <p className="font-semibold text-xs">ADDRESS</p>
            <p className="text-gray-400">
              362, Upper Paya Lebar Road <br />
              #05-07 Da Jin Factory Building,<br />
              Singapore, 534963
            </p>
          </div>

          <div>
            <p className="font-semibold text-xs">PHONE</p>
            <p className="text-gray-400">+6596914182</p>
          </div>

          <div>
            <p className="font-semibold text-xs">EMAIL</p>
            <p className="text-gray-400">contact@cmndistributors.com</p>
          </div>

          <div>
            <p className="font-semibold text-xs">WORKING DAYS / HOURS</p>
            <p className="text-gray-400">Mon - Fri / 9:00 AM - 5:30 PM</p>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 relative z-10">
        © Copyright 2025 | CMN Distributors | All Rights Reserved <br />
        Design by{" "}
        <Link
          href="https://alchemy.lk/"
          className="hover:text-[#F272A8]"
          target="blank"
        >
          Alchemy
        </Link>
      </div>

      {/* Social Icons */}
      <div className="mt-4 flex justify-center gap-6 relative z-10">
        <Link
          href="https://www.instagram.com/cmndistributors/?hl=en"
          aria-label="Instagram"
          target="blank"
          className="hover:text-[#F272A8]"
        >
          <i className="ri-instagram-line text-lg"></i>
        </Link>

        <Link
          href="https://www.facebook.com/cmndistributorssl/"
          aria-label="Facebook"
          target="blank"
          className="hover:text-[#B32E2E]"
        >
          <i className="ri-facebook-circle-line text-lg"></i>
        </Link>
      </div>

    </footer>
  );
}
// added subscription pop up