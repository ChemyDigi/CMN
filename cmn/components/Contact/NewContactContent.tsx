"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [openFields, setOpenFields] = useState<number[]>([]);

  const toggleField = (index: number) => {
    setOpenFields(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isFieldOpen = (index: number) => openFields.includes(index);

  return (
    <section className="w-full bg-white text-black px-6 md:px-16 lg:px-24 py-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <h1 className="text-7xl font-bold leading-tight mb-6">Keep in<br />touch</h1>
          <p className="text-sm leading-relaxed">
            sjhsgfghaghgaggdjsss dajgfd scajdf dsja dsbajd jsbf dbjs fabfj jfaj dfjbd fbd bfd dsb fbds fbd fb edebf eh f d f dshaf d jhs a.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-xl space-y-8"
        >
          {[
            { label: "Your Name", type: "text" },
            { label: "Last Name", type: "text" },
            { label: "Email", type: "email" },
            { label: "Phone Number", type: "tel" },
            { label: "Country / Region", type: "text" },
            { label: "Message", type: "textarea" },
          ].map((field, i) => (
            <div key={i} className="group w-full border-b border-gray-300 pb-2">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleField(i)}
              >
                <label className="text-lg font-medium">{field.label}</label>
                <div className={`transform transition-transform duration-300 ${isFieldOpen(i) ? 'rotate-180' : ''}`}>
                  <Image
                    src={isFieldOpen(i) ? "/images/AboutUs/dropdown.png" : "/images/AboutUs/dropdown.png"}
                    alt="Dropdown arrow"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isFieldOpen(i) ? 'max-h-40' : 'max-h-0'}`}>
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full mt-3 pb-2 border-none outline-none text-base resize-none bg-transparent"
                    rows={4}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full mt-3 pb-2 border-none outline-none text-base bg-transparent"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-8 bg-black text-white tracking-wide text-sm px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            SUBMIT
          </button>
        </motion.form>
      </div>

      {/* LOCATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full border-t border-gray-300 mt-20 pt-16 grid md:grid-cols-3 gap-12"
      >
        {/* India */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">India</h2>
          <p className="font-semibold text-sm">CMN Distributors PVT LTD</p>
          <p className="text-sm mt-2 leading-relaxed">
            #1, Mehta Industrial Estate<br />
            Off J P Road No 2 goregaon East<br />
            Mumbai - 400063<br />
            Maharashtra - India
          </p>
          <p className="text-sm mt-4">(+91) 9920785241</p>
          <p className="text-sm">shubhangi@cmndistributors.com</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/AboutUs/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/AboutUs/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>

        {/* Sri Lanka */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Sri Lanka</h2>
          <p className="font-semibold text-sm">CMN Distributors Lanka PVT LTD</p>
          <p className="text-sm mt-2 leading-relaxed">
            No 103 & 105<br />
            Kesbawa Road,<br />
            Boralesgamuwa 10290<br />
            Sri Lanka
          </p>
          <p className="text-sm mt-4">+94 (76) 359 7171</p>
          <p className="text-sm">hasitha@cmndistributors.com</p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/AboutUs/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/AboutUs/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>

        {/* Singapore */}
        <div>
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
                src="/images/AboutUs/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/AboutUs/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}