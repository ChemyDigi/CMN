"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import mission from "../../public/images/AboutUS/expertise.png";
import vision from "../../public/images/AboutUS/strength.png";
// Updated icons - removed Leaf and added more relevant ones
import { Briefcase, Trophy, UserCheck, UsersRound } from "lucide-react";

/* ---------------- COUNT-UP NUMBER COMPONENT ---------------- */
function CountUpNumber({ endValue }: { endValue: string }) {
  const numericValue = Number(endValue.replace(/[^0-9]/g, ""));
  const suffix = endValue.replace(/[0-9]/g, "");
  const duration = 1500;

  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  // Detect when user scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Run the animation only after triggered
  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const increment = numericValue / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        start = numericValue;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(interval);
  }, [hasAnimated, numericValue]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function MissionVisionSection() {
  return (
    <section className="w-full bg-white text-black">

      {/* ---------- OUR MISSION SECTION ---------- */}
      <div className="grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="relative w-full min-h-[450px] md:min-h-[550px]">
          <Image src={mission} alt="Mission" fill className="object-cover" />
        </div>

        {/* TEXT */}
        <div className="flex flex-col justify-center items-center text-center px-10 py-14 md:px-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 text-[#F272A8]">Our expertise & vision</h2>

            <div className="relative">
              <span className="text-gray-400 text-7xl absolute left-0 -top-6">"</span>

              <blockquote className="italic text-lg leading-relaxed md:text-xl text-gray-600 px-6">
                CMN is lead and driven by a team of highly experienced 
                professionals. With distribution channels (of premium tools and equipment) 
                catering to a plethora of industries such as AVIATION, OIL & GAS, POWER, 
                DEFENCE, AUTOMOTIVE, CONSTRUCTION, to name a few, streamlining to us at 
                CMN is paramount. We also specialize in Project Supplies, console-dating 
                all requirements of our customers, acting as a ONE-STOP SOLUTION.
              </blockquote>

              <span className="text-gray-400 text-7xl absolute right-0 bottom-0">"</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- ICON ROW (COUNT-UP WHEN IN VIEW) ---------- */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 px-6">
          {[
            // Changed to Briefcase (represents business experience)
            { icon: Briefcase, number: "10+", title: "Years Experience" },
            // Changed to UserCheck (represents professional team)
            { icon: UserCheck, number: "20+", title: "Professional Team" },
            // Changed to UsersRound (represents customers/people)
            { icon: UsersRound, number: "500+", title: "Customers" },
            // Changed to Trophy (represents completed projects/achievements)
            { icon: Trophy, number: "500000+", title: "Tools Sold" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center gap-5 p-8
                transition-all duration-500"
              >
                {/* ICON */}
                <div
                  className="p-6 rounded-full bg-[#1c1c1c] border border-white
                  transition-all duration-500
                  group-hover:bg-[#F272A8] group-hover:border-[#F272A8]
                  group-hover:scale-120"
                >
                  <Icon className="w-10 h-10 text-white group-hover:text-white transition-all duration-500" />
                </div>

                {/* NUMBER WITH SCROLL ANIMATION */}
                <h3 className="text-4xl font-extrabold text-white">
                  <CountUpNumber endValue={item.number} />
                </h3>

                {/* TITLE */}
                <p className="text-[#F272A8] font-semibold">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- OUR VISION SECTION ---------- */}
      <div className="grid md:grid-cols-2">

        {/* TEXT */}
        <div className="flex flex-col justify-center items-center text-center px-10 py-14 md:px-16 md:py-20 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 text-[#F272A8]">Our Strength </h2>

            <div className="relative">
              <span className="text-gray-400 text-7xl absolute left-0 -top-6">"</span>

              <blockquote className="italic text-lg leading-relaxed md:text-xl text-gray-600 px-6">
                Our biggest strength is our customers, they trust us and 
                believe in us as our motto is customer service, which is 
                reflected in our name CMN that stands for &quot;CALL ME NOW&quot; 
                We specialize in application based sales and put in lot of 
                efforts in customer education and training. Key accounts 
                handling providing them one stop solution comes naturally to us.
              </blockquote>
              <span className="text-gray-400 text-7xl absolute right-0 bottom-0 translate-y-6">
                "
              </span>
            </div>
          </motion.div>
        </div>

        {/* IMAGE */}
        <div className="relative w-full min-h-[450px] md:min-h-[550px] order-1 md:order-2">
          <Image src={vision} alt="Vision" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}