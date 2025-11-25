// "use client";
// import { motion } from 'framer-motion';
// import { ReactElement, useEffect, useState } from 'react';

// interface FormField {
//   id: string;
//   label: string;
//   type: string;
//   placeholder: string;
// }

// export const Contact_Form = (): ReactElement => {
//   const [isMounted, setIsMounted] = useState(false);
//   const formFields: FormField[] = [
//     { id: "firstName", label: "First Name", type: "text", placeholder: "Enter your first name" },
//     { id: "lastName", label: "Last Name", type: "text", placeholder: "Enter your last name" },
//     { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
//     { id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" },
//   ];

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   // Fixed useEffect - runs only once after mount
//   useEffect(() => {
//     // Use setTimeout to ensure this runs after the component is mounted
//     const timer = setTimeout(() => {
//       setIsMounted(true);
//     }, 0);
    
//     return () => clearTimeout(timer);
//   }, []); // Empty dependency array ensures this runs only once

//   // Static render for SSR (no animations)
//   if (!isMounted) {
//     return (
//       <div className="w-full max-w-md mx-auto md:max-w-lg lg:max-w-md">
//         <div className="bg-white p-6 md:p-8 shadow-2xl rounded-lg">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Request Contact
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {formFields.map((field: FormField) => (
//               <div key={field.id}>
//                 <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor={field.id}>
//                   {field.label}
//                 </label>
//                 <input
//                   type={field.type}
//                   id={field.id}
//                   className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
//                   placeholder={field.placeholder}
//                   required
//                 />
//               </div>
//             ))}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor="country">
//                 Country / Region
//               </label>
//               <select
//                 id="country"
//                 className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
//                 required
//               >
//                 <option value="" className="text-gray-600">Select your country/region</option>
//                 <option value="india" className="text-gray-800">India</option>
//                 <option value="sri-lanka" className="text-gray-800">Sri Lanka</option>
//                 <option value="singapore" className="text-gray-800">Singapore</option>
//                 <option value="other" className="text-gray-800">Other</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor="message">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical placeholder-gray-600"
//                 placeholder="Enter your message"
//                 required
//               ></textarea>
//             </div>
//             <div className="text-left pt-2">
//               <button
//                 type="submit"
//                 className="bg-black text-white font-semibold py-2 px-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
//               >
//                 SUBMIT
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // Animated render for client
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 50 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{
//         duration: 1.2,
//         ease: "easeOut",
//       }}
//       viewport={{ once: true, amount: 0.3 }}
//       className="w-full max-w-md mx-auto md:max-w-lg lg:max-w-md"
//     >
//       <div className="bg-white p-6 md:p-8 shadow-2xl rounded-lg">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           viewport={{ once: true }}
//           className="text-2xl font-bold text-gray-800 mb-6 text-center"
//         >
//           Request Contact
//         </motion.h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {formFields.map((field: FormField, i: number) => (
//             <motion.div
//               key={field.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor={field.id}>
//                 {field.label}
//               </label>
//               <input
//                 type={field.type}
//                 id={field.id}
//                 className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-600"
//                 placeholder={field.placeholder}
//                 required
//               />
//             </motion.div>
//           ))}

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//             viewport={{ once: true }}
//           >
//             <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor="country">
//               Country / Region
//             </label>
//             <select
//               id="country"
//               className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
//               required
//             >
//               <option value="" className="text-gray-600">Select your country/region</option>
//               <option value="india" className="text-gray-800">India</option>
//               <option value="sri-lanka" className="text-gray-800">Sri Lanka</option>
//               <option value="singapore" className="text-gray-800">Singapore</option>
//               <option value="other" className="text-gray-800">Other</option>
//             </select>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.0 }}
//             viewport={{ once: true }}
//           >
//             <label className="block text-gray-700 font-medium mb-2 text-sm" htmlFor="message">
//               Message
//             </label>
//             <textarea
//               id="message"
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical placeholder-gray-600"
//               placeholder="Enter your message"
//               required
//             ></textarea>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.1 }}
//             viewport={{ once: true }}
//             className="text-left pt-2"
//           >
//             <button
//               type="submit"
//               className="bg-black text-white font-semibold py-2 px-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
//             >
//               SUBMIT
//             </button>
//           </motion.div>
//         </form>
//       </div>
//     </motion.div>
//   );
// };