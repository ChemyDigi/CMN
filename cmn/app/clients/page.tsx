// app/clients/page.tsx

import ClientsHero from "../../components/Clients/ClientsHero";
import PartnersSection from "../../components/Clients/PartnersSection";
import TestimonialsSection from "../../components/Clients/TestimonialsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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