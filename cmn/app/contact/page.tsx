import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ReactElement } from 'react';
import { Contact_Form } from '../../components/Contact/Contact_Form';
import Contact_Hero from '../../components/Contact/Contact_Hero';
import { Location_info } from '../../components/Contact/Location_info';
import NewContactContent from '../../components/Contact/NewContactContent';

const ContactPage = (): ReactElement => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="relative">
        <Navbar />
        
        {/* Hero Section - Fixed positioning to avoid navbar push */}
        <div className="lg:pt-0">
          <Contact_Hero />
        </div>
        <NewContactContent />
        
       
        
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;