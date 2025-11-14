import HeroSection from "../../components/AboutUsComponents/HeroSection";
import Navbar from "../../components/Navbar";   
import Footer from "../../components/Footer";
import AboutSection from "../../components/AboutUsComponents/AboutSection";
 import TimelineSection from "../../components/AboutUsComponents/TimelineSection";
import MissionVisionSection  from "@/components/AboutUsComponents/MissionVisionSection";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <MissionVisionSection />
      <Footer />
    </main>
  );
}
