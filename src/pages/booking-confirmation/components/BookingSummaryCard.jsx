import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingSummaryCard = ({ bookingDetails }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleDownloadReceipt = () => {
    // Mock download functionality
    console.log('Downloading receipt...');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2025-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-primary" />
            Booking Summary
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Exam Type:</span>
                  <span className="font-medium text-text-primary">{bookingDetails.examType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Level:</span>
                  <span className="font-medium text-text-primary">{bookingDetails.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date:</span>
                  <span className="font-medium text-text-primary">{formatDate(bookingDetails.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Time:</span>
                  <span className="font-medium text-text-primary">{formatTime(bookingDetails.time)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Location:</span>
                  <span className="font-medium text-text-primary">{bookingDetails.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Fee:</span>
                  <span className="font-medium text-text-primary">${bookingDetails.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Payment Status:</span>
                  <span className="flex items-center text-success font-medium">
                    <Icon name="CheckCircle" size={16} className="mr-1" />
                    Paid
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Transaction ID:</span>
                  <span className="font-medium text-text-primary font-mono text-sm">{bookingDetails.transactionId}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <Button
                variant="outline"
                onClick={handleDownloadReceipt}
                iconName="Download"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Download Receipt
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummaryCard;