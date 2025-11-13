import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HomeComponents/HeroSection";
import LogoCarousel from "../../components/HomeComponents/LogoCarousel";
import IntroSection from "../../components/HomeComponents/IntroSection";
import WhyChooseUs from "../../components/HomeComponents/WhyChooseUsSection";
export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />
      <LogoCarousel />
      <IntroSection />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
