"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

export default function AboutUsSection(): React.ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white text-gray-900 py-24 px-6 md:px-16 lg:px-32">
      
      {/* Hero Title Section */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <p className="text-sm mb-3 text-[#F272A8] font-medium tracking-wider animate-on-scroll opacity-0 translate-y-4 transition-all duration-500">
          ABOUT OUR COMPANY
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
          <span className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 delay-200 inline-block">
            Building Trust Through{" "}
          </span>
          <span className="text-[#F272A8] animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 delay-300 inline-block">
            Excellence
          </span>
          <span className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 delay-400 inline-block">
            {" "}& Innovation
          </span>
        </h1>
      </div>

      {/* Our Story Section */}
<div className="max-w-7xl mx-auto my-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

  {/* Left Section */}
  <div className="space-y-6">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Our Story
    </h2>

    <p className="text-gray-600 text-lg leading-relaxed">
      Founded in 2004, CMN Distributors Pvt Ltd started as a professionally managed company
      engaged in distribution of premium tools & equipment for various industries, beginning
      with HVAC & R sector partnerships.
    </p>

    <p className="text-gray-600 text-lg leading-relaxed">
      Today, we proudly serve key sectors including Aviation, Nuclear Power, Defence Research,
      Oil & Gas, and Heavy Engineering Industry across three countries, leveraging our extensive
      network and technical expertise.
    </p>

    <p className="text-gray-600 text-lg leading-relaxed">
      Our journey is marked by strategic expansions, valuable partnerships, and an unwavering
      commitment to delivering energy-saving, productivity-enhancing, and environment-friendly
      solutions.
    </p>

    {/* CEO Signature */}
    <div className="mt-8 pt-6 border-t border-gray-200">
      <Image
        src="/images/AboutUS/sign.png"
        alt="CEO Signature"
        width={120}
        height={60}
        className="object-contain mb-2"
      />
      <p className="font-semibold text-gray-900">Richard Donovan</p>
      <p className="text-sm text-gray-600">CEO & Founder</p>
    </div>
  </div>

  {/* Right Section: Image */}
  <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
    <Image
      src="/images/aboutHome.jpg"
      alt="CMN Distributors Office"
      fill
      className="object-cover"
    />
  </div>
</div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="text-center mb-16">
          <p className="text-sm mb-3 text-[#F272A8] font-medium tracking-wider animate-on-scroll opacity-0 scale-90 transition-all duration-500">
            MEET OUR TEAM
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 delay-200 inline-block">
              The Experts Behind{" "}
            </span>
            <span className="text-[#F272A8] animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 delay-300 inline-block">
              Your Success
            </span>
          </h2>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          { number: "20+", text: "Years Experience" },
          { number: "1000+", text: "Clients Served" },
          { number: "3", text: "Countries" },
          { number: "50+", text: "Team Members" }
        ].map((stat, index) => (
          <div 
            key={index}
            className="group cursor-pointer transition-all duration-300 ease-in-out p-6 rounded-2xl bg-gray-50 hover:bg-[#F272A8] hover:shadow-2xl animate-on-scroll opacity-0 scale-95 transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-4xl md:text-5xl font-bold text-[#F272A8] group-hover:text-white transition-all duration-300 ease-in-out">
              {stat.number}
            </div>
            <div className="text-gray-600 text-lg font-medium group-hover:text-white transition-all duration-300 ease-in-out">
              {stat.text}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-on-scroll {
          opacity: 0;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* Typewriter effect for main title */
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #F272A8;
          white-space: nowrap;
          animation: typewriter 3s steps(40) 1s both;
        }
      `}</style>
    </section>
  );
}