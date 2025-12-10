"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();
const texts = [
  "Empowering Industries...",
  "Delivering Premium Tools & Equipment...",
  "Enhancing HVAC & Air Quality Solutions...",
  "Committed to Safety & Innovation...",
  "Preparing Your Experience..."
];


  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // cycle text every 1 second
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 1000);

    // redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/home");
    }, 5000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-6 text-white">
        {/* Logo */}
        <Image
          src="/images/admin/splash.png"  // change this to your logo
          width={120}
          height={120}
          alt="Logo"
          className=""
        />

        {/* Changing Text */}
        <p className="text-lg opacity-80 transition-all duration-300">
          {texts[currentTextIndex]}
        </p>

        {/* Loader Spinner */}
        <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}
