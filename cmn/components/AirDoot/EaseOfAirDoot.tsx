"use client";

import { useState, useEffect, useRef } from "react";

export default function AirDootIntroductionSection() {
  const [isHeaderInView, setIsHeaderInView] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Toggle fullscreen using browser Fullscreen API
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
    if (localVideoRef.current) {
      if (localVideoRef.current.paused) {
        localVideoRef.current.play();
        setIsPlaying(true);
      } else {
        localVideoRef.current.pause();
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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
              setIsHeaderInView(true);
            } else if (entry.target === videoRef.current) {
              setIsVideoInView(true);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
            isHeaderInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-500 text-sm font-medium mb-2 tracking-wider">
            Introducing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Discover AirDoot
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Watch how AirDoot revolutionizes HVAC-R service management with cutting-edge technology
            and seamless user experience. All your service needs, simplified.
          </p>
        </div>

        {/* Video Section */}
        <div 
          ref={videoRef}
          className={`transition-all duration-700 delay-300 ${
            isVideoInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-6xl mx-auto">
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
                ref={localVideoRef}
                className={`absolute top-0 left-0 w-full h-full object-cover ${
                  isFullscreen 
                    ? 'rounded-none' 
                    : 'rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg'
                }`}
                title="Introducing AirDoot - HVAC-R Service Management Platform"
                controls={isFullscreen}
                onEnded={handleVideoEnd}
                onClick={togglePlay}
                preload="metadata"
              >
                {/* Add multiple sources for better browser compatibility */}
                <source src="../images/AirDoot/AirCon Cleaning Toshiba Version.mp4" type="video/mp4" />
                <source src="/videos/airdoot-introduction.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Controls (only show when not in fullscreen) */}
              {!isFullscreen && (
                <>
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 w-full h-full flex items-center justify-center  transition-colors duration-300"
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
                    className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 sm:p-3
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

              {/* Play button overlay for mobile (not in fullscreen) - keeps original styling */}
              {!isFullscreen && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg 
                      className="w-8 h-8 text-gray-900 ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}