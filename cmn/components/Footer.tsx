"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubscriptionPopup from "../components/SubscriptionPopUp"; // Adjust path as needed

interface SubscriptionData {
  username: string;
  email: string;
  phone: string;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribeClick = () => {
    if (email.trim() && validateEmail(email)) {
      setShowPopup(true);
    } else {
      alert("Please enter a valid email address first.");
    }
  };

  const handleSubmitSubscription = async (data: SubscriptionData) => {
    // Here you would typically send the data to your backend/API
    console.log("Subscription data:", data);
    
    // Example API call:
    // try {
    //   const response = await fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   
    //   if (!response.ok) throw new Error('Subscription failed');
    //   
    //   // Success handling
    //   alert('Subscription successful! Thank you.');
    //   setShowPopup(false);
    //   setEmail(''); // Clear the email input
    // } catch (error) {
    //   alert('Subscription failed. Please try again.');
    // }
    
    // For now, just simulate success:
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    alert('Subscription successful! Thank you.');
    setShowPopup(false);
    setEmail(''); // Clear the email input
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <footer className="bg-[#202020] text-white pt-16 pb-6 relative">
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
            text-center md:text-left
          "
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/CMNLogo.png"
              alt="Logo"
              width={140}
              height={140}
              className="mb-6"
            />

            <p className="text-sm leading-relaxed text-gray-300 max-w-xs md:max-w-sm">
              CMN Distributors Pvt Ltd "CMN" is a professionally managed company 
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
                <li className="hover:text-[#F272A8]"><Link href="/clients">Clients</Link></li>
                <li className="hover:text-[#F272A8]"><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* SOCIAL MEDIA - UPDATED */}
            <div className="w-full">
              <h3 className="font-semibold text-sm tracking-wide mb-4">
                SOCIAL MEDIA
              </h3>
              
              <ul
                className="
                  flex flex-wrap justify-center md:justify-start
                  gap-x-6 gap-y-2
                  text-gray-300
                "
              >
                <li className="hover:text-[#F272A8] transition-colors">
                  <Link
                    href="https://www.instagram.com/cmndistributors/?hl=en"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <i className="ri-instagram-line text-2xl"></i>
                    {/* <span className="text-sm">Instagram</span> */}
                  </Link>
                </li>
                
                <li className="hover:text-[#F272A8] transition-colors">
                  <Link
                    href="https://www.facebook.com/cmndistributorssl/"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <i className="ri-facebook-circle-line text-2xl"></i>
                    {/* <span className="text-sm">Facebook</span> */}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 text-sm flex flex-col items-center md:items-start">
            <h3 className="font-semibold tracking-wide">CONTACT INFO</h3>
            <div>
              <p className="font-semibold text-xs">ADDRESS</p>
              <p className="text-gray-400">
                No 145, Lake Road <br />
                Boralasgamuwa,<br />
                Sri Lanka.
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs">PHONE</p>
              <p className="text-gray-400">+94 76 359 7171</p>
            </div>
            <div>
              <p className="font-semibold text-xs">EMAIL</p>
              <p className="text-gray-400">hasitha@cmndistributors.com</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-2 text-center text-sm text-gray-500 relative z-10">
          © Copyright 2025 | CMN Distributors | All Rights Reserved <br />
          Design by{" "}
          <Link
            href="https://alchemy.lk/"
            className="hover:text-[#F272A8]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alchemy Solutions
          </Link>
        </div>
      </footer>

      {/* Subscription Popup
      {showPopup && (
        <SubscriptionPopup
          initialEmail={email}
          onClose={() => setShowPopup(false)}
          onSubmit={handleSubmitSubscription}
        />
      )} */}
    </>
  );
}