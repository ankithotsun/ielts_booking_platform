import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingSuccessHeader = ({ bookingReference, examType, examLevel }) => {
  return (
    <div className="bg-gradient-to-r from-success to-success/80 text-success-foreground rounded-lg p-6 mb-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-success-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-success-foreground" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Booking Confirmed!
        </h1>
        
        <p className="text-success-foreground/90 mb-4">
          Your IELTS {examType} exam has been successfully booked
        </p>
        
        <div className="bg-success-foreground/10 rounded-lg p-4 inline-block">
          <div className="text-sm font-medium text-success-foreground/80 mb-1">
            Booking Reference
          </div>
          <div className="text-xl font-bold tracking-wider">
            {bookingReference}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessHeader;