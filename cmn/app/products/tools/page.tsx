import ProductSection from "@/components/tools/ProductSection";
import HeroCarousel from "@/components/GeneralHeroCarousel";
import ToolsHeroSection from "@/components/tools/ToolsHeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ToolsHeroSection />
      {/* <HeroCarousel 
        page="products" 
      /> */}
      <ProductSection />
      <Footer />
    </main>
  );
}
