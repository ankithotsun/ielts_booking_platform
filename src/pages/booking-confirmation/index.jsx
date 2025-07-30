import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import NotificationStatusBar from '../../components/ui/NotificationStatusBar';
import AdminQuickActionsPanel from '../../components/ui/AdminQuickActionsPanel';
import BookingSuccessHeader from './components/BookingSuccessHeader';
import BookingSummaryCard from './components/BookingSummaryCard';
import QRCodeCard from './components/QRCodeCard';
import PreparationGuide from './components/PreparationGuide';
import CalendarIntegration from './components/CalendarIntegration';
import EmailConfirmationStatus from './components/EmailConfirmationStatus';
import PostBookingActions from './components/PostBookingActions';
import ReminderSettings from './components/ReminderSettings';

const BookingConfirmation = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock booking data - in real app, this would come from API or route state
  const mockBookingData = {
    reference: "IELTS-2025-BK-789123",
    examType: "Academic",
    level: "B2",
    date: "2025-03-15",
    time: "09:00",
    location: "IELTS Test Center - Downtown Campus, 123 Education Street, New York, NY 10001",
    fee: "245.00",
    transactionId: "TXN-20250126-456789",
    userEmail: "john.doe@email.com",
    userPhone: "+1 (555) 123-4567",
    paymentMethod: "Credit Card (**** 4567)",
    bookingDate: "2025-01-26",
    examDuration: "3 hours",
    centerContact: "+1 (555) 987-6543"
  };

  useEffect(() => {
    // Simulate loading booking data
    const timer = setTimeout(() => {
      setBookingData(mockBookingData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BookingProgressIndicator />
        <NotificationStatusBar />
        
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading your booking confirmation...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingProgressIndicator />
      <NotificationStatusBar />
      <AdminQuickActionsPanel />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Success Header */}
          <BookingSuccessHeader 
            bookingReference={bookingData.reference}
            examType={bookingData.examType}
            examLevel={bookingData.level}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <BookingSummaryCard bookingDetails={bookingData} />
              <PreparationGuide examType={bookingData.examType} />
              <CalendarIntegration bookingDetails={bookingData} />
            </div>

            {/* Right Column - Quick Access & Status */}
            <div className="space-y-6">
              <QRCodeCard 
                bookingReference={bookingData.reference}
                bookingDetails={bookingData}
              />
              <EmailConfirmationStatus 
                userEmail={bookingData.userEmail}
                bookingReference={bookingData.reference}
              />
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="space-y-6">
            <ReminderSettings 
              examDate={bookingData.date}
              userEmail={bookingData.userEmail}
              userPhone={bookingData.userPhone}
            />
            <PostBookingActions 
              bookingReference={bookingData.reference}
              examType={bookingData.examType}
            />
          </div>

          {/* Footer Information */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center text-text-secondary">
              <p className="text-sm mb-2">
                Thank you for choosing our IELTS booking platform. 
                We wish you the best of luck with your examination!
              </p>
              <p className="text-xs">
                Booking confirmed on {new Date(bookingData.bookingDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} • Reference: {bookingData.reference}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;