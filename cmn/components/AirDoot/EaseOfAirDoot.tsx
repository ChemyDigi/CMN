"use client";

import { useState, useEffect, useRef } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: "digital" | "promise";
}

export default function EaseOfServiceSection() {
  const [activeCategory, setActiveCategory] = useState<"digital" | "promise">("digital");
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const [isButtonsInView, setIsButtonsInView] = useState(false);
  const [isContentInView, setIsContentInView] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Complete Service History",
      description: "Full service records with dates, details, and technician reports",
      category: "digital"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Issue Resolution Tracking",
      description: "Past complaints and their complete resolution history",
      category: "digital"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Parts & Warranty Records",
      description: "Part replacement history and warranty information with expiry dates",
      category: "digital"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      ),
      title: "One-Platform Solution",
      description: "From booking to payment, everything happens in one place",
      category: "promise"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Pricing",
      description: "Clear, upfront estimates before any work begins",
      category: "promise"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Verified Professionals",
      description: "Background-verified, skilled, and certified technicians",
      category: "promise"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#F272A8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "24/7 Booking",
      description: "Lodge complaints or book services anytime, anywhere",
      category: "promise"
    }
  ];

  const categories = [
    { id: "digital" as const, name: "Digital Lifeline" },
    { id: "promise" as const, name: "Our Promise" },
  ];

  const filteredFeatures = features.filter(feature => 
    activeCategory === "digital" ? feature.category === "digital" : feature.category === "promise"
  );

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setIsHeaderInView(true);
            } else if (entry.target === buttonsRef.current) {
              setIsButtonsInView(true);
            } else if (entry.target === contentRef.current) {
              setIsContentInView(true);
            }
          } 
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (buttonsRef.current) observer.observe(buttonsRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (buttonsRef.current) observer.unobserve(buttonsRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
            isHeaderInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider">
            Digital Advantage
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Total Control at Your Fingertips
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Experience seamless HVAC-R service management with AirDoot's comprehensive digital platform
            designed for modern convenience and unmatched ease of use.
          </p>
        </div>

        {/* Filter Buttons */}
        <div 
          ref={buttonsRef}
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 lg:mb-16 transition-all duration-700 delay-300 ${
            isButtonsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-black text-white shadow-lg transform scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div 
          ref={contentRef}
          className={`transition-all duration-700 delay-500 ${
            isContentInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredFeatures.map((feature, index) => (
              <div
                key={`${feature.category}-${index}`}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 text-center group cursor-pointer"
              >
                {/* Icon Container - White circle with pink icon */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 border-2 border-gray-100 group-hover:border-[#F272A8]">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="w-0 group-hover:w-8 h-0.5 bg-[#F272A8] mt-4 mx-auto transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Info */}
        <div className={`text-center mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 transition-all duration-700 delay-700 ${
          isContentInView 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          {activeCategory === "digital" 
            ? "Your machine's complete digital history and service records"
            : "Our commitment to providing unmatched service experience"
          }
        </div>
      </div>
    </div>
  );
}