import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingSummaryCard = ({ bookingData, currency = 'USD' }) => {
  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    return formatter.format(amount);
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
    return new Date(`2025-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Booking Summary</h3>
          <p className="text-sm text-text-secondary">Review your exam details</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Exam Details */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="GraduationCap" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Exam Information</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Exam Level</span>
              <span className="text-sm font-medium text-text-primary">{bookingData.examLevel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Exam Type</span>
              <span className="text-sm font-medium text-text-primary">{bookingData.examType}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Test Center</span>
              <span className="text-sm font-medium text-text-primary">{bookingData.testCenter}</span>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Schedule</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Date</span>
              <span className="text-sm font-medium text-text-primary">{formatDate(bookingData.examDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Time</span>
              <span className="text-sm font-medium text-text-primary">{formatTime(bookingData.examTime)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Duration</span>
              <span className="text-sm font-medium text-text-primary">{bookingData.duration}</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-text-primary mb-3">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Exam Fee</span>
              <span className="text-sm text-text-primary">{formatCurrency(bookingData.examFee)}</span>
            </div>
            {bookingData.additionalServices?.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">{service.name}</span>
                <span className="text-sm text-text-primary">{formatCurrency(service.price)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Processing Fee</span>
              <span className="text-sm text-text-primary">{formatCurrency(bookingData.processingFee)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Tax</span>
              <span className="text-sm text-text-primary">{formatCurrency(bookingData.tax)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-text-primary">Total Amount</span>
                <span className="text-lg font-bold text-primary">{formatCurrency(bookingData.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Reference */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={16} className="text-primary" />
            <div>
              <span className="text-xs text-text-secondary">Booking Reference</span>
              <p className="text-sm font-mono font-medium text-primary">{bookingData.bookingReference}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;