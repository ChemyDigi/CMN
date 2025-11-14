import ProductSection from "@/components/Tools/ProductSection";
import HeroCarousel from "@/components/Tools/GeneralHeroCarousel";
import ToolsHeroSection from "@/components/Tools/ToolsHeroSection";

export default function Home() {
  return (
    <main>
      <ToolsHeroSection />
      <HeroCarousel 
        page="products" 
      />
      <ProductSection />
    </main>
  );
}
