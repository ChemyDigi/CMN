import ProductSection from "@/components/Tools/ProductSection";
import ToolsHeroSection from "@/components/Tools/ToolsHeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroText from "@/components/Tools/IntroText";
export default function Home() {
  return (
    <main>
      <Navbar />
      <ToolsHeroSection />
      <IntroText/>
      <ProductSection />
      <Footer />
    </main>
  );
}
