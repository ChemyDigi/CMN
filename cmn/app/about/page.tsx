import HeroSection from "../../components/AboutUsComponents/HeroSection";
import Navbar from "../../components/Navbar";   
import Footer from "../../components/Footer";
// import AboutSection from "./components/AboutSection";
// import TimelineSection from "./components/TimelineSection";
// import MissionVisionSection from "./components/MissionVisionSection";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <HeroSection />
      {/* <AboutSection />
      <TimelineSection />
      <MissionVisionSection /> */}
      <Footer />
    </main>
  );
}
