import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignalsSection = () => {
  const trustIndicators = [
    {
      id: 'ssl',
      icon: 'Shield',
      title: 'SSL Certificate',
      description: '256-bit encryption protects your data',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'pci',
      icon: 'CreditCard',
      title: 'PCI DSS Compliant',
      description: 'Secure payment processing standards',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'official',
      icon: 'Award',
      title: 'Official IELTS Partner',
      description: 'Authorized examination center',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'support',
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const statistics = [
    {
      id: 'students',
      value: '50,000+',
      label: 'Students Registered',
      icon: 'Users'
    },
    {
      id: 'exams',
      value: '25,000+',
      label: 'Exams Conducted',
      icon: 'FileText'
    },
    {
      id: 'satisfaction',
      value: '98%',
      label: 'Satisfaction Rate',
      icon: 'Star'
    },
    {
      id: 'countries',
      value: '45+',
      label: 'Countries Served',
      icon: 'Globe'
    }
  ];

  const certifications = [
    {
      id: 'iso',
      name: 'ISO 27001',
      description: 'Information Security Management'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliant',
      description: 'Data Protection Regulation'
    },
    {
      id: 'cambridge',
      name: 'Cambridge Assessment',
      description: 'Official Partner'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust Indicators */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Trusted by Students Worldwide
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
            Your security and success are our top priorities. We maintain the highest 
            standards of data protection and examination integrity.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator) => (
              <div
                key={indicator.id}
                className="bg-surface border border-border rounded-xl p-6 hover:shadow-subtle transition-smooth"
              >
                <div className={`w-12 h-12 ${indicator.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={indicator.icon} size={20} className={indicator.color} />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">
                  {indicator.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics */}
        <div className="bg-surface rounded-2xl border border-border p-8 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat.icon} size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-8">
            Certified & Compliant
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center space-x-3 bg-surface border border-border rounded-lg px-4 py-3"
              >
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <Icon name="Shield" size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-text-primary text-sm">
                    {cert.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {cert.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-text-secondary">
              All personal data is encrypted and stored securely. We never share your information with third parties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;