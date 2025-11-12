// app/clients/page.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientsHero from "../components/ClientsHero";
import PartnersSection from "../components/PartnersSection";
import TestimonialsSection from "../components/TestimonialsSection";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ClientsHero />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}