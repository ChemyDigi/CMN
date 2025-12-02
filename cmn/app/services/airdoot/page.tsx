import Navbar from "@/components/Navbar";   
import Hero from "@/components/AirDoot/Hero"
import KeyServicesSection from "@/components/AirDoot/KeyServicesSection";
import Steps from "@/components/AirDoot/Steps";
import EaseOfServiceSection from "@/components/AirDoot/EaseOfAirDoot";
import Footer from "@/components/Footer";   
export default function AirdootServicesPage() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
        <Hero />
        <KeyServicesSection />
        <Steps/>
        <EaseOfServiceSection />
        <Footer/>
    </div>
  );
}