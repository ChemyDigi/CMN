"use client";

export default function IntroText() {
  return (
    <section className="relative w-full bg-white">
      {/* Hero Text Section */}
      <div className="container mx-auto px-4 py-10 text-center sm:px-6 md:px-8 lg:py-12 xl:px-12">
        <h1 className="mb-3 text-xl font-semibold tracking-tight text-black 
                        sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
          Delivering Excellence in Industrial Solutions
        </h1>

        <p className="mx-auto text-xs text-black sm:max-w-md sm:text-sm 
                      md:max-w-xl md:text-base lg:max-w-2xl lg:text-lg">
          CMN Distributors provides premium tools, equipment, and niche HVAC & R solutions 
          for industries across Asia  supporting energy  efficient, safe, and high performance 
          operations.
        </p>
      </div>
    </section>
  );
}
