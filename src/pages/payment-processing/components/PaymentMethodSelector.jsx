import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethodSelector = ({ selectedMethod, onMethodSelect, currency = 'USD' }) => {
  const [expandedMethod, setExpandedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCard',
      popular: true,
      brands: ['visa', 'mastercard', 'amex']
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'All major banks supported',
      icon: 'Building2',
      popular: false,
      brands: ['sbi', 'hdfc', 'icici', 'axis']
    },
    {
      id: 'upi',
      name: 'UPI',
      description: 'Pay using UPI ID or QR code',
      icon: 'Smartphone',
      popular: true,
      brands: ['googlepay', 'phonepe', 'paytm']
    },
    {
      id: 'wallet',
      name: 'Digital Wallets',
      description: 'Paytm, PhonePe, Amazon Pay',
      icon: 'Wallet',
      popular: false,
      brands: ['paytm', 'phonepe', 'amazonpay']
    }
  ];

  const handleMethodSelect = (methodId) => {
    onMethodSelect(methodId);
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

  const getBrandIcon = (brand) => {
    const brandIcons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      sbi: '🏦',
      hdfc: '🏦',
      icici: '🏦',
      axis: '🏦',
      googlepay: '📱',
      phonepe: '📱',
      paytm: '📱',
      amazonpay: '🛒'
    };
    return brandIcons[brand] || '💳';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="CreditCard" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Payment Method</h3>
          <p className="text-sm text-text-secondary">Choose your preferred payment option</p>
        </div>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => handleMethodSelect(method.id)}
              className={`w-full p-4 text-left transition-smooth hover:bg-muted/50 ${
                selectedMethod === method.id ? 'bg-primary/5 border-primary' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                    selectedMethod === method.id ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={method.icon} 
                      size={20} 
                      className={selectedMethod === method.id ? 'text-primary' : 'text-text-secondary'} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-text-primary">{method.name}</h4>
                      {method.popular && (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {method.brands.slice(0, 3).map((brand, index) => (
                      <span key={index} className="text-lg">{getBrandIcon(brand)}</span>
                    ))}
                  </div>
                  <Icon 
                    name={selectedMethod === method.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                </div>
              </div>
            </button>

            {selectedMethod === method.id && expandedMethod === method.id && (
              <div className="border-t border-border bg-muted/30 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {method.brands.map((brand, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-surface rounded border border-border">
                      <span className="text-lg">{getBrandIcon(brand)}</span>
                      <span className="text-xs font-medium text-text-primary capitalize">{brand}</span>
                    </div>
                  ))}
                </div>
                {method.id === 'card' && (
                  <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span className="text-xs text-success font-medium">
                        Your card details are encrypted and secure
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Security Badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} className="text-success" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} className="text-success" />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;