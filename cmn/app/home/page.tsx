import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HomeComponents/HeroSection";
import LogoSlider from "../../components/HomeComponents/LogoSlider";
import IntroSection from "../../components/HomeComponents/IntroSection";
import WhyChooseUs from "../../components/HomeComponents/WhyChooseUsSection";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts";
import AuthorizedCarrierDistributor from "../../components/HomeComponents/AuthorizedCarrierDistributor";
import AirDoot from "@/components/HomeComponents/AirDoot";
import AboutCmn from "@/components/HomeComponents/AboutCmn";
import Industry from "@/components/HomeComponents/IndustrySection";
export default function AboutPage() {
  return (
    <main className="flex flex-col overflow-x-hidden w-full">
      <Navbar />
      
      <HeroSection />
      <AboutCmn/>
            <WhyChooseUs />
      <FeaturedProducts/>
      <LogoSlider />
      <IntroSection />
      <AuthorizedCarrierDistributor/>
      <AirDoot />
      <Industry/>
      <Footer />
      
    </main>
  );
}

