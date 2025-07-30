import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PostBookingActions = ({ bookingReference, examType }) => {
  const navigate = useNavigate();

  const actionItems = [
    {
      id: 'reschedule',
      title: 'Reschedule Exam',
      description: 'Change your exam date or time',
      icon: 'Calendar',
      variant: 'outline',
      action: () => {
        console.log('Navigate to reschedule page');
        // In a real app, this would navigate to reschedule page
      }
    },
    {
      id: 'cancel',
      title: 'Cancel Booking',
      description: 'Cancel and request refund',
      icon: 'X',
      variant: 'outline',
      action: () => {
        console.log('Navigate to cancellation page');
        // In a real app, this would navigate to cancellation page
      }
    },
    {
      id: 'book-another',
      title: 'Book Another Exam',
      description: 'Schedule additional IELTS exam',
      icon: 'Plus',
      variant: 'default',
      action: () => {
        navigate('/exam-booking');
      }
    },
    {
      id: 'practice',
      title: 'Practice Tests',
      description: 'Access preparation materials',
      icon: 'BookOpen',
      variant: 'outline',
      action: () => {
        console.log('Navigate to practice tests');
        // In a real app, this would navigate to practice materials
      }
    }
  ];

  const supportOptions = [
    {
      id: 'live-chat',
      title: 'Live Chat',
      description: 'Chat with support agent',
      icon: 'MessageCircle',
      action: () => console.log('Open live chat')
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'support@ielts-booking.com',
      icon: 'Mail',
      action: () => window.location.href = 'mailto:support@ielts-booking.com'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      icon: 'Phone',
      action: () => window.location.href = 'tel:+15551234567'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg shadow-subtle">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Settings" size={20} className="mr-2 text-primary" />
            Manage Your Booking
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {actionItems.map((item) => (
              <Button
                key={item.id}
                variant={item.variant}
                onClick={item.action}
                className="h-auto p-4 justify-start"
              >
                <div className="flex items-center w-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3 flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-text-primary">
                      {item.title}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      {item.description}
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-text-secondary ml-2" />
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start">
              <Icon name="AlertTriangle" size={18} className="mr-3 mt-0.5 text-warning flex-shrink-0" />
              <div>
                <h4 className="font-medium text-warning mb-1">Important Policy Information</h4>
                <p className="text-sm text-text-secondary">
                  Rescheduling is allowed up to 5 days before the exam date. 
                  Cancellations made within 48 hours are subject to processing fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="bg-card border border-border rounded-lg shadow-subtle">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
            Need Help?
          </h3>

          <p className="text-text-secondary text-sm mb-4">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>

          <div className="space-y-3">
            {supportOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className="w-full flex items-center p-3 rounded-lg border border-border hover:bg-muted transition-smooth text-left"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3">
                  <Icon name={option.icon} size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">
                    {option.title}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {option.description}
                  </div>
                </div>
                <Icon name="ExternalLink" size={16} className="text-text-secondary" />
              </button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start">
              <Icon name="Clock" size={16} className="mr-2 mt-0.5 text-primary" />
              <div className="text-sm">
                <span className="font-medium text-primary">Support Hours:</span>
                <span className="text-text-secondary ml-2">24/7 Live Chat • Mon-Fri 9AM-6PM Phone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBookingActions;