import ProductSection from "@/components/Tools/ProductSection";
import HeroCarousel from "@/components/Tools/GeneralHeroCarousel";
import ToolsHeroSection from "@/components/Tools/ToolsHeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ToolsHeroSection />
      <HeroCarousel 
        page="products" 
      />
      <ProductSection />
      <Footer />
    </main>
  );
}
