import HeroCarousel from "@/components/GeneralHeroCarousel";
import Refrigerator from "@/components/refac";
import RefAcHeroSection from "@/components/refrigeratorHero";

export default function Home() {
  return (
    <main>
      <RefAcHeroSection />
      <HeroCarousel page="RefAC" />
      <Refrigerator />
    </main>
  );
}
