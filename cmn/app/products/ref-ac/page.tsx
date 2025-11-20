import HeroCarousel from "@/components/GeneralHeroCarousel";
 
import RefAcHeroSection from "@/components/AC-Ref/refrigeratorHero";
import ProductSection from "@/components/AC-Ref/ProductSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 

export default function Home() {
  return (
    <main>
      <Navbar />
      <RefAcHeroSection />
      {/* <HeroCarousel page="RefAC" /> */}
     <ProductSection/>
     <Footer />
    </main>
  );
}
