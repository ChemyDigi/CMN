// components/PartnersSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import client1 from '../public/images/clients/client1.png'
import client2 from '../public/images/clients/client2.png'
import client3 from '../public/images/clients/client3.png'
import client4 from '../public/images/clients/client4.png'
import client5 from '../public/images/clients/client5.png'
import client6 from '../public/images/clients/client6.png'
import client7 from '../public/images/clients/client7.png'
import client8 from '../public/images/clients/client8.png'
import client9 from '../public/images/clients/client9.png'
import client10 from '../public/images/clients/client10.png'

interface Client {
  id: number;
  name: string;
  logo: any;
  industry: string;
}

export default function PartnersSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [animationKey, setAnimationKey] = useState(0);

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
      return [...baseClients, ...baseClients, ...baseClients, ...baseClients, ...baseClients];
    } else if (baseClients.length <= 5) {
      return [...baseClients, ...baseClients, ...baseClients];
    } else {
      return [...baseClients, ...baseClients];
    }
  };

  const duplicatedClients = getDuplicatedClients();

  // Reset animation when category changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeCategory]);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mx-[1in]">
          <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Clients We've partnered with
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We've had the privilege of collaborating with renowned brands across multiple industries.
            Below is a snapshot of some of the partners who placed their trust in our expertise.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 lg:mx-[1in]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Scrolling Clients Carousel */}
        <div className="relative overflow-hidden lg:mx-[1in]">
          <div 
            key={animationKey}
            className="flex animate-scroll scroll-pause"
            style={{ 
              animationDuration: `${30 * (filteredClients.length / clients.length)}s`
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}-${activeCategory}`}
                className="flex-shrink-0 px-6 transition-all duration-300 hover:scale-110 cursor-default"
                style={{ 
                  minWidth: '200px',
                  width: '200px'
                }}
              >
                <div className="flex items-center justify-center h-32">
                  <div className="relative w-full h-24 transition-transform duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain transition-all duration-300"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          {activeCategory === "all" 
            ? "Showing all 10 clients" 
            : `Showing ${filteredClients.length} clients in ${categories.find(c => c.id === activeCategory)?.name} category`
          }
        </div>
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
        
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: ${20 * (filteredClients.length / clients.length)}s !important;
          }
        }
      `}</style>
    </div>
  );
}