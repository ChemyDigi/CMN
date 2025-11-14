import { ReactElement } from 'react';
import { Contact_Form } from '../../components/Contact/Contact_Form';
import { Contact_Hero } from '../../components/Contact/Contact_Hero';
import { Location_info } from '../../components/Contact/Location_info';

const ContactPage = (): ReactElement => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="relative">
        <Contact_Hero />
        <Contact_Form />
        <Location_info />
      </div>
    </div>
  );
};

export default ContactPage;
