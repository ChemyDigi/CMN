"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Link from "next/link";


export default function AuthorizedPartnerHighlight(): React.ReactElement {
  return (
   <section className="w-full bg-white text-black py-20 px-6 md:px-16 lg:px-24">

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-[#0A0A0A] to-[#1A1A1A] border border-gray-800 hover:border-gray-700 transition-all duration-500"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F272A8] rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
          </div>

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm mb-3 text-[#F272A8] font-semibold tracking-wider">
                    OFFICIAL PARTNERSHIP
                  </p>
                  
                  <h2 className="text-2xl text-white md:text-3xl lg:text-4xl font-semibold leading-tight mb-4">
                    Authorized Carrier <br />
                    <span className="text-white">Distributor</span>
                  </h2>
                  
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                    CMN Distributors is proud to be an authorized distributor of Carrier, 
                    delivering world-class HVAC solutions with genuine products, expert 
                    technical support, and unparalleled service excellence.
                  </p>

                  <Link href="https://www.carrier.com/commercial/en/us/products/" target="_blank">
                  <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#e55a9c"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-[#F272A8] hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#F272A8]/20"
                >
                    Explore Carrier Products
                    </motion.button>
                    </Link>
                </motion.div>
              </div>

              {/* Right Logo/Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <div className="relative group">
                  {/* Outer Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F272A8] to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  
                  {/* Main Logo Container */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10 group-hover:bg-white/10 transition-all duration-500">
                    <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                      {/* Carrier Logo Placeholder */}
                      <div className="text-center">
                        <div className="w-200 h-200 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br from-gray-300 to-gray-100 rounded-lg flex items-center justify-center">
                          <Image
                          src="/images/carrier-corp-logo.avif"
                          alt="Carrier Logo"
                          width={1200}
                          height={1200}
                          className="object-contain"
                          />


                        </div>
                        <p className="text-white font-semibold text-lg md:text-xl tracking-wide">
                          Carrier
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Authorized Partner
                        </p>
                      </div>
                    </div>
                    
                    {/* Verified Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                      viewport={{ once: true }}
                      className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <span>✓</span>
                      <span>VERIFIED</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  { label: "Genuine Products", value: "100% Authentic" },
                  { label: "Expert Support", value: "Certified Technicians" },
                  { label: "Warranty", value: "Full Coverage" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-300"
                  >
                    <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}