// components/PartnersSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import client1 from '@/public/images/clients/client1.png'
import client2 from '@/public/images/clients/client2.png'
import client3 from '@/public/images/clients/client3.png'
import client4 from '@/public/images/clients/client4.png'
import client5 from '@/public/images/clients/client5.png'
import client6 from '@/public/images/clients/client6.png'
import client7 from '@/public/images/clients/client7.png'
import client8 from '@/public/images/clients/client8.png'
import client9 from '@/public/images/clients/client9.png'
import client10 from '@/public/images/clients/client10.png'

interface Client {
  id: number;
  name: string;
  logo: any;
  industry: string;
}

export default function PartnersSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [animationKey, setAnimationKey] = useState(0);
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const [isCarouselInView, setIsCarouselInView] = useState(false);
  const [isInfoInView, setIsInfoInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const clients: Client[] = [
    {
      id: 1,
      name: "ABC Corporation",
      logo: client1,
      industry: "manufacturing"
    },
    {
      id: 2,
      name: "XYZ Industries",
      logo: client2,
      industry: "construction"
    },
    {
      id: 3,
      name: "Tech Solutions Ltd",
      logo: client3,
      industry: "technology"
    },
    {
      id: 4,
      name: "BuildRight Constructions",
      logo: client4,
      industry: "construction"
    },
    {
      id: 5,
      name: "Modern Manufacturing Co",
      logo: client5,
      industry: "manufacturing"
    },
    {
      id: 6,
      name: "Innovate Tech",
      logo: client6,
      industry: "technology"
    },
    {
      id: 7,
      name: "Global Builders",
      logo: client7,
      industry: "construction"
    },
    {
      id: 8,
      name: "Precision Tools Inc",
      logo: client8,
      industry: "manufacturing"
    },
    {
      id: 9,
      name: "Future Tech Systems",
      logo: client9,
      industry: "technology"
    },
    {
      id: 10,
      name: "Urban Constructors",
      logo: client10,
      industry: "construction"
    },
  ];

  const categories = [
    { id: "all", name: "All" },
    { id: "manufacturing", name: "Manufacturing" },
    { id: "construction", name: "Construction" },
    { id: "technology", name: "Technology" },
  ];

  const filteredClients = activeCategory === "all" 
    ? clients 
    : clients.filter(client => client.industry === activeCategory);

  // For categories with fewer clients, duplicate more times
  const getDuplicatedClients = () => {
    const baseClients = filteredClients;
    
    if (baseClients.length <= 3) {
      return [...baseClients, ...baseClients, ...baseClients, ...baseClients, ...baseClients, ...baseClients];
    } else if (baseClients.length <= 5) {
      return [...baseClients, ...baseClients, ...baseClients, ...baseClients];
    } else {
      return [...baseClients, ...baseClients, ...baseClients];
    }
  };

  const duplicatedClients = getDuplicatedClients();

  // Reset animation when category changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeCategory]);

  // Check screen size for responsive adjustments
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setIsHeaderInView(true);
            } else if (entry.target === carouselRef.current) {
              setIsCarouselInView(true);
            } else if (entry.target === infoRef.current) {
              setIsInfoInView(true);
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
    if (carouselRef.current) observer.observe(carouselRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (carouselRef.current) observer.unobserve(carouselRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);

  // Calculate animation duration based on screen size and client count
  const getAnimationDuration = () => {
    const baseDuration = 30 * (filteredClients.length / clients.length);
    
    if (isMobile) {
      return baseDuration * 0.7; // Faster on mobile
    } else if (isTablet) {
      return baseDuration * 0.85; // Slightly faster on tablet
    }
    
    return baseDuration;
  };

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
            Trusted by Industry Leaders
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Clients We've partnered with
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            We've had the privilege of collaborating with renowned brands across multiple industries.
            Below is a snapshot of some of the partners who placed their trust in our expertise.
          </p>
        </div>

        {/* Filter Buttons */}
        <div 
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-12 lg:mb-16 transition-all duration-700 delay-300 ${
            isHeaderInView 
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

        {/* Scrolling Clients Carousel */}
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
        >
          <div 
            key={animationKey}
            className={`flex animate-scroll scroll-pause transition-all duration-1000 delay-500 ${
              isCarouselInView 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{ 
              animationDuration: `${getAnimationDuration()}s`
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}-${activeCategory}`}
                className="flex-shrink-0 px-3 sm:px-4 md:px-6 transition-all duration-300 hover:scale-105 cursor-default"
                style={{ 
                  minWidth: isMobile ? '140px' : isTablet ? '160px' : '200px',
                  width: isMobile ? '140px' : isTablet ? '160px' : '200px'
                }}
              >
                <div className="flex items-center justify-center h-20 sm:h-24 md:h-28 lg:h-32">
                  <div className="relative w-full h-16 sm:h-20 md:h-24 transition-transform duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain transition-all duration-300 hover:filter hover:brightness-110"
                      sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 200px"
                      priority={index < 6} // Prioritize loading first few images
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for better scrolling experience */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Category info */}
        <div 
          ref={infoRef}
          className={`text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 transition-all duration-700 delay-700 ${
            isInfoInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {activeCategory === "all" 
            ? `Showing all ${clients.length} clients` 
            : `Showing ${filteredClients.length} clients in ${categories.find(c => c.id === activeCategory)?.name} category`
          }
        </div>

        {/* Mobile touch instructions */}
        {isMobile && (
          <div className="text-center mt-4 text-xs text-gray-400">
            Touch and hold to pause scroll
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / ${duplicatedClients.length / filteredClients.length}));
          }
        }
        
        .animate-scroll {
          animation: scroll linear infinite;
          display: flex;
          width: max-content;
        }
        
        .scroll-pause:hover {
          animation-play-state: paused;
        }

        /* Mobile touch support */
        @media (max-width: 768px) {
          .animate-scroll {
            animation-play-state: running;
          }
          
          .animate-scroll:active {
            animation-play-state: paused;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }

        /* Large desktop screens */
        @media (min-width: 1536px) {
          .container {
            max-width: 1280px;
          }
        }

        /* Extra large screens */
        @media (min-width: 1920px) {
          .container {
            max-width: 1536px;
          }
        }
      `}</style>
    </div>
  );
}