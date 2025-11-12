// app/clients/page.tsx

import ClientsHero from "../../components/ClientsHero";
import PartnersSection from "../../components/PartnersSection";
import TestimonialsSection from "../../components/TestimonialsSection";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ClientsHero />
      <PartnersSection />
      <TestimonialsSection />
      
    </div>
  );
}