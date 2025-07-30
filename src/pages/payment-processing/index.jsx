import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import NotificationStatusBar from '../../components/ui/NotificationStatusBar';
import BookingSummaryCard from './components/BookingSummaryCard';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import CurrencySelector from './components/CurrencySelector';
import PaymentForm from './components/PaymentForm';
import PaymentStatusModal from './components/PaymentStatusModal';
import SecurityIndicators from './components/SecurityIndicators';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  // Mock booking data - in real app, this would come from previous step or API
  const [bookingData] = useState({
    examLevel: 'B2 - Upper Intermediate',
    examType: 'Both (Oral + Written)',
    testCenter: 'London Test Center - Central',
    examDate: '2025-03-15',
    examTime: '09:00',
    duration: '3 hours 30 minutes',
    examFee: 215.00,
    additionalServices: [
      { name: 'Express Results', price: 15.00 },
      { name: 'Certificate Delivery', price: 10.00 }
    ],
    processingFee: 5.00,
    tax: 24.50,
    totalAmount: 269.50,
    bookingReference: 'IELTS2025001234'
  });

  useEffect(() => {
    // Check if user came from exam booking page
    if (!location.state?.fromBooking) {
      // In real app, you might redirect to booking page or fetch booking data
      console.log('User accessed payment page directly');
    }
  }, [location.state]);

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handlePaymentSubmit = async (formData) => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setShowStatusModal(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock payment scenarios
      const scenarios = ['success', 'failed', 'verification'];
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      
      // For demo purposes, let's make success more likely
      const finalScenario = Math.random() > 0.3 ? 'success' : randomScenario;

      setPaymentStatus(finalScenario);
      
      if (finalScenario === 'success') {
        setPaymentData({
          transactionId: 'TXN' + Date.now(),
          amount: `${selectedCurrency} ${bookingData.totalAmount}`,
          paymentMethod: getPaymentMethodName(selectedPaymentMethod),
          bookingReference: bookingData.bookingReference,
          timestamp: new Date().toISOString()
        });
      } else if (finalScenario === 'failed') {
        setPaymentData({
          errorMessage: 'Your card was declined. Please check your card details or try a different payment method.',
          errorCode: 'CARD_DECLINED'
        });
      } else if (finalScenario === 'verification') {
        setPaymentData({
          verificationUrl: 'https://bank-verification-demo.com',
          message: 'Additional verification required by your bank'
        });
      }
    } catch (error) {
      setPaymentStatus('failed');
      setPaymentData({
        errorMessage: 'An unexpected error occurred. Please try again.',
        errorCode: 'SYSTEM_ERROR'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getPaymentMethodName = (method) => {
    const names = {
      card: 'Credit/Debit Card',
      upi: 'UPI',
      netbanking: 'Net Banking',
      wallet: 'Digital Wallet'
    };
    return names[method] || 'Unknown';
  };

  const handleRetryPayment = () => {
    setShowStatusModal(false);
    setPaymentStatus('');
    setPaymentData(null);
  };

  const handleBackToBooking = () => {
    navigate('/exam-booking');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingProgressIndicator />
      <NotificationStatusBar />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={handleBackToBooking}
                className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
              >
                <Icon name="ArrowLeft" size={20} className="text-text-primary" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Complete Payment</h1>
                <p className="text-text-secondary mt-1">
                  Secure your IELTS exam booking with our trusted payment partners
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Payment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method Selection */}
              <PaymentMethodSelector
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={handlePaymentMethodSelect}
                currency={selectedCurrency}
              />

              {/* Currency Selection */}
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onCurrencyChange={handleCurrencyChange}
                amount={bookingData.totalAmount}
              />

              {/* Payment Form */}
              <PaymentForm
                paymentMethod={selectedPaymentMethod}
                onPaymentSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
              />

              {/* Security Indicators - Mobile */}
              <div className="lg:hidden">
                <SecurityIndicators />
              </div>
            </div>

            {/* Right Column - Summary and Security */}
            <div className="space-y-6">
              {/* Booking Summary */}
              <BookingSummaryCard
                bookingData={bookingData}
                currency={selectedCurrency}
              />

              {/* Security Indicators - Desktop */}
              <div className="hidden lg:block">
                <SecurityIndicators />
              </div>

              {/* Help Section */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Need Help?</h3>
                    <p className="text-sm text-text-secondary">We're here to assist you</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Live Chat Support
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Call +1-800-IELTS-HELP
                  </Button>

                  <div className="text-xs text-text-secondary text-center pt-2">
                    Available 24/7 for payment assistance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Status Modal */}
      <PaymentStatusModal
        isOpen={showStatusModal}
        status={paymentStatus}
        paymentData={paymentData}
        onClose={() => setShowStatusModal(false)}
        onRetry={handleRetryPayment}
      />
    </div>
  );
};

export default PaymentProcessing;