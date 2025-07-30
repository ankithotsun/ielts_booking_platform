import React from 'react';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import NotificationStatusBar from '../../components/ui/NotificationStatusBar';
import HeroSection from './components/HeroSection';
import ExamLevelsGrid from './components/ExamLevelsGrid';
import BookingOptionsSection from './components/BookingOptionsSection';
import TrustSignalsSection from './components/TrustSignalsSection';
import FAQPreviewSection from './components/FAQPreviewSection';
import FooterSection from './components/FooterSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookingProgressIndicator />
      <NotificationStatusBar />
      
      <main className="pt-16">
        <HeroSection />
        <ExamLevelsGrid />
        <BookingOptionsSection />
        <TrustSignalsSection />
        <FAQPreviewSection />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default HomePage;