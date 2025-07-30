import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentStatusModal = ({ isOpen, status, paymentData, onClose, onRetry }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: 'Loader2',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          title: 'Processing Payment',
          message: 'Please wait while we process your payment. Do not close this window.',
          showSpinner: true
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          title: 'Payment Successful!',
          message: 'Your payment has been processed successfully. You will receive a confirmation email shortly.',
          showSpinner: false
        };
      case 'failed':
        return {
          icon: 'XCircle',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          title: 'Payment Failed',
          message: paymentData?.errorMessage || 'Your payment could not be processed. Please try again or use a different payment method.',
          showSpinner: false
        };
      case 'verification':
        return {
          icon: 'Shield',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          title: 'Additional Verification Required',
          message: 'Your bank requires additional verification. Please complete the verification process.',
          showSpinner: false
        };
      default:
        return {
          icon: 'Info',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          title: 'Processing',
          message: 'Please wait...',
          showSpinner: true
        };
    }
  };

  const config = getStatusConfig();

  const handleProceedToConfirmation = () => {
    navigate('/booking-confirmation');
  };

  const handleTryAgain = () => {
    if (onRetry) {
      onRetry();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-moderate max-w-md w-full">
        <div className="p-6">
          {/* Status Icon */}
          <div className={`flex items-center justify-center w-16 h-16 ${config.bgColor} rounded-full mx-auto mb-4`}>
            <Icon 
              name={config.icon} 
              size={32} 
              className={`${config.iconColor} ${config.showSpinner ? 'animate-spin' : ''}`} 
            />
          </div>

          {/* Title and Message */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {config.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {config.message}
            </p>
          </div>

          {/* Payment Details (for success/failed states) */}
          {(status === 'success' || status === 'failed') && paymentData && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Transaction ID</span>
                  <span className="text-sm font-mono text-text-primary">
                    {paymentData.transactionId || 'TXN123456789'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Amount</span>
                  <span className="text-sm font-medium text-text-primary">
                    {paymentData.amount || '$245.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Payment Method</span>
                  <span className="text-sm text-text-primary">
                    {paymentData.paymentMethod || 'Credit Card'}
                  </span>
                </div>
                {status === 'success' && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Booking Reference</span>
                    <span className="text-sm font-mono text-primary">
                      {paymentData.bookingReference || 'IELTS2025001234'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'processing' && (
              <div className="text-center">
                <p className="text-xs text-text-secondary">
                  This may take a few moments...
                </p>
              </div>
            )}

            {status === 'success' && (
              <>
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleProceedToConfirmation}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View Booking Confirmation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={onClose}
                >
                  Close
                </Button>
              </>
            )}

            {status === 'failed' && (
              <>
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleTryAgain}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => navigate('/exam-booking')}
                >
                  Back to Booking
                </Button>
              </>
            )}

            {status === 'verification' && (
              <>
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={() => window.open(paymentData?.verificationUrl, '_blank')}
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  Complete Verification
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>

          {/* Help Text */}
          {status === 'failed' && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-text-secondary text-center">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@ielts-booking.com" className="text-primary hover:underline">
                  support@ielts-booking.com
                </a>{' '}
                or call +1-800-IELTS-HELP
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusModal;