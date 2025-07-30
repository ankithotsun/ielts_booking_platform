import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BookingProgressIndicator = () => {
  const location = useLocation();
  
  const bookingSteps = [
    {
      id: 1,
      label: 'Select Exam',
      path: '/exam-booking',
      icon: 'Calendar',
      description: 'Choose your exam type and date'
    },
    {
      id: 2,
      label: 'Payment',
      path: '/payment-processing',
      icon: 'CreditCard',
      description: 'Complete your payment'
    },
    {
      id: 3,
      label: 'Confirmation',
      path: '/booking-confirmation',
      icon: 'CheckCircle',
      description: 'Booking confirmed'
    }
  ];

  const getCurrentStepIndex = () => {
    const currentPath = location.pathname;
    const stepIndex = bookingSteps.findIndex(step => step.path === currentPath);
    return stepIndex >= 0 ? stepIndex : -1;
  };

  const currentStepIndex = getCurrentStepIndex();
  
  // Only show progress indicator on booking workflow pages
  if (currentStepIndex === -1) {
    return null;
  }

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepIndex) => {
    const status = getStepStatus(stepIndex);
    return status === 'completed' ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-surface border-b border-border py-4">
      <div className="max-w-4xl mx-auto px-6">
        {/* Desktop Progress Indicator */}
        <div className="hidden md:flex items-center justify-between">
          {bookingSteps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === bookingSteps.length - 1;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-state ${getStepClasses(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${status === 'current' ? 'text-primary' : status === 'completed' ? 'text-success' : 'text-text-secondary'}`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-text-secondary mt-1 max-w-32">
                      {step.description}
                    </div>
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-state ${getConnectorClasses(index)}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-text-primary">
              Step {currentStepIndex + 1} of {bookingSteps.length}
            </div>
            <div className="text-xs text-text-secondary">
              {Math.round(((currentStepIndex + 1) / bookingSteps.length) * 100)}% Complete
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-3">
            <div 
              className="bg-primary h-2 rounded-full transition-state"
              style={{ width: `${((currentStepIndex + 1) / bookingSteps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStepClasses('current')}`}>
              <Icon name={bookingSteps[currentStepIndex].icon} size={14} />
            </div>
            <div>
              <div className="text-sm font-medium text-primary">
                {bookingSteps[currentStepIndex].label}
              </div>
              <div className="text-xs text-text-secondary">
                {bookingSteps[currentStepIndex].description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;