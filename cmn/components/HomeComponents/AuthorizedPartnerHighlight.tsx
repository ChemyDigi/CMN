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

                  {/* Button and Social Icons Container */}
                  <div className="flex flex-col items-center lg:items-start space-y-6">
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

                    {/* Social Media Icons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="flex space-x-6"
                    >
                      {/* Facebook Icon */}
                      <motion.a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.2,
                          color: "#ffffff"
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </motion.a>

                      {/* Instagram Icon */}
                      <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.2,
                          color: "#ffffff"
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </motion.a>

                      {/* LinkedIn Icon */}
                      <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        whileHover={{ 
                          scale: 1.2,
                          color: "#ffffff"
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </motion.div>
                  </div>
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