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
    <div style={{ backgroundColor: '#f4f4f4' }} className="py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Grid - Centered for all screen sizes */}
        <div 
          ref={topGridRef}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 text-center mx-auto max-w-4xl"
        >
          {/* Heading Section - Centered */}
          <div className={`transition-all duration-700 ease-out ${
            isTopGridInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-500 text-xs sm:text-sm font-medium mb-2 sm:mb-3 tracking-wider uppercase">
              Testimonials
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
              Why Industry Leaders Trust CMN Distributors as Their Reliable Supply Chain Partner
            </h2>
          </div>

          {/* Description - Centered */}
          <div className={`transition-all duration-700 ease-out delay-200 ${
            isTopGridInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl mx-auto">
              Leading businesses and households trust CMN Distributors for reliable and efficient climate control solutions. 
              From commercial facilities to modern homes, we deliver high quality air conditioning systems backed by strong 
              partnerships, technical expertise, and dedicated after sales support ensuring comfort.
            </p>
          </div>
        </div>

        {/* Three Cards Section - Left-aligned on laptop/desktop, centered on mobile/tablet */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto lg:mx-0 max-w-6xl"
        >
          {/* First Card */}
          <div className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 text-center lg:text-left ${
            isCardsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex justify-center lg:justify-start mb-3 sm:mb-4 md:mb-6">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src={testimonials[0].avatar}
                  alt={testimonials[0].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                />
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4 md:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-300 mb-2 sm:mb-3 mx-auto lg:mx-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <p className="text-gray-700 mb-0 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg text-center lg:text-left">
                "{testimonials[0].content}"
              </p>
            </div>
            
            <div className="text-center lg:text-left border-t border-gray-100 pt-3 sm:pt-4 md:pt-6">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl">{testimonials[0].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonials[0].position}</p>
              <p className="text-xs sm:text-sm text-[#F272A8] font-medium mt-1">{testimonials[0].company}</p>
            </div>
          </div>

          {/* Second Card */}
          <div className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 text-center lg:text-left delay-100 ${
            isCardsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex justify-center lg:justify-start mb-3 sm:mb-4 md:mb-6">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src={testimonials[1].avatar}
                  alt={testimonials[1].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                />
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4 md:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-300 mb-2 sm:mb-3 mx-auto lg:mx-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <p className="text-gray-700 mb-0 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg text-center lg:text-left">
                "{testimonials[1].content}"
              </p>
            </div>
            
            <div className="text-center lg:text-left border-t border-gray-100 pt-3 sm:pt-4 md:pt-6">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl">{testimonials[1].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonials[1].position}</p>
              <p className="text-xs sm:text-sm text-[#F272A8] font-medium mt-1">{testimonials[1].company}</p>
            </div>
          </div>

          {/* Third Card */}
          <div className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-500 ease-out transform hover:-translate-y-1 text-center lg:text-left delay-200 ${
            isCardsInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex justify-center lg:justify-start mb-3 sm:mb-4 md:mb-6">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src={testimonials[2].avatar}
                  alt={testimonials[2].name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                />
              </div>
            </div>
            
            <div className="mb-3 sm:mb-4 md:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-gray-300 mb-2 sm:mb-3 mx-auto lg:mx-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <p className="text-gray-700 mb-0 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg text-center lg:text-left">
                "{testimonials[2].content}"
              </p>
            </div>
            
            <div className="text-center lg:text-left border-t border-gray-100 pt-3 sm:pt-4 md:pt-6">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl">{testimonials[2].name}</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonials[2].position}</p>
              <p className="text-xs sm:text-sm text-[#F272A8] font-medium mt-1">{testimonials[2].company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}