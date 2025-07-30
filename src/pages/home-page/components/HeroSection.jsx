import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <Icon name="GraduationCap" size={24} color="white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-primary">IELTS</h1>
                <p className="text-sm text-text-secondary -mt-1">International English Language Testing System</p>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Your Gateway to
              <span className="text-primary block">Global Opportunities</span>
            </h2>
            
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0">
              Book your IELTS examination with confidence. Choose from multiple exam levels, 
              flexible scheduling, and secure online payment processing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/exam-booking">
                <Button variant="default" size="lg" iconName="Calendar" iconPosition="left" className="w-full sm:w-auto">
                  Book Your Exam
                </Button>
              </Link>
              <Button variant="outline" size="lg" iconName="Info" iconPosition="left" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-text-secondary">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={16} className="text-success" />
                <span className="text-sm text-text-secondary">PCI Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-success" />
                <span className="text-sm text-text-secondary">Official Partner</span>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="relative bg-surface rounded-2xl shadow-moderate p-8 border border-border">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} color="white" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Flexible Scheduling</h3>
                    <p className="text-sm text-text-secondary">Choose your preferred date and time</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Secure Payment</h3>
                    <p className="text-sm text-text-secondary">Multiple payment options available</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Instant Confirmation</h3>
                    <p className="text-sm text-text-secondary">Receive booking details immediately</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-surface rounded-xl shadow-moderate p-4 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-text-primary">50,000+</div>
                  <div className="text-xs text-text-secondary">Students Registered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;