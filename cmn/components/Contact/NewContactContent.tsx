"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
} from "lucide-react";
import facebookIcon from "@/public/images/AboutUs/facebook.png";
import instagramIcon from "@/public/images/AboutUs/instagram.png";

export default function ContactSection() {
  const [opened, setOpened] = useState<string[]>(["firstName"]); // First field open on load
  const [values, setValues] = useState<{ [key: string]: string }>({});

  const fields = [
    { id: "firstName", label: "First Name", type: "text", icon: User },
    { id: "lastName", label: "Last Name", type: "text", icon: User },
    { id: "email", label: "Email", type: "email", icon: Mail },
    { id: "phone", label: "Phone Number", type: "tel", icon: Phone },
    { id: "country", label: "Country / Region", type: "text", icon: Globe },
    { id: "message", label: "Message", type: "textarea", icon: MessageSquare },
  ];

  const toggle = (id: string) => {
    setOpened(prev => {
      if (prev.includes(id)) {
        return values[id] ? prev : prev.filter(f => f !== id);
      }
      return [...prev, id];
    });
  };

  const handleChange = (id: string, val: string) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  return (
    <section className="w-full bg-white text-black px-6 md:px-16 lg:px-24 py-20">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-28">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Keep in<br />touch
          </h1>
          <p className="text-sm md:text-base leading-relaxed">
            Send us a message with your questions or concerns, and our team will
            review it and get back to you as soon as possible with the support
            or information you need.
          </p>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-xl lg:ml-20 space-y-6"
        >
          {fields.map(field => {
            const Icon = field.icon;
            const isOpen = opened.includes(field.id);

            return (
              <div key={field.id} className="w-full">
                {/* LABEL ROW WITH ICON */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggle(field.id)}
                >
                  <label className="text-sm font-medium">{field.label}</label>
                  <Icon size={18} className="text-pink-500" />
                </div>

                {/* ALWAYS VISIBLE LINE */}
                <div className="w-full border-b border-gray-300 mt-2"></div>

                {/* EXPANDING INPUT */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {field.type === "textarea" ? (
                        <textarea
                          rows={4}
                          className="w-full mt-3 pb-2 text-sm outline-none bg-transparent resize-none"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          autoFocus={field.id === "firstName"}
                          value={values[field.id] || ""}
                          onChange={e => handleChange(field.id, e.target.value)}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="w-full mt-3 pb-2 text-sm outline-none bg-transparent"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          autoFocus={field.id === "firstName"}
                          value={values[field.id] || ""}
                          onChange={e => handleChange(field.id, e.target.value)}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <button
            type="submit"
            className="mt-6 bg-black text-white text-xs tracking-wide px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            SUBMIT
          </button>
        </motion.form>
      </div>

      {/* LOCATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="
          w-full border-t border-gray-300 mt-20 pt-16 
          flex justify-center
        "
      >
        <div
          className="
            w-full max-w-6xl 
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            gap-12 text-center md:text-left
          "
        >
          {/* India */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold mb-2">India</h2>
            <p className="font-semibold text-sm">CMN Distributors PVT LTD</p>
            <p className="text-sm mt-2 leading-relaxed">
              #1, Mehta Industrial Estate<br />
              Off J P Road No 2 goregaon East<br />
              Mumbai - 400063, Maharashtra - India
            </p>
            <p className="text-sm mt-4">(+91) 9920785241</p>
            <p className="text-sm">shubhangi@cmndistributors.com</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={facebookIcon}
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={instagramIcon}
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Sri Lanka */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold mb-2">Sri Lanka</h2>
            <p className="font-semibold text-sm">CMN Distributors Lanka PVT LTD</p>
            <p className="text-sm mt-2 leading-relaxed">
              No 103 & 105<br />
              Kesbawa Road,<br />
              Boralesgamuwa 10290, Sri Lanka
            </p>
            <p className="text-sm mt-4">+94 (76) 359 7171</p>
            <p className="text-sm">hasitha@cmndistributors.com</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={facebookIcon}
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={instagramIcon}
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Singapore */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-semibold mb-2">Singapore</h2>
            <p className="font-semibold text-sm">CMN Distributors PVT LTD</p>
            <p className="text-sm mt-2 leading-relaxed">
              362, Upper Paya Lebar Road#05-07<br />
              Da Jin Factory Building,<br />
              Singapore, 534963
            </p>
            <p className="text-sm mt-4">+65 96914182</p>
            <p className="text-sm">amitmalik@cmndistributors.com</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={facebookIcon}
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={instagramIcon}
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}