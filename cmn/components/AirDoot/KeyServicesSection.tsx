"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function KeyServicesSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle fullscreen function
  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        if (videoContainerRef.current.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          await (videoContainerRef.current as any).webkitRequestFullscreen();
        } else if ((videoContainerRef.current as any).msRequestFullscreen) {
          await (videoContainerRef.current as any).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle video ended
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <section className="w-full bg-white py-20 px-6 md:px-20">
      {/* TAGLINE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left"
      >
        
        {/* LEFT HEADING */}
        <div className="mx-auto md:mx-0">
          {/* Logo */}
          <div className="mb-6 flex justify-center md:justify-start">
            <Image
              src="/images/AirDoot/logo.png"
              alt="AirDoot Logo"
              width={200}
              height={80}
              className="h-12 w-auto sm:h-16 md:h-20 lg:h-24"
            />
          </div>
          
          <h3 className="text-xl md:text-5xl font-bold mb-4 text-black leading-snug">
            Going Beyond <br />
            Repairs
          </h3>
        </div>

        {/* VIDEO SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="max-w-2xl mx-auto md:mx-0">
            {/* Video Container with Aspect Ratio */}
            <div 
              ref={videoContainerRef}
              className={`relative w-full bg-white ${
                isFullscreen 
                  ? 'fullscreen:w-screen fullscreen:h-screen' 
                  : ''
              }`} 
              style={!isFullscreen ? { paddingBottom: '56.25%' } : {}}
            >
              {/* Local Video Player */}
              <video
                ref={videoRef}
                className={`absolute top-0 left-0 w-full h-full object-cover ${
                  isFullscreen 
                    ? 'rounded-none' 
                    : 'rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg'
                }`}
                title="AirDoot - Going Beyond Repairs"
                controls={isFullscreen}
                onEnded={handleVideoEnd}
                onClick={togglePlay}
                preload="metadata"
              >
                {/* Add multiple sources for better browser compatibility */}
                <source src="../images/AirDoot/AirDoot Corporate Video.mp4" type="video/mp4" />
                <source src="/videos/airdoot-demo.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Controls (only show when not in fullscreen) */}
              {!isFullscreen && (
                <>
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 w-full h-full flex items-center justify-center transition-colors duration-300"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {!isPlaying && (
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <svg 
                          className="w-10 h-10 text-gray-900 ml-1" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </button>

                  {/* Fullscreen Toggle Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 z-10 text-white rounded-full p-2 sm:p-3
                      transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </button>
                </>
              )}

              {/* Fullscreen Exit Button (only in fullscreen mode) */}
              {isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 sm:p-4
                    transition-all duration-300 hover:scale-110 shadow-lg"
                  aria-label="Exit fullscreen"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}