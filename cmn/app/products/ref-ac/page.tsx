import HeroCarousel from "@/components/GeneralHeroCarousel";
 
import RefAcHeroSection from "@/components/refrigeratorHero";
import ProductSection from "@/components/ACandRef/ProductSection";

export default function Home() {
  return (
    <main>
      <RefAcHeroSection />
      <HeroCarousel page="RefAC" />
     <ProductSection/>
    </main>
  );
}
