const HeroSection = () => {
  return (
    <div className="relative h-screen bg-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Contact
            </h1>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8">
              You're more resilient<br />
              when you know what's<br />
              coming
            </p>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
              Managing risk across complex aviation supply networks is challenging but CMN Distributors makes it seamless, reliable, and future-ready. Our intelligent distribution platform gives you real time visibility and control over every stage of your supply chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;