import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AdminDashboard from "pages/admin-dashboard";
import BookingConfirmation from "pages/booking-confirmation";
import HomePage from "pages/home-page";
import PaymentProcessing from "pages/payment-processing";
import ExamBooking from "pages/exam-booking";
import ExamSchedulingManagement from "pages/exam-scheduling-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="/exam-booking" element={<ExamBooking />} />
        <Route path="/exam-scheduling-management" element={<ExamSchedulingManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;