// components/TestimonialsSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  content: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [isTopGridInView, setIsTopGridInView] = useState(false);
  const [isCardsInView, setIsCardsInView] = useState(false);
  
  const topGridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Smith",
      company: "ABC Corporation",
      position: "Operations Manager",
      content: "CMN Distributors has been an invaluable partner. Their tools and equipment have significantly improved our manufacturing efficiency and reduced downtime by 40%.",
      avatar: "/images/avatars/avatar1.png"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "BuildRight Constructions",
      position: "Project Director",
      content: "The quality of tools and equipment from CMN is exceptional. Their customer service and technical support are outstanding, ensuring our projects stay on schedule.",
      avatar: "/images/avatars/avatar2.png"
    },
    {
      id: 3,
      name: "Mike Chen",
      company: "Tech Solutions Ltd",
      position: "Chief Technology Officer",
      content: "We've been working with CMN for over 5 years. Their products are reliable and their team is extremely professional. They truly understand our industry needs.",
      avatar: "/images/avatars/avatar3.png"
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === topGridRef.current) {
              setIsTopGridInView(true);
            } else if (entry.target === cardsRef.current) {
              setIsCardsInView(true);
            }
          } else {
            // Reset animations when elements leave viewport
            if (entry.target === topGridRef.current) {
              setIsTopGridInView(false);
            } else if (entry.target === cardsRef.current) {
              setIsCardsInView(false);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (topGridRef.current) observer.observe(topGridRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => {
      if (topGridRef.current) observer.unobserve(topGridRef.current);
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f4f4' }} className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Grid - Left: Heading, Right: Description */}
        <div 
          ref={topGridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20 lg:mx-0 xl:mx-[1in]"
        >
          {/* Left Column - Heading */}
          <div className={`transition-all duration-700 ease-out ${
            isTopGridInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider uppercase">
              Testimonials
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
              Why Industry Leaders Trust CMN Distributors as Their Reliable Supply Chain Partner
            </h2>
          </div>

          {/* Right Column - Description */}
          <div className={`flex items-center transition-all duration-700 ease-out delay-200 ${
            isTopGridInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg lg:text-xl">
              Leading businesses and households trust CMN Distributors for reliable and efficient climate control solutions. 
              From commercial facilities to modern homes, we deliver high quality air conditioning systems backed by strong 
              partnerships, technical expertise, and dedicated after sales support ensuring comfort.
            </p>
          </div>
        </div>

        {/* Three Cards Section - Responsive Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:mx-0 xl:mx-[1in]"
        >
          {/* First Card */}
          <div className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 ${
            isCardsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex justify-start mb-4 sm:mb-6">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src={testimonials[0].avatar}
                  alt={testimonials[0].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <p className="text-gray-700 mb-0 leading-relaxed text-sm sm:text-base lg:text-lg text-left">
                "{testimonials[0].content}"
              </p>
            </div>
            
            <div className="text-left border-t border-gray-100 pt-4 sm:pt-6">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">{testimonials[0].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonials[0].position}</p>
              <p className="text-xs sm:text-sm text-[#F272A8] font-medium mt-1">{testimonials[0].company}</p>
            </div>
          </div>

          {/* Second Card */}
          <div className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 delay-100 ${
            isCardsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex justify-start mb-4 sm:mb-6">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src={testimonials[1].avatar}
                  alt={testimonials[1].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <p className="text-gray-700 mb-0 leading-relaxed text-sm sm:text-base lg:text-lg text-left">
                "{testimonials[1].content}"
              </p>
            </div>
            
            <div className="text-left border-t border-gray-100 pt-4 sm:pt-6">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">{testimonials[1].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonials[1].position}</p>
              <p className="text-xs sm:text-sm text-[#F272A8] font-medium mt-1">{testimonials[1].company}</p>
            </div>
          </div>

          {/* Third Card */}
          <div className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 delay-200 ${
            isCardsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex justify-start mb-4 sm:mb-6">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src={testimonials[2].avatar}
                  alt={testimonials[2].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <p className="text-gray-700 mb-0 leading-relaxed text-sm sm:text-base lg:text-lg text-left">
                "{testimonials[2].content}"
              </p>
            </div>
            
            <div className="text-left border-t border-gray-100 pt-4 sm:pt-6">
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">{testimonials[2].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonials[2].position}</p>
              <p className="text-xs sm:text-sm text-[#F272A8] font-medium mt-1">{testimonials[2].company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}