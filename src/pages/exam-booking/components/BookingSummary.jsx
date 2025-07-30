import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BookingSummary = ({ 
  selectedLevel, 
  selectedOption, 
  selectedDate, 
  selectedTime, 
  prerequisiteUploaded,
  onBookingHold 
}) => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [holdTimer, setHoldTimer] = useState(null);

  const currencies = [
    { value: 'USD', label: 'USD ($)', rate: 1 },
    { value: 'EUR', label: 'EUR (€)', rate: 0.85 },
    { value: 'GBP', label: 'GBP (£)', rate: 0.73 },
    { value: 'INR', label: 'INR (₹)', rate: 83.12 },
    { value: 'CAD', label: 'CAD (C$)', rate: 1.35 },
    { value: 'AUD', label: 'AUD (A$)', rate: 1.52 }
  ];

  const examPrices = {
    oral: 85,
    written: 165,
    both: 230
  };

  const getCurrentCurrency = () => {
    return currencies.find(c => c.value === selectedCurrency);
  };

  const formatPrice = (price) => {
    const currency = getCurrentCurrency();
    const convertedPrice = price * currency.rate;
    const symbol = currency.label.match(/\((.+)\)/)[1];
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const getExamDetails = () => {
    const details = {
      oral: {
        name: 'Oral Only',
        description: 'Speaking test only',
        duration: '20 minutes',
        includes: ['One-on-one interview', 'Real-time assessment', 'Immediate feedback']
      },
      written: {
        name: 'Written Only', 
        description: 'Reading, writing and listening tests',
        duration: '2h 45min',
        includes: ['Reading comprehension', 'Writing tasks', 'Listening exercises']
      },
      both: {
        name: 'Both Examinations',
        description: 'Complete IELTS test',
        duration: '3 hours',
        includes: ['All four skills', 'Complete certification', 'Speaking + Written']
      }
    };
    
    return details[selectedOption] || {};
  };

  const isBookingComplete = () => {
    const hasBasicSelection = selectedLevel && selectedOption && selectedDate && selectedTime;
    const hasPrerequisite = selectedOption === 'both' || prerequisiteUploaded;
    return hasBasicSelection && hasPrerequisite;
  };

  const handleProceedToPayment = () => {
    if (!isBookingComplete()) return;
    
    // Start booking hold timer (15 minutes)
    const timer = setTimeout(() => {
      alert('Booking hold expired. Please restart the booking process.');
      // In real app, this would clear the booking hold
    }, 15 * 60 * 1000);
    
    setHoldTimer(timer);
    onBookingHold(true);
    
    // Navigate to payment with booking details
    navigate('/payment-processing', {
      state: {
        bookingDetails: {
          level: selectedLevel,
          option: selectedOption,
          date: selectedDate,
          time: selectedTime,
          currency: selectedCurrency,
          price: examPrices[selectedOption]
        }
      }
    });
  };

  const examDetails = getExamDetails();
  const basePrice = examPrices[selectedOption] || 0;

  if (!selectedLevel || !selectedOption) {
    return (
      <div className="lg:sticky lg:top-24">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon name="BookOpen" size={24} className="text-text-secondary" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Booking Summary</h3>
            <p className="text-text-secondary">
              Select your exam level and type to see booking details
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-card border border-border rounded-lg shadow-subtle">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Booking Summary</h3>
              <p className="text-sm text-text-secondary">Review your selection</p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-6">
          {/* Exam Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="GraduationCap" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">Level</span>
            </div>
            <span className="font-medium text-text-primary">{selectedLevel}</span>
          </div>

          {/* Exam Type */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Icon name="BookOpen" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Exam Type</span>
              </div>
              <span className="font-medium text-text-primary">{examDetails.name}</span>
            </div>
            <div className="ml-7">
              <p className="text-xs text-text-secondary mb-2">{examDetails.description}</p>
              <div className="space-y-1">
                {examDetails.includes?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={12} className="text-success" />
                    <span className="text-xs text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Date & Time */}
          {selectedDate && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Date</span>
              </div>
              <span className="font-medium text-text-primary">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}

          {selectedTime && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Time</span>
              </div>
              <span className="font-medium text-text-primary">
                {selectedTime} ({examDetails.duration})
              </span>
            </div>
          )}

          {/* Currency Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Currency</label>
            <Select
              options={currencies}
              value={selectedCurrency}
              onChange={setSelectedCurrency}
              placeholder="Select currency"
            />
          </div>

          {/* Pricing */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Exam Fee</span>
              <span className="font-medium text-text-primary">{formatPrice(basePrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Processing Fee</span>
              <span className="font-medium text-text-primary">{formatPrice(5)}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-text-primary">Total</span>
                <span className="text-xl font-bold text-primary">{formatPrice(basePrice + 5)}</span>
              </div>
            </div>
          </div>

          {/* Prerequisites Status */}
          {selectedOption !== 'both' && (
            <div className={`p-3 rounded-lg border ${
              prerequisiteUploaded 
                ? 'bg-success/5 border-success/20' :'bg-warning/5 border-warning/20'
            }`}>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={prerequisiteUploaded ? "CheckCircle" : "AlertCircle"} 
                  size={16} 
                  className={prerequisiteUploaded ? "text-success" : "text-warning"} 
                />
                <span className={`text-sm font-medium ${
                  prerequisiteUploaded ? "text-success" : "text-warning"
                }`}>
                  {prerequisiteUploaded ? 'Prerequisites Met' : 'Upload Required'}
                </span>
              </div>
              {!prerequisiteUploaded && (
                <p className="text-xs text-text-secondary mt-1 ml-6">
                  Upload your {selectedOption === 'oral' ? 'written' : 'oral'} exam certificate
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="p-6 border-t border-border">
          <Button
            variant="default"
            size="lg"
            fullWidth
            disabled={!isBookingComplete()}
            onClick={handleProceedToPayment}
            className="mb-3"
          >
            {isBookingComplete() ? 'Proceed to Payment' : 'Complete Selection'}
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary">
              Secure booking • 15-minute hold • SSL encrypted
            </p>
          </div>
        </div>

        {/* Booking Hold Timer */}
        {holdTimer && (
          <div className="p-4 bg-warning/5 border-t border-warning/20">
            <div className="flex items-center space-x-2">
              <Icon name="Timer" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">
                Booking held for 15 minutes
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;