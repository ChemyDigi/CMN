import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ReactElement } from 'react';
import { Contact_Form } from '../../components/Contact/Contact_Form';
import { Contact_Hero } from '../../components/Contact/Contact_Hero';
import { Location_info } from '../../components/Contact/Location_info';

const ContactPage = (): ReactElement => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="relative">
        <Navbar />
        
        {/* Hero Section - Fixed positioning to avoid navbar push */}
        <div className="lg:pt-0">
          <Contact_Hero />
        </div>
        
        {/* Mobile & Tablet Layout: Contact Form first, then Locations */}
        <div className="block lg:hidden bg-gray-50">
          <div className="container mx-auto px-6 py-12">
            {/* Contact Form - Top on mobile/tablet */}
            <div className="mb-12">
              <Contact_Form />
            </div>
            
            {/* Locations Info - Bottom on mobile/tablet */}
            <div>
              <Location_info />
            </div>
          </div>
        </div>
        
        {/* Desktop Layout: Side by side */}
        <section className="hidden lg:block relative bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Locations Section - Left Side */}
              <div className="lg:w-2/3 lg:pl-8">
                <Location_info />
              </div>
              
              {/* Contact Form - Right Side */}
              <div className="lg:w-1/3 lg:pr-8">
                <div className="lg:sticky lg:top-24">
                  <Contact_Form />
                </div>
              </div>
              
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;