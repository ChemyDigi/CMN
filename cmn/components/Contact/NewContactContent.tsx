"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { User, Mail, Phone, Globe, MessageSquare } from "lucide-react";
import { send } from "@emailjs/browser";
import toast from "react-hot-toast";

import facebookIcon from "@/public/images/AboutUS/facebook.png";
import instagramIcon from "@/public/images/AboutUS/instagram.png";

export default function ContactSection() {
  const [opened, setOpened] = useState<string[]>(["firstName"]);
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        values,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Message sent successfully!");
      setValues({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
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
            review it and get back to you as soon as possible.
          </p>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
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
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggle(field.id)}
                >
                  <label className="text-sm font-medium">{field.label}</label>
                  <Icon size={18} className="text-pink-500" />
                </div>

                <div className="w-full border-b border-gray-300 mt-2"></div>

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
                          value={values[field.id] || ""}
                          onChange={e => handleChange(field.id, e.target.value)}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="w-full mt-3 pb-2 text-sm outline-none bg-transparent"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
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
            disabled={loading}
            className="mt-6 bg-black text-white text-xs tracking-wide px-8 py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "SUBMIT"}
          </button>
        </motion.form>
      </div>

      {/* LOCATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full border-t border-gray-300 mt-20 pt-16 flex justify-center"
      >
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* India */}
          <LocationCard
            title="India"
            company="CMN Distributors PVT LTD"
            address="# 1, Mehta Industrial Estate<br />Off J P Road No 2 Goregaon East<br />Mumbai – 400063, Maharashtra - India"
            phone="+91 9920785241"
            email="shubhangipatil@cmndistributors.com"
            facebook="https://www.facebook.com/vkr4u/"
            instagram="https://www.instagram.com/cmndistributors/"
          />

          {/* Sri Lanka */}
          <LocationCard
            title="Sri Lanka"
            company="CMN Distributors Lanka PVT LTD"
            address="No 145 <br />Lake Road,<br />Boralasgamuwa, Sri Lanka"
            phone="+94 76 359 7171"
            email="hasitha@cmndistributors.com"
            facebook="https://www.facebook.com/cmndistributorssl/"
            instagram="https://www.instagram.com/cmnlanka/"
          />

          {/* Singapore */}
          <LocationCard
            title="Singapore"
            company="CMN Distributors PVT LTD"
            address="362, Upper Paya Lebar, Road#05-07<br />Da Jin Factory Building,<br />Singapore, 534963"
            phone="+65 9691 4182"
            email="amitmalik@cmndistributors.com"
            facebook="https://www.facebook.com/vkr4u/"
            instagram="https://www.instagram.com/cmndistributors/"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ---------------- LOCATION CARD ----------------
function LocationCard({
  title,
  company,
  address,
  phone,
  email,
  facebook,
  instagram,
}: {
  title: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
}) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>

      <p className="font-semibold text-sm">{company}</p>

      <p
        className="text-sm mt-2 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: address }}
      ></p>

      <p className="text-sm mt-4">{phone}</p>

      <a
        href={`mailto:${email}`}
        className="text-sm hover:text-pink-500 transition-colors"
      >
        {email}
      </a>

      <div className="flex gap-4 mt-4">
        <a href={facebook} target="_blank" rel="noopener noreferrer">
          <Image src={facebookIcon} alt="Facebook" width={24} height={24} />
        </a>

        <a href={instagram} target="_blank" rel="noopener noreferrer">
          <Image src={instagramIcon} alt="Instagram" width={24} height={24} />
        </a>
      </div>
    </div>
  );
}
