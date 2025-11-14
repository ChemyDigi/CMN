"use client";

import LogoLoop from "./LogoLoop";

const imageLogos = [
  {
    src: "/images/Home/Logos/2.png",
    alt: "Company 1",
  },
  {
    src: "/images/Home/Logos/4.png",
    alt: "Company 2",
  },
  {
    src: "/images/Home/Logos/5.png",
    alt: "Company 3",
  },
  {
    src: "/images/Home/Logos/6.png",
    alt: "Company 4",
  },
  {
    src: "/images/Home/Logos/8.png",
    alt: "Company 5",
  },
];

export default function LogoSlider() {
  return (
    <section className="w-full py-12">
      {/* ⭐ Heading */}
      <h3 className="text-center text-base md:text-lg font-semibold text-black mb-10">
        Trusted by Leading Global Brands and Industry Pioneers
      </h3>

      {/* ⭐ Logo Slider */}
      <LogoLoop
        logos={imageLogos}
        speed={120}
        direction="left"
        logoHeight={50}
        gap={65}
        scaleOnHover
      />
    </section>
  );
}
