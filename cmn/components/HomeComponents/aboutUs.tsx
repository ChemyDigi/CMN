"use client";

import Image from "next/image";
import React from "react";



interface ValueItem {
  icon: string;
  title: string;
  desc: string;
}

export default function AboutUsSection(): React.ReactElement {
 

  const ourValues: ValueItem[] = [
    {
      icon: "/images/AboutUS/Quality.png",
      title: "QUALITY FIRST",
      desc: "Uncompromising quality in every solution we deliver",
    },
    {
      icon: "/images/AboutUS/Innovation.png",
      title: "INNOVATION",
      desc: "Constantly evolving with cutting-edge technologies",
    },
    {
      icon: "/images/AboutUS/Integrity.png",
      title: "INTEGRITY",
      desc: "Honest and transparent in all our dealings",
    },
    {
      icon: "/images/AboutUS/Collaboration.png",
      title: "COLLABORATION",
      desc: "Working together to achieve exceptional results",
    },
  ];

  return (
    <section className="w-full bg-white text-gray-900 py-24 px-6 md:px-16 lg:px-32">
      
      {/* Hero Title Section */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <p className="text-sm mb-3 text-[#F272A8] font-medium tracking-wider">ABOUT OUR COMPANY</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
          Building Trust Through <span className="text-[#F272A8]">Excellence</span> <br />& Innovation
        </h1>
        <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
          For over a decade, we have been at the forefront of retail and distribution solutions, 
          delivering exceptional service across Singapore, Sri Lanka, and India. Our dedicated 
          team of experts ensures quality and reliability in every project.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto mb-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded in 2010, we started as a small team with a big vision: to revolutionize 
            the retail distribution industry through innovative solutions and unparalleled service.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Today, we proudly serve clients across three countries, leveraging our extensive 
            network and technical expertise to deliver cost-efficient and reliable solutions.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our journey is marked by continuous growth, learning, and an unwavering commitment 
            to our clients' success.
          </p>
        </div>
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/AboutUS/office.jpg"
            alt="Our Office"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="text-center mb-16">
          <p className="text-sm mb-3 text-[#F272A8] font-medium tracking-wider">OUR VALUES</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            The Principles That <span className="text-[#F272A8]">Guide Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ourValues.map((item: ValueItem, index: number) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group cursor-pointer transition-all duration-500 ease-in-out p-8 rounded-2xl bg-gray-50 hover:bg-[#F272A8] hover:shadow-2xl hover:shadow-[#F272A8]/20 border border-gray-100"
            >
              {/* ICON CIRCLE */}
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-gray-300 mb-6 group-hover:border-white group-hover:bg-white group-hover:scale-110 transition-all duration-500 ease-in-out">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="object-contain group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-500 ease-in-out"
                />
              </div>

              <h3 className="text-gray-800 text-lg font-bold tracking-wide mb-3 group-hover:text-white transition-all duration-300 ease-in-out">
                {item.title}
              </h3>

              <p className="text-gray-600 text-base group-hover:text-white transition-all duration-300 ease-in-out">
                {item.desc}
              </p>

              <div className="w-0 group-hover:w-16 h-1 bg-white mt-6 transition-all duration-500 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="text-center mb-16">
          <p className="text-sm mb-3 text-[#F272A8] font-medium tracking-wider">MEET OUR TEAM</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            The Experts Behind <span className="text-[#F272A8]">Your Success</span>
          </h2>
        </div>

       
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        <div className="group cursor-pointer transition-all duration-300 ease-in-out p-6 rounded-2xl bg-gray-50 hover:bg-[#F272A8] hover:shadow-2xl">
          <div className="text-4xl md:text-5xl font-bold text-[#F272A8] group-hover:text-white transition-all duration-300 ease-in-out">10+</div>
          <div className="text-gray-600 text-lg font-medium group-hover:text-white transition-all duration-300 ease-in-out">Years Experience</div>
        </div>
        <div className="group cursor-pointer transition-all duration-300 ease-in-out p-6 rounded-2xl bg-gray-50 hover:bg-[#F272A8] hover:shadow-2xl">
          <div className="text-4xl md:text-5xl font-bold text-[#F272A8] group-hover:text-white transition-all duration-300 ease-in-out">500+</div>
          <div className="text-gray-600 text-lg font-medium group-hover:text-white transition-all duration-300 ease-in-out">Clients Served</div>
        </div>
        <div className="group cursor-pointer transition-all duration-300 ease-in-out p-6 rounded-2xl bg-gray-50 hover:bg-[#F272A8] hover:shadow-2xl">
          <div className="text-4xl md:text-5xl font-bold text-[#F272A8] group-hover:text-white transition-all duration-300 ease-in-out">3</div>
          <div className="text-gray-600 text-lg font-medium group-hover:text-white transition-all duration-300 ease-in-out">Countries</div>
        </div>
        <div className="group cursor-pointer transition-all duration-300 ease-in-out p-6 rounded-2xl bg-gray-50 hover:bg-[#F272A8] hover:shadow-2xl">
          <div className="text-4xl md:text-5xl font-bold text-[#F272A8] group-hover:text-white transition-all duration-300 ease-in-out">50+</div>
          <div className="text-gray-600 text-lg font-medium group-hover:text-white transition-all duration-300 ease-in-out">Team Members</div>
        </div>
      </div>
    </section>
  );
}