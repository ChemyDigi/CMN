import HeroCarousel from "@/components/GeneralHeroCarousel";
 
import RefAcHeroSection from "@/components/AC-Ref/refrigeratorHero";
import ProductSection from "@/components/AC-Ref/ProductSection";

export default function Home() {
  return (
    <main>
      <RefAcHeroSection />
      <HeroCarousel page="RefAC" />
     <ProductSection/>
    </main>
  );
}
