"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-white pt-16 pb-8 relative">
      {/* Decorative background dots image (optional) */}
      {/* Place a pattern image inside public/images/footer-bg.png */}

      <Image src="/images/CMN_Footer_img.png" alt="" fill className="object-cover opacity-90 pointer-events-none" />
      <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        
        {/* LEFT COLUMN */}
        <div>
          <Image
            src="/images/CMN_logo.png"
            alt="Logo"
            width={140}
            height={140}
            className="mb-6"
          />
          <p className="text-sm leading-relaxed text-gray-300 max-w-xs">
            CMN Distributors Pvt Ltd “CMN” is a professionally managed company 
            engaged mainly in Distributions of Premium Tools & Equipment for 
            various Industries.
          </p>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="space-y-8">
          {/* SITEMAP */}
          <div>
            <h3 className="font-semibold text-sm tracking-wide mb-4">SITEMAP</h3>                 
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 ">
              <li className="hover:text-[#F272A8]"><Link href="/">Home</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/about">About</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/products">Products</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/services">Services</Link></li>
              <li className="hover:text-[#F272A8]"><Link href="/clients">Clients</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="font-semibold text-sm tracking-wide mb-2">SUBSCRIBE NEWSLETTER</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get all the latest information on Events, Sales and Offers. <br />
              Sign up for newsletter today.
            </p>

            <div className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-500 bg-transparent px-4 py-2 text-sm outline-none"
              />
              <button className="bg-[#F272A8] text-white px-6 py-2 text-sm font-semibold hover:bg-[#d6488d] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 text-sm">
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
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © Copyright 2025 | CMN Distributors | All Rights Reserved <br />
        Design by <Link href="https://alchemy.lk/" className="hover:text-[#F272A8]" target="blank">Alchemy</Link>
      </div>

      {/* Social Icons */}
      <div className="mt-4 flex justify-center gap-6">
        <Link href="https://www.instagram.com/freedemuae/?hl=en" aria-label="Instagram" className="hover:text-[#F272A8] target:blank" target="blank">
              <i className="ri-instagram-line text-lg"></i>
        </Link>
        <Link href="https://www.facebook.com/cmndistributorssl/" aria-label="Facebook" className="hover:text-[#B32E2E] target:blank" target="blank">
            <i className="ri-facebook-circle-line text-lg"></i>
        </Link>
      </div>           
    </footer>
  );
}
 