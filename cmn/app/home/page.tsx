import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HomeComponents/HeroSection";
import LogoSlider from "../../components/HomeComponents/LogoSlider";
import AboutUsSection from "@/components/HomeComponents/aboutUs";
import IntroSection from "../../components/HomeComponents/IntroSection";
import WhyChooseUs from "../../components/HomeComponents/WhyChooseUsSection";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts";
import AuthorizedPartnerHighlight from "../../components/HomeComponents/AuthorizedPartnerHighlight";

export default function AboutPage() {
  return (
    <main className="flex flex-col overflow-x-hidden w-full">
      <Navbar />
      <HeroSection />
      <LogoSlider />
      <AboutUsSection />
      <IntroSection />
      <WhyChooseUs />
      <FeaturedProducts/>
      <AuthorizedPartnerHighlight />
      <Footer />
    </main>
  );
}

