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
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Industry Leaders Trust CMN Distributors as Their Reliable Supply Chain Partner
            </h2>
          </div>

          {/* Right Column */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-12">
              Leading businesses and households trust CMN Distributors for reliable and efficient climate control solutions. 
              From commercial facilities to modern homes, we deliver high quality air conditioning systems backed by strong 
              partnerships, technical expertise, and dedicated after sales support ensuring comfort.
            </p>

            {/* Testimonial Cards */}
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                    index === 1 ? "text-center" : "text-left"
                  }`}
                >
                  <div className={`flex ${index === 1 ? "justify-center" : "justify-start"} mb-4`}>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className={index === 1 ? "text-center" : "text-left"}>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-[#F272A8] font-medium">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}