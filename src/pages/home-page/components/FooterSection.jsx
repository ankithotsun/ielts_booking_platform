import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Examination',
      links: [
        { label: 'Book Exam', path: '/exam-booking' },
        { label: 'Exam Levels', path: '/exam-booking' },
        { label: 'Test Preparation', path: '#' },
        { label: 'Sample Tests', path: '#' },
        { label: 'Results & Certificates', path: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '#' },
        { label: 'Contact Us', path: '#' },
        { label: 'Technical Support', path: '#' },
        { label: 'Booking Assistance', path: '#' },
        { label: 'FAQ', path: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Study Materials', path: '#' },
        { label: 'Practice Tests', path: '#' },
        { label: 'Score Guide', path: '#' },
        { label: 'Test Centers', path: '#' },
        { label: 'Blog', path: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '#' },
        { label: 'Terms of Service', path: '#' },
        { label: 'Cookie Policy', path: '#' },
        { label: 'Refund Policy', path: '#' },
        { label: 'Accessibility', path: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'YouTube', icon: 'Youtube', url: '#' }
  ];

  const contactInfo = [
    {
      icon: 'Phone',
      label: 'Phone Support',
      value: '+1 (555) 123-4567',
      description: 'Available 24/7'
    },
    {
      icon: 'Mail',
      label: 'Email Support',
      value: 'support@ielts-booking.com',
      description: 'Response within 2 hours'
    },
    {
      icon: 'MapPin',
      label: 'Office Address',
      value: '123 Education Street, Learning City, LC 12345',
      description: 'Visit us Mon-Fri 9AM-6PM'
    }
  ];

  return (
    <footer className="bg-text-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/home-page" className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">IELTS Booking Platform</span>
                <span className="text-sm opacity-80 -mt-1">Your Gateway to Global Opportunities</span>
              </div>
            </Link>
            
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Secure, reliable, and user-friendly IELTS examination booking platform. 
              Join thousands of students who have successfully booked their exams with us.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2 bg-primary-foreground/10 rounded-lg px-3 py-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 bg-primary-foreground/10 rounded-lg px-3 py-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-xs">Official Partner</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-smooth"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-primary-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-12">
          <h3 className="font-semibold text-primary-foreground mb-6 text-center lg:text-left">
            Get in Touch
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((contact) => (
              <div key={contact.label} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={contact.icon} size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-primary-foreground mb-1">
                    {contact.label}
                  </h4>
                  <p className="text-primary-foreground/80 text-sm mb-1">
                    {contact.value}
                  </p>
                  <p className="text-primary-foreground/60 text-xs">
                    {contact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm text-center md:text-left">
              © {currentYear} IELTS Booking Platform. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 text-sm">
              <Link to="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Privacy Policy
              </Link>
              <Link to="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Terms of Service
              </Link>
              <Link to="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Cookie Settings
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-4 pt-4 border-t border-primary-foreground/10">
            <p className="text-primary-foreground/60 text-xs">
              IELTS is a registered trademark of the British Council, IDP Education, and Cambridge Assessment English.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;