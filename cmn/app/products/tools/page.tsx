import ProductSection from "@/components/ProductSection";
import HeroCarousel from "@/components/GeneralHeroCarousel";
import ToolsHeroSection from "@/components/ToolsHeroSection";

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
