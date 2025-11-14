"use client";
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export const Contact_Form = (): ReactElement => {
  const formFields: FormField[] = [
    { id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name" },
    { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name" },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: 0.2,
      }}
      className="relative"
    >
      <div
        className="sticky top-1/2 transform -translate-y-1/2 z-50 bg-white p-8 w-full max-w-md shadow-2xl mx-auto md:mx-0 md:absolute md:right-8 lg:right-16 rounded-lg"
        style={{
          maxHeight: "calc(150vh - 4rem)",
          overflowY: "auto",
          top: "calc(100vh - 50%)",
          marginTop: "-700px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
        >
          Request Contact
        </motion.h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {formFields.map((field: FormField, i: number) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
            >
              <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={field.placeholder}
                required
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor="country">
              Country / Region
            </label>
            <select
              id="country"
              className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              required
            >
              <option value="">Select your country/region</option>
              <option value="india">India</option>
              <option value="sri-lanka">Sri Lanka</option>
              <option value="singapore">Singapore</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
              placeholder="Enter your message"
              required
            ></textarea>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-left pt-2"
          >
            <button
              type="submit"
              className="bg-black text-white font-semibold py-2 px-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
            >
              SUBMIT
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};
