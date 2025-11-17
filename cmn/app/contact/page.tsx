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
        <Contact_Hero />
        
        {/* Combined Locations and Contact Form Section */}
        <section className="relative bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Locations Section - Left Side */}
              <div className="lg:w-2/3 lg:pl-8">
                <Location_info />
              </div>
              
              {/* Contact Form - Right Side - Will appear with first location */}
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