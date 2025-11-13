const RefrigeratorHeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url('/images/products-tools/toolshero.jpg')` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto pr-12 md:pr-24 lg:pr-32 pl-8 md:pl-16 lg:pl-20">
          <div className="max-w-3xl animate-fade-in">
            {/* Eyebrow Text */}
            <p
              className="mb-8 text-xs font-medium tracking-wider text-white/90 md:text-sm"
              style={{
                animation: "fade-in 0.6s ease-out 0.2s both",
              }}
            >
              Tools and Equipment
            </p>

            {/* Main Heading */}
            <h1
              className="mb-12 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{
                animation: "fade-in 0.6s ease-out 0.4s both",
              }}
            >
              Tools That Move Industries Forward
            </h1>

            {/* Description */}
            <p
              className="text-sm leading-relaxed text-white/90 md:text-base lg:text-lg"
              style={{
                animation: "fade-in 0.6s ease-out 0.6s both",
              }}
            >
              From heavy duty equipment to everyday essentials, we provide solutions that empower progress and define quality in every field. Our equipment combines craftsmanship and innovation to deliver power, precision, and performance you can depend on, every day.
            </p>
          </div>
        </div>
      </div>

      {/* Inline Keyframes */}
      <style>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default RefrigeratorHeroSection;
