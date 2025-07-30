import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: '256-bit SSL Encryption',
      description: 'Your data is protected with bank-level security',
      status: 'active'
    },
    {
      icon: 'Lock',
      title: 'PCI DSS Compliant',
      description: 'Meets highest payment security standards',
      status: 'active'
    },
    {
      icon: 'Eye',
      title: 'Fraud Detection',
      description: 'Advanced monitoring protects your transactions',
      status: 'active'
    },
    {
      icon: 'Database',
      title: 'Secure Storage',
      description: 'Payment details are tokenized and encrypted',
      status: 'active'
    }
  ];

  const trustBadges = [
    { name: 'Razorpay', logo: '🔒', description: 'Powered by Razorpay' },
    { name: 'SSL', logo: '🛡️', description: 'SSL Secured' },
    { name: 'PCI', logo: '✅', description: 'PCI Compliant' },
    { name: 'Norton', logo: '🔐', description: 'Norton Secured' }
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="ShieldCheck" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Security Features</h3>
            <p className="text-sm text-text-secondary">Your payment is protected by multiple security layers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary">{feature.title}</h4>
                <p className="text-xs text-text-secondary mt-0.5">{feature.description}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <h3 className="text-sm font-medium text-text-primary mb-4 text-center">
          Trusted Payment Partners
        </h3>
        
        <div className="grid grid-cols-4 gap-4">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl mb-2">{badge.logo}</div>
              <span className="text-xs font-medium text-text-primary text-center">
                {badge.description}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>24/7 Monitoring</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={12} />
              <span>Global Security</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>Trusted by Millions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Security Tips</h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Never share your payment details via email or phone</li>
              <li>• Always verify the URL shows "https://" and the lock icon</li>
              <li>• Use a secure network connection for payments</li>
              <li>• Keep your browser and device updated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;