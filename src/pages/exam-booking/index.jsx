import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import NotificationStatusBar from '../../components/ui/NotificationStatusBar';
import AdminQuickActionsPanel from '../../components/ui/AdminQuickActionsPanel';
import ExamLevelSelector from './components/ExamLevelSelector';
import BookingOptionsSelector from './components/BookingOptionsSelector';
import PrerequisiteUpload from './components/PrerequisiteUpload';
import CalendarInterface from './components/CalendarInterface';
import TimeSlotSelector from './components/TimeSlotSelector';
import BookingSummary from './components/BookingSummary';

const ExamBooking = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [prerequisiteUploaded, setPrerequisiteUploaded] = useState(false);
  const [bookingHold, setBookingHold] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Update current step based on selections
  useEffect(() => {
    if (!selectedLevel) {
      setCurrentStep(1);
    } else if (!selectedOption) {
      setCurrentStep(2);
    } else if (selectedOption !== 'both' && !prerequisiteUploaded) {
      setCurrentStep(3);
    } else if (!selectedDate) {
      setCurrentStep(4);
    } else if (!selectedTime) {
      setCurrentStep(5);
    } else {
      setCurrentStep(6);
    }
  }, [selectedLevel, selectedOption, prerequisiteUploaded, selectedDate, selectedTime]);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    // Reset subsequent selections when level changes
    setSelectedOption('');
    setSelectedDate(null);
    setSelectedTime('');
    setPrerequisiteUploaded(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Reset subsequent selections when option changes
    setSelectedDate(null);
    setSelectedTime('');
    if (option === 'both') {
      setPrerequisiteUploaded(true); // No prerequisites needed for both
    } else {
      setPrerequisiteUploaded(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleUploadComplete = (uploaded) => {
    setPrerequisiteUploaded(uploaded);
  };

  const handleBookingHold = (hold) => {
    setBookingHold(hold);
  };

  return (
    <>
      <Helmet>
        <title>Book Your IELTS Exam - IELTS Booking Platform</title>
        <meta name="description" content="Book your IELTS examination online. Choose from A1-D2 levels, select oral or written tests, and secure your preferred time slot with instant confirmation." />
        <meta name="keywords" content="IELTS booking, exam registration, English proficiency test, online booking, exam scheduling" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <BookingProgressIndicator />
        <NotificationStatusBar />
        <AdminQuickActionsPanel />

        <main className="pt-32 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                Book Your IELTS Examination
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Select your proficiency level, choose your exam format, and secure your preferred time slot. 
                Our streamlined booking process ensures you can focus on what matters most - your success.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Booking Flow */}
              <div className="lg:col-span-2 space-y-12">
                {/* Step 1: Exam Level Selection */}
                <div className={`transition-all duration-500 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                  <ExamLevelSelector
                    selectedLevel={selectedLevel}
                    onLevelSelect={handleLevelSelect}
                  />
                </div>

                {/* Step 2: Booking Options */}
                {selectedLevel && (
                  <div className={`transition-all duration-500 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <BookingOptionsSelector
                      selectedOption={selectedOption}
                      onOptionSelect={handleOptionSelect}
                      selectedLevel={selectedLevel}
                    />
                  </div>
                )}

                {/* Step 3: Prerequisites Upload */}
                {selectedOption && selectedOption !== 'both' && (
                  <div className={`transition-all duration-500 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <PrerequisiteUpload
                      selectedOption={selectedOption}
                      selectedLevel={selectedLevel}
                      onUploadComplete={handleUploadComplete}
                    />
                  </div>
                )}

                {/* Step 4: Calendar Interface */}
                {selectedOption && (selectedOption === 'both' || prerequisiteUploaded) && (
                  <div className={`transition-all duration-500 ${currentStep >= 4 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <CalendarInterface
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                      selectedLevel={selectedLevel}
                      selectedOption={selectedOption}
                    />
                  </div>
                )}

                {/* Step 5: Time Slot Selection */}
                {selectedDate && (
                  <div className={`transition-all duration-500 ${currentStep >= 5 ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <TimeSlotSelector
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onTimeSelect={handleTimeSelect}
                      selectedOption={selectedOption}
                    />
                  </div>
                )}
              </div>

              {/* Booking Summary Sidebar */}
              <div className="lg:col-span-1">
                <BookingSummary
                  selectedLevel={selectedLevel}
                  selectedOption={selectedOption}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  prerequisiteUploaded={prerequisiteUploaded}
                  onBookingHold={handleBookingHold}
                />
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-16 bg-muted rounded-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary mb-2">Need Help?</h2>
                <p className="text-text-secondary">
                  Our support team is here to assist you with your booking
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">Phone Support</h3>
                  <p className="text-sm text-text-secondary">+1 (555) 123-4567</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">Email Support</h3>
                  <p className="text-sm text-text-secondary">support@ielts-booking.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">Live Chat</h3>
                  <p className="text-sm text-text-secondary">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ExamBooking;