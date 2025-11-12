import ProductSection from "@/components/ProductSection";
import HeroCarousel from "@/components/HeroCarousel";
import ToolsHeroSection from "@/components/ToolsHeroSection";

export default function Home() {
  return (
    <main>
      <ToolsHeroSection />
      <HeroCarousel />
      <ProductSection />
    </main>
  );
}
