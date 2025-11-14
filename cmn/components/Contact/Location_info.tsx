"use client";
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
}

const SocialLink = ({ href, children }: SocialLinkProps): ReactElement => (
  <a 
    href={href} 
    className="text-gray-800 hover:text-gray-600 transition-colors"
    aria-label="Social media link"
  >
    {children}
  </a>
);

interface OfficeInfo {
  country: string;
  companyName: string;
  address: string[];
  phone: string;
  email: string;
}

export const Location_info = (): ReactElement => {
  const offices: OfficeInfo[] = [
    {
      country: "INDIA",
      companyName: "CMN DISTRIBUTORS PVT LTD",
      address: [
        "# 1, Mehta Industrial Estate",
        "Off J P Road No 2 Goregaon East",
        "Mumbai – 400063",
        "Maharshtra– India"
      ],
      phone: "(+91) 9920785241",
      email: "shubhangipatil@cmndistributors.com"
    },
    {
      country: "SRILANKA",
      companyName: "CMN Distributors Lanka PVT Ltd",
      address: [
        "No 103 & 105",
        "Kesbawa Road,",
        "Boralasgamuwa 10290",
        "Sri Lanka"
      ],
      phone: "+94 (76) 359 7771",
      email: "hastiha@cmndistributors.com"
    },
    {
      country: "SINGAPORE",
      companyName: "CMN DISTRIBUTORS PTE LTD",
      address: [
        "362, Upper Paya Lebar",
        "Road#05-07",
        "Da Jin Factory Building,",
        "Singapore, 534963"
      ],
      phone: "+65 96914182",
      email: "arnitmailk@cmndistributors.com"
    }
  ];

  return (
    <div className="py-16 bg-gray-50 relative min-h-screen">
      <div className="container mx-auto px-6 pt-8 ml-26">
        <div className="max-w-4xl">
          <div className="space-y-16">
            {offices.map((office: OfficeInfo, officeIndex: number) => (
              <div key={office.country}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-gray-800 mb-6"
                  >
                    {office.country}
                  </motion.h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Company name and address */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <svg className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div>
                          <p className="font-semibold text-gray-800 text-lg">
                            {office.companyName}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3"
                      >
                        <svg className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="text-gray-600 space-y-1">
                          {office.address.map((line: string, index: number) => (
                            <p key={index} className={index === 0 ? "font-medium" : ""}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Column - Phone, email and social media */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-gray-800 font-medium text-lg">{office.phone}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-blue-600">{office.email}</p>
                      </motion.div>
                      {/* Social Media Icons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-4 pt-2"
                      >
                        <SocialLink href="#">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </SocialLink>
                        <SocialLink href="#">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </SocialLink>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Horizontal Line (except for last office) */}
                {officeIndex < offices.length - 1 && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 2, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="border-t border-gray-300 mt-16"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};