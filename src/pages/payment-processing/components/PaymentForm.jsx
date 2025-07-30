import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PaymentForm = ({ paymentMethod, onPaymentSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    bankCode: '',
    walletProvider: '',
    savePaymentMethod: false,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Please accept the terms and conditions';
    }

    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!formData.expiryMonth) {
        newErrors.expiryMonth = 'Please select expiry month';
      }
      if (!formData.expiryYear) {
        newErrors.expiryYear = 'Please select expiry year';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = 'Please enter cardholder name';
      }
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId || !formData.upiId.includes('@')) {
        newErrors.upiId = 'Please enter a valid UPI ID';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!formData.bankCode) {
        newErrors.bankCode = 'Please select your bank';
      }
    } else if (paymentMethod === 'wallet') {
      if (!formData.walletProvider) {
        newErrors.walletProvider = 'Please select wallet provider';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onPaymentSubmit(formData);
    }
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(new Date().getFullYear() + i),
    label: String(new Date().getFullYear() + i)
  }));

  const bankOptions = [
    { value: 'sbi', label: 'State Bank of India' },
    { value: 'hdfc', label: 'HDFC Bank' },
    { value: 'icici', label: 'ICICI Bank' },
    { value: 'axis', label: 'Axis Bank' },
    { value: 'kotak', label: 'Kotak Mahindra Bank' },
    { value: 'pnb', label: 'Punjab National Bank' }
  ];

  const walletOptions = [
    { value: 'paytm', label: 'Paytm' },
    { value: 'phonepe', label: 'PhonePe' },
    { value: 'googlepay', label: 'Google Pay' },
    { value: 'amazonpay', label: 'Amazon Pay' }
  ];

  const renderCardForm = () => (
    <div className="space-y-4">
      <Input
        label="Card Number"
        type="text"
        placeholder="1234 5678 9012 3456"
        value={formData.cardNumber}
        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
        error={errors.cardNumber}
        maxLength={19}
        required
      />

      <Input
        label="Cardholder Name"
        type="text"
        placeholder="John Doe"
        value={formData.cardholderName}
        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
        error={errors.cardholderName}
        required
      />

      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Month"
          options={monthOptions}
          value={formData.expiryMonth}
          onChange={(value) => handleInputChange('expiryMonth', value)}
          error={errors.expiryMonth}
          placeholder="MM"
          required
        />

        <Select
          label="Year"
          options={yearOptions}
          value={formData.expiryYear}
          onChange={(value) => handleInputChange('expiryYear', value)}
          error={errors.expiryYear}
          placeholder="YYYY"
          required
        />

        <Input
          label="CVV"
          type="password"
          placeholder="123"
          value={formData.cvv}
          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
          error={errors.cvv}
          maxLength={4}
          required
        />
      </div>
    </div>
  );

  const renderUPIForm = () => (
    <div className="space-y-4">
      <Input
        label="UPI ID"
        type="text"
        placeholder="yourname@paytm"
        value={formData.upiId}
        onChange={(e) => handleInputChange('upiId', e.target.value)}
        error={errors.upiId}
        required
      />
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm text-primary">
            You will be redirected to your UPI app to complete the payment
          </span>
        </div>
      </div>
    </div>
  );

  const renderNetBankingForm = () => (
    <div className="space-y-4">
      <Select
        label="Select Your Bank"
        options={bankOptions}
        value={formData.bankCode}
        onChange={(value) => handleInputChange('bankCode', value)}
        error={errors.bankCode}
        placeholder="Choose your bank"
        searchable
        required
      />
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm text-warning">
            You will be redirected to your bank's website to complete the payment
          </span>
        </div>
      </div>
    </div>
  );

  const renderWalletForm = () => (
    <div className="space-y-4">
      <Select
        label="Select Wallet"
        options={walletOptions}
        value={formData.walletProvider}
        onChange={(value) => handleInputChange('walletProvider', value)}
        error={errors.walletProvider}
        placeholder="Choose wallet provider"
        required
      />
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm text-primary">
            You will be redirected to your wallet app to complete the payment
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="Lock" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Payment Details</h3>
          <p className="text-sm text-text-secondary">Enter your payment information securely</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {paymentMethod === 'card' && renderCardForm()}
        {paymentMethod === 'upi' && renderUPIForm()}
        {paymentMethod === 'netbanking' && renderNetBankingForm()}
        {paymentMethod === 'wallet' && renderWalletForm()}

        {/* Save Payment Method */}
        {paymentMethod === 'card' && (
          <Checkbox
            label="Save this payment method for future use"
            description="Your card details will be securely stored for faster checkout"
            checked={formData.savePaymentMethod}
            onChange={(e) => handleInputChange('savePaymentMethod', e.target.checked)}
          />
        )}

        {/* Terms and Conditions */}
        <Checkbox
          label="I agree to the Terms and Conditions and Privacy Policy"
          description="By proceeding, you accept our payment terms and data handling policies"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />

        {/* Security Notice */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-success mb-1">Secure Payment</h4>
              <p className="text-xs text-text-secondary">
                Your payment information is encrypted using 256-bit SSL technology. 
                We never store your complete card details on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isProcessing}
          disabled={isProcessing}
          iconName={isProcessing ? "Loader2" : "CreditCard"}
          iconPosition="left"
        >
          {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;