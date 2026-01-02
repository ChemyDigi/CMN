"use client";

import LogoLoop from "./LogoLoop";
import client1 from "../../public/images/clientlogo/clientLogo (1).png";
import client2 from "../../public/images/clientlogo/clientLogo (2).png";
import client3 from "../../public/images/clientlogo/clientLogo (3).png";
import client4 from "../../public/images/clientlogo/clientLogo (4).png";
import client5 from "../../public/images/clientlogo/clientLogo (5).png";
import client6 from "../../public/images/clientlogo/clientLogo (6).png";
import client7 from "../../public/images/clientlogo/clientLogo (7).png";
import client8 from "../../public/images/clientlogo/clientLogo (8).png";
import client9 from "../../public/images/clientlogo/clientLogo (9).png";
import client10 from "../../public/images/clientlogo/clientLogo (10).png";
import client11 from "../../public/images/clientlogo/clientLogo (11).png";
import client12 from "../../public/images/clientlogo/clientLogo (12).png";
import client13 from "../../public/images/clientlogo/clientLogo (13).png";

const imageLogos = [
  { src: client1.src, alt: "Company 1" },
  { src: client2.src, alt: "Company 2" },
  { src: client3.src, alt: "Company 3" },
  { src: client4.src, alt: "Company 4" },
  { src: client5.src, alt: "Company 5" },
  { src: client6.src, alt: "Company 6" },
  { src: client7.src, alt: "Company 7" },
  { src: client8.src, alt: "Company 8" },
  { src: client9.src, alt: "Company 9" },
  { src: client10.src, alt: "Company 10" },
  { src: client11.src, alt: "Company 11" },
  { src: client12.src, alt: "Company 12" },
  { src: client13.src, alt: "Company 13" },
];

export default function LogoSlider() {
  return (
    <section className="w-full py-12">
      <h3 className="text-center text-base md:text-lg font-semibold text-black mb-10">
        Trusted by Leading Global Brands and Industry Pioneers
      </h3>

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
