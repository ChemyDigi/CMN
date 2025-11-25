import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HomeComponents/HeroSection";
import LogoSlider from "../../components/HomeComponents/LogoSlider";
import IntroSection from "../../components/HomeComponents/IntroSection";
import WhyChooseUs from "../../components/HomeComponents/WhyChooseUsSection";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts";
export default function AboutPage() {
  return (
    <main className="flex flex-col overflow-x-hidden w-full">
      <Navbar />
      <HeroSection />
      <LogoSlider />
      <IntroSection />
      <WhyChooseUs />
      <FeaturedProducts/>
      <Footer />
    </main>
  );
}

