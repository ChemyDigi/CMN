"use client";
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

export const Contact_Hero = (): ReactElement => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(../images/Contacts_hero.jpg)` 
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </motion.div>

      {/* Hero Content - Centered on mobile, fixed to avoid navbar push */}
      <div className="relative z-10 flex h-screen items-center justify-center lg:justify-start">
        <div className="container mx-auto px-6">
          <div className="text-center lg:text-left lg:pl-8 xl:pl-16">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="mb-6 text-1xl md:text-2xl lg:text-3xl font-bold text-white"
              >
                Contact
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                You&apos;re more resilient<br />
                when you know what&apos;s<br />
                coming
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.9 }}
                className="text-base md:text-md text-white/90 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Managing risk across complex aviation supply networks is challenging but CMN Distributors makes it seamless, reliable, and future-ready. Our intelligent distribution platform gives you real time visibility and control over every stage of your supply chain.
              </motion.p>

              {/* Optional subtle underline or divider animation */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "520px", opacity: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
                className="mt-6 h-[2px] bg-[#F272A8] rounded mx-auto lg:mx-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};