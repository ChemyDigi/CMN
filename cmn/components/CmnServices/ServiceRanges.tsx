export default function ServicesRange() {
  return (
    <section id="service-ranges" className="w-full bg-black text-white px-4 sm:px-6 md:px-16 py-16 md:py-20 font-sans">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6 lg:gap-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold max-w-xl leading-tight">
          Extensive Portfolio of Industrial Tools & Maintenance Equipment.
        </h2>
        
        <a
          href="/home/#featured-products"
          className="inline-block"
        >
          <button
            className="
              px-4 sm:px-6 py-3 rounded-full bg-white text-[#554c4a] text-sm sm:text-base font-medium
              shadow-md hover:shadow-lg
              transition-all duration-300 ease-out
              hover:scale-105 hover:-translate-y-1
              whitespace-nowrap
              w-full sm:w-auto
            "
          >
            Discover all our Products
          </button>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-white/10 border border-white/10">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">TOOLS</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Hand Tools (Snap-on, Blue Point), Cutting Tools (Bhaco), Power Tools (Bosch), Air Tools, Battery/Cordless Tools (Bosch)</p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">AUTOMOTIVE SOLUTIONS <br className="hidden sm:block"/>(John Bean)</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Wheel alignment systems, Wheel balancers, Tyre changers, Vehicle hoists, Brake and suspension testers, Speed testers, Air inflators</p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">MEASURING TOOLS <br className="hidden sm:block"/>(Bosch)</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Distance measures, Line lasers, Detectors, Levelers</p>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">ACCESSORIES</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Drill bits, Grinding wheels, Cutting wheels, Circular saw blades, Jig saw blades, Screw bits, Accessories kits</p>
        </div>

        {/* Card 5 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">CONSUMABLES & CHEMICALS <br className="hidden sm:block"/>(MrMckenic)</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Rust removers, Special cleaners, Lithium grease, AC cleaners, Contact cleaners</p>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">GROUND SUPPORT EQUIPMENT <br className="hidden sm:block"/>(Malabar, Tronair)</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Axel jacks, Tripod jacks, Hydraulic systems, Pressure testing equipment, Tugs and towing equipment, Aircraft service equipment, Engine servicing tools, Ground power units, Air conditioning services for aircraft</p>
        </div>

        {/* Card 7 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">FILTRATION SYSTEMS <br className="hidden sm:block"/>(Pall)</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Fuel filtration products</p>
        </div>

        {/* Card 8 */}
        <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 transition-all duration-300 hover:bg-[#F272A8] hover:text-black group">
          <h4 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 opacity-90 group-hover:opacity-100 group-hover:text-black">OTHER TOOLS & EQUIPMENT</h4>
          <p className="text-xs sm:text-sm opacity-70 group-hover:opacity-100 group-hover:text-black text-justify leading-relaxed">Air blowers, Hot air guns, Vacuum cleaners, High pressure washers</p>
        </div>
      </div>
    </section>
  );
}