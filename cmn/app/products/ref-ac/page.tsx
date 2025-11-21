import RefAcHeroSection from "@/components/AC-Ref/refrigeratorHero";
import ProductSection from "@/components/AC-Ref/ProductSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 
import IntroText from "@/components/AC-Ref/IntroText"

export default function Home() {
  return (
    <main>
      <Navbar />
      <RefAcHeroSection />
      <IntroText/>
      {/* <HeroCarousel page="RefAC" /> */}
     <ProductSection/>
     <Footer />
    </main>
  );
}
