import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailConfirmationStatus = ({ userEmail, bookingReference }) => {
  const [emailStatus, setEmailStatus] = useState('sending');
  const [resendCount, setResendCount] = useState(0);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Simulate email sending process
    const timer = setTimeout(() => {
      setEmailStatus('delivered');
      setCanResend(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendEmail = () => {
    setEmailStatus('sending');
    setResendCount(prev => prev + 1);
    setCanResend(false);

    // Simulate resend process
    setTimeout(() => {
      setEmailStatus('delivered');
      setCanResend(true);
    }, 2000);
  };

  const getStatusConfig = () => {
    switch (emailStatus) {
      case 'sending':
        return {
          icon: 'Mail',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          title: 'Sending Confirmation Email',
          message: 'Your booking confirmation is being sent...',
          showSpinner: true
        };
      case 'delivered':
        return {
          icon: 'CheckCircle',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'Email Confirmation Sent',
          message: `Confirmation email delivered to ${userEmail}`,
          showSpinner: false
        };
      case 'failed':
        return {
          icon: 'AlertCircle',
          iconColor: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          title: 'Email Delivery Failed',
          message: 'Unable to deliver confirmation email. Please check your email address.',
          showSpinner: false
        };
      default:
        return {
          icon: 'Mail',
          iconColor: 'text-text-secondary',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          title: 'Email Status Unknown',
          message: 'Checking email delivery status...',
          showSpinner: true
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Mail" size={20} className="mr-2 text-primary" />
          Email Confirmation
        </h3>

        <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-lg p-4 mb-4`}>
          <div className="flex items-start">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface mr-3 flex-shrink-0">
              {statusConfig.showSpinner ? (
                <div className="animate-spin">
                  <Icon name="Loader2" size={18} className={statusConfig.iconColor} />
                </div>
              ) : (
                <Icon name={statusConfig.icon} size={18} className={statusConfig.iconColor} />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-text-primary mb-1">
                {statusConfig.title}
              </h4>
              <p className="text-sm text-text-secondary">
                {statusConfig.message}
              </p>
            </div>
          </div>
        </div>

        {emailStatus === 'delivered' && (
          <div className="space-y-3">
            <div className="text-sm text-text-secondary">
              <p className="mb-2">Your confirmation email includes:</p>
              <ul className="space-y-1 ml-4">
                <li className="flex items-center">
                  <Icon name="Check" size={14} className="mr-2 text-success" />
                  Booking reference number
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={14} className="mr-2 text-success" />
                  Exam details and schedule
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={14} className="mr-2 text-success" />
                  Payment receipt
                </li>
                <li className="flex items-center">
                  <Icon name="Check" size={14} className="mr-2 text-success" />
                  Preparation instructions
                </li>
              </ul>
            </div>

            {canResend && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendEmail}
                  iconName="RefreshCw"
                  iconPosition="left"
                  disabled={resendCount >= 3}
                >
                  {resendCount >= 3 ? 'Resend Limit Reached' : 'Resend Email'}
                </Button>
                
                {resendCount > 0 && (
                  <span className="text-xs text-text-secondary self-center">
                    Resent {resendCount} time{resendCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {emailStatus === 'failed' && (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleResendEmail}
              iconName="RefreshCw"
              iconPosition="left"
              disabled={!canResend}
            >
              Retry Sending
            </Button>
            
            <div className="text-sm text-text-secondary">
              <p>If you continue to experience issues, please:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Check your spam/junk folder</li>
                <li>• Verify your email address is correct</li>
                <li>• Contact our support team for assistance</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-text-secondary">
            <p>
              <strong>Note:</strong> If you don't receive the email within 10 minutes, 
              please check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationStatus;