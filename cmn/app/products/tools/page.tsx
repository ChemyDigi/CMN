import ProductSection from "@/components/tools/ProductSection";
import HeroCarousel from "@/components/tools/GeneralHeroCarousel";
import ToolsHeroSection from "@/components/tools/ToolsHeroSection";

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
