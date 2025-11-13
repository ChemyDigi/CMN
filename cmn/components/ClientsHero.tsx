// components/ClientsHero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: "blur(10px)" as const // ✅ Add 'as const' for CSS filter
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)" as const, // ✅ Add 'as const' for CSS filter
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const, // ✅ Add 'as const' for the tuple
    }
  }
};

const lineVariants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.8,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as const, // ✅ Add 'as const'
    }
  })
};

const backgroundVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut" as const, // ✅ Add 'as const'
    }
  }
};

export default function ClientsHero() {
  const headingLines = [
    "Empowering Global",
    "Brands through", 
    "Seamless Distribution"
  ];

  const descriptionLines = [
    "Our client network spans continents, built on trust, precision, and",
    "performance. Together, we deliver success through every shipment,",
    "every time."
  ];

  return (
    <div className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <motion.div 
        className="absolute inset-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/clients-hero-bg.png"
          alt="Our Clients Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <motion.div 
          className="absolute inset-0 bg-black opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-10 relative z-10">
        <motion.div 
          className="max-w-4xl mx-[1in]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-white text-sm font-medium mb-4 tracking-wider uppercase"
          >
            Our Clients
          </motion.p>
          
          {/* Heading Lines */}
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {headingLines.map((line, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Description */}
          <motion.div variants={itemVariants}>
            {descriptionLines.map((line, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2 + index * 0.1,
                  duration: 0.6
                }}
                className="text-gray-200 text-lg leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "630px", opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="h-0.5 bg-[#F272A8] mt-8"
          />
        </motion.div>
      </div>

      {/* Floating Background Pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-transparent to-purple-500 mix-blend-overlay"
      />
    </div>
  );
}