// components/TestimonialsSection.tsx
"use client";

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

  return (
    <div style={{ backgroundColor: '#f4f4f4' }} className="py-20">
      <div className="container mx-auto px-10">
        {/* Top Grid - Left: Heading, Right: Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 lg:mx-[1in]">
          {/* Left Column - Heading */}
          <div>
            <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Why Industry Leaders Trust CMN Distributors as Their Reliable Supply Chain Partner
            </h2>
          </div>

          {/* Right Column - Description */}
          <div className="flex items-center">
            <p className="text-gray-600 leading-relaxed text-lg">
              Leading businesses and households trust CMN Distributors for reliable and efficient climate control solutions. 
              From commercial facilities to modern homes, we deliver high quality air conditioning systems backed by strong 
              partnerships, technical expertise, and dedicated after sales support ensuring comfort.
            </p>
          </div>
        </div>

        {/* Three Cards Section - Left, Middle, Right Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:mx-[1in]">
          {/* First Card - Left Aligned */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
            <div className="flex justify-start mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[0].avatar}
                  alt={testimonials[0].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed text-left">
              "{testimonials[0].content}"
            </p>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-lg">{testimonials[0].name}</h4>
              <p className="text-sm text-gray-600">{testimonials[0].position}</p>
              <p className="text-sm text-[#F272A8] font-medium">{testimonials[0].company}</p>
            </div>
          </div>

          {/* Second Card - Middle Aligned */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
            <div className="flex justify-start mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[1].avatar}
                  alt={testimonials[1].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed text-left">
              "{testimonials[1].content}"
            </p>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-lg">{testimonials[1].name}</h4>
              <p className="text-sm text-gray-600">{testimonials[1].position}</p>
              <p className="text-sm text-[#F272A8] font-medium">{testimonials[1].company}</p>
            </div>
          </div>

          {/* Third Card - Right Aligned */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
            <div className="flex justify-start mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[2].avatar}
                  alt={testimonials[2].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed text-left">
              "{testimonials[2].content}"
            </p>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-lg">{testimonials[2].name}</h4>
              <p className="text-sm text-gray-600">{testimonials[2].position}</p>
              <p className="text-sm text-[#F272A8] font-medium">{testimonials[2].company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}