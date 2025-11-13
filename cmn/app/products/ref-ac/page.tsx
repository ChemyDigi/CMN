import Refrigerator from "@/components/refac";
import HeroCarousel from "@/components/GeneralHeroCarousel";
import RefAcHeroSection from "@/components/refrigeratorHero";

export default function Home() {
  return (
    <main>
      <RefAcHeroSection />
      <HeroCarousel page="products" />
      <Refrigerator />
    </main>
  );
}
