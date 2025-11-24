import Navbar from "@/components/Navbar";   
import Hero from "@/components/AirDoot/Hero"
import IntroText from "@/components/AirDoot/IntroText";
import KeyServicesSection from "@/components/AirDoot/KeyServicesSection";
import Steps from "@/components/AirDoot/Steps";
import Footer from "@/components/Footer";   
export default function AirdootServicesPage() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero />
        <IntroText />
        <KeyServicesSection />
        <Steps/>
        <Footer/>
      
      
      
    </div>
  );
}