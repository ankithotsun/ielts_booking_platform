import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange, amount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { value: 'USD', label: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 1.0 },
    { value: 'EUR', label: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.85 },
    { value: 'GBP', label: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.73 },
    { value: 'INR', label: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rate: 83.12 },
    { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rate: 1.35 },
    { value: 'AUD', label: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rate: 1.52 },
    { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rate: 1.34 },
    { value: 'JPY', label: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rate: 149.50 }
  ];

  const selectedCurrencyData = currencies.find(c => c.value === selectedCurrency) || currencies[0];

  const formatAmount = (amount, currency) => {
    const currencyData = currencies.find(c => c.value === currency);
    const convertedAmount = amount * currencyData.rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'JPY' ? 0 : 2
    }).format(convertedAmount);
  };

  const currencyOptions = currencies.map(currency => ({
    value: currency.value,
    label: `${currency.flag} ${currency.label} (${currency.symbol})`,
    description: `1 USD = ${currency.rate} ${currency.value}`
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="DollarSign" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Currency</h3>
          <p className="text-sm text-text-secondary">Select your preferred currency</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select
          label="Payment Currency"
          options={currencyOptions}
          value={selectedCurrency}
          onChange={onCurrencyChange}
          searchable
          className="w-full"
        />

        {/* Amount Display */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Total Amount</span>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {formatAmount(amount, selectedCurrency)}
              </div>
              {selectedCurrency !== 'USD' && (
                <div className="text-xs text-text-secondary">
                  ≈ {formatAmount(amount, 'USD')} USD
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        {selectedCurrency !== 'USD' && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-primary" />
              <div className="text-xs text-primary">
                <span className="font-medium">Exchange Rate:</span> 1 USD = {selectedCurrencyData.rate} {selectedCurrency}
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-1 ml-6">
              Rates are updated in real-time and may vary at the time of payment processing.
            </p>
          </div>
        )}

        {/* Popular Currencies Quick Select */}
        <div>
          <p className="text-sm font-medium text-text-primary mb-2">Quick Select</p>
          <div className="grid grid-cols-4 gap-2">
            {currencies.slice(0, 4).map((currency) => (
              <button
                key={currency.value}
                onClick={() => onCurrencyChange(currency.value)}
                className={`p-2 rounded-lg border transition-smooth text-center ${
                  selectedCurrency === currency.value
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-surface hover:bg-muted text-text-secondary'
                }`}
              >
                <div className="text-lg mb-1">{currency.flag}</div>
                <div className="text-xs font-medium">{currency.value}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySelector;