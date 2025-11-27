import Navbar from "@/components/Navbar";   
import Footer from "@/components/Footer";   
import WorldwideImpact from "@/components/CmnServices/WorldwideImpact";
import IntroText from "@/components/CmnServices/IntroText";
import CmnServiceHero from "@/components/CmnServices/CmnServicesHero";
import Solutions from "@/components/CmnServices/Solutions";

export default function CmnServicesPage() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
        <CmnServiceHero/>
        <IntroText/>
        <WorldwideImpact/>
        <Solutions/>
         <Footer/>
      
      
      
    </div>
  );
}