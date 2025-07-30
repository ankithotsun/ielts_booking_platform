import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BookingProgressIndicator from '../../components/ui/BookingProgressIndicator';
import NotificationStatusBar from '../../components/ui/NotificationStatusBar';
import AdminQuickActionsPanel from '../../components/ui/AdminQuickActionsPanel';
import AuthContextSwitcher from '../../components/ui/AuthContextSwitcher';
import SchedulingToolsSidebar from './components/SchedulingToolsSidebar';
import ExamCalendar from './components/ExamCalendar';
import SlotDetailsPanel from './components/SlotDetailsPanel';
import HolidayBlackoutManager from './components/HolidayBlackoutManager';
import MobileScheduleView from './components/MobileScheduleView';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExamSchedulingManagement = () => {
  const [examSlots, setExamSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filters, setFilters] = useState({
    examType: '',
    examLevel: '',
    status: '',
    highCapacity: false,
    weekends: true
  });
  const [showHolidayManager, setShowHolidayManager] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('admin');

  // Mock exam slots data
  useEffect(() => {
    const mockSlots = [
      {
        id: 1,
        examType: 'oral',
        examLevel: 'B2',
        start: '2025-01-28T09:00:00Z',
        end: '2025-01-28T10:30:00Z',
        capacity: 20,
        currentBookings: 15,
        location: 'Room A - Main Hall',
        status: 'available'
      },
      {
        id: 2,
        examType: 'written',
        examLevel: 'C1',
        start: '2025-01-28T11:00:00Z',
        end: '2025-01-28T13:00:00Z',
        capacity: 30,
        currentBookings: 28,
        location: 'Room B - Conference',
        status: 'nearly-full'
      },
      {
        id: 3,
        examType: 'both',
        examLevel: 'A2',
        start: '2025-01-28T14:00:00Z',
        end: '2025-01-28T17:00:00Z',
        capacity: 25,
        currentBookings: 25,
        location: 'Room C - Testing Lab',
        status: 'full'
      },
      {
        id: 4,
        examType: 'oral',
        examLevel: 'B1',
        start: '2025-01-29T09:30:00Z',
        end: '2025-01-29T11:00:00Z',
        capacity: 15,
        currentBookings: 8,
        location: 'Room D - Audio Suite',
        status: 'available'
      },
      {
        id: 5,
        examType: 'written',
        examLevel: 'C2',
        start: '2025-01-29T13:00:00Z',
        end: '2025-01-29T15:30:00Z',
        capacity: 20,
        currentBookings: 12,
        location: 'Room A - Main Hall',
        status: 'available'
      },
      {
        id: 6,
        examType: 'both',
        examLevel: 'D1',
        start: '2025-01-30T10:00:00Z',
        end: '2025-01-30T14:00:00Z',
        capacity: 35,
        currentBookings: 22,
        location: 'Room B - Conference',
        status: 'available'
      },
      {
        id: 7,
        examType: 'oral',
        examLevel: 'A1',
        start: '2025-01-31T15:00:00Z',
        end: '2025-01-31T16:30:00Z',
        capacity: 18,
        currentBookings: 16,
        location: 'Room C - Testing Lab',
        status: 'nearly-full'
      },
      {
        id: 8,
        examType: 'written',
        examLevel: 'D2',
        start: '2025-02-01T08:00:00Z',
        end: '2025-02-01T11:00:00Z',
        capacity: 40,
        currentBookings: 35,
        location: 'Room A - Main Hall',
        status: 'nearly-full'
      }
    ];
    setExamSlots(mockSlots);
  }, []);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCreateSlot = (newSlot) => {
    setExamSlots(prev => [...prev, newSlot]);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSlotMove = (updatedSlot) => {
    setExamSlots(prev => 
      prev.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot)
    );
    setSelectedSlot(updatedSlot);
  };

  const handleSlotUpdate = (updatedSlot) => {
    setExamSlots(prev => 
      prev.map(slot => slot.id === updatedSlot.id ? updatedSlot : slot)
    );
    setSelectedSlot(updatedSlot);
  };

  const handleSlotDelete = (slotId) => {
    setExamSlots(prev => prev.filter(slot => slot.id !== slotId));
    if (selectedSlot?.id === slotId) {
      setSelectedSlot(null);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddBlackout = (blackout) => {
    console.log('Adding blackout period:', blackout);
    // In a real app, this would update the blackout periods and affect calendar display
  };

  const handleRoleSwitch = (roleId) => {
    setCurrentUserRole(roleId);
    // In a real app, this would redirect to appropriate dashboard
    console.log('Switching to role:', roleId);
  };

  return (
    <>
      <Helmet>
        <title>Exam Scheduling Management - IELTS Booking Platform</title>
        <meta name="description" content="Comprehensive exam scheduling management system for IELTS administrators. Create, modify, and oversee exam time slots across all levels and types." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <BookingProgressIndicator />
        <NotificationStatusBar />
        
        {/* Main Content */}
        <div className="pt-16">
          {/* Admin Header */}
          <div className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Icon name="Calendar" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-text-primary">Exam Scheduling Management</h1>
                    <p className="text-sm text-text-secondary">Create, modify, and oversee exam time slots across all IELTS levels</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <AuthContextSwitcher 
                    currentUserRole={currentUserRole} 
                    onRoleSwitch={handleRoleSwitch} 
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowHolidayManager(true)}
                    iconName="Ban"
                    iconPosition="left"
                  >
                    Manage Blackouts
                  </Button>
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Quick Add Slot
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          {!isMobile ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-12 gap-6 p-6 min-h-[calc(100vh-200px)]">
                {/* Left Sidebar - Scheduling Tools */}
                <div className="col-span-3">
                  <SchedulingToolsSidebar
                    onCreateSlot={handleCreateSlot}
                    onFilterChange={handleFilterChange}
                    filters={filters}
                  />
                </div>

                {/* Main Calendar Area */}
                <div className="col-span-7">
                  <ExamCalendar
                    examSlots={examSlots}
                    onSlotSelect={handleSlotSelect}
                    onSlotMove={handleSlotMove}
                    selectedSlot={selectedSlot}
                    filters={filters}
                  />
                </div>

                {/* Right Panel - Slot Details */}
                <div className="col-span-2">
                  <SlotDetailsPanel
                    selectedSlot={selectedSlot}
                    onSlotUpdate={handleSlotUpdate}
                    onSlotDelete={handleSlotDelete}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Layout */
            <div className="h-[calc(100vh-64px)]">
              <MobileScheduleView
                examSlots={examSlots}
                onSlotSelect={handleSlotSelect}
                selectedSlot={selectedSlot}
                filters={filters}
              />
            </div>
          )}
        </div>

        {/* Holiday & Blackout Manager Modal */}
        <HolidayBlackoutManager
          isOpen={showHolidayManager}
          onClose={() => setShowHolidayManager(false)}
          onAddBlackout={handleAddBlackout}
        />

        {/* Admin Quick Actions Panel */}
        <AdminQuickActionsPanel />
      </div>
    </>
  );
};

export default ExamSchedulingManagement;