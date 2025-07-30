import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarInterface = ({ selectedDate, onDateSelect, selectedLevel, selectedOption }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  // Mock availability data
  const availabilityData = {
    '2025-01-27': { available: true, slots: 8 },
    '2025-01-28': { available: true, slots: 12 },
    '2025-01-29': { available: true, slots: 6 },
    '2025-01-30': { available: true, slots: 15 },
    '2025-01-31': { available: true, slots: 9 },
    '2025-02-01': { available: false, slots: 0 },
    '2025-02-02': { available: false, slots: 0 },
    '2025-02-03': { available: true, slots: 18 },
    '2025-02-04': { available: true, slots: 14 },
    '2025-02-05': { available: true, slots: 7 },
    '2025-02-06': { available: true, slots: 11 },
    '2025-02-07': { available: true, slots: 16 },
    '2025-02-08': { available: false, slots: 0 },
    '2025-02-09': { available: false, slots: 0 },
    '2025-02-10': { available: true, slots: 13 },
    '2025-02-11': { available: true, slots: 8 },
    '2025-02-12': { available: true, slots: 19 },
    '2025-02-13': { available: true, slots: 5 },
    '2025-02-14': { available: false, slots: 0 },
    '2025-02-15': { available: true, slots: 12 },
    '2025-02-16': { available: false, slots: 0 },
    '2025-02-17': { available: true, slots: 17 },
    '2025-02-18': { available: true, slots: 10 },
    '2025-02-19': { available: true, slots: 14 },
    '2025-02-20': { available: true, slots: 6 },
    '2025-02-21': { available: true, slots: 20 },
    '2025-02-22': { available: false, slots: 0 },
    '2025-02-23': { available: false, slots: 0 },
    '2025-02-24': { available: true, slots: 9 },
    '2025-02-25': { available: true, slots: 15 },
    '2025-02-26': { available: true, slots: 11 },
    '2025-02-27': { available: true, slots: 13 },
    '2025-02-28': { available: true, slots: 8 }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getDateAvailability = (date) => {
    const dateKey = formatDateKey(date);
    return availabilityData[dateKey] || { available: false, slots: 0 };
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (date) => {
    if (isPastDate(date)) return;
    
    const availability = getDateAvailability(date);
    if (!availability.available) return;
    
    onDateSelect(date);
  };

  const getDateClasses = (date) => {
    if (isPastDate(date)) {
      return 'text-text-secondary cursor-not-allowed opacity-50';
    }
    
    const availability = getDateAvailability(date);
    
    if (isSelected(date)) {
      return 'bg-primary text-primary-foreground font-semibold';
    }
    
    if (!availability.available) {
      return 'text-text-secondary cursor-not-allowed opacity-60';
    }
    
    if (isToday(date)) {
      return 'bg-accent/10 text-accent font-semibold border-2 border-accent hover:bg-accent/20';
    }
    
    return 'text-text-primary hover:bg-primary/10 hover:text-primary cursor-pointer';
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Select Exam Date</h3>
          <p className="text-text-secondary">
            Choose an available date for your {selectedLevel} {selectedOption} examination
          </p>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
          >
            Week
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-subtle">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          <h4 className="text-lg font-semibold text-text-primary">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h4>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <div key={index} className="aspect-square">
                {date && (
                  <div
                    onClick={() => handleDateClick(date)}
                    className={`w-full h-full flex flex-col items-center justify-center rounded-lg transition-all duration-200 ${getDateClasses(date)}`}
                  >
                    <span className="text-sm font-medium">{date.getDate()}</span>
                    {!isPastDate(date) && getDateAvailability(date).available && (
                      <span className="text-xs opacity-75">
                        {getDateAvailability(date).slots} slots
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-text-secondary">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-accent/10 border-2 border-accent rounded"></div>
          <span className="text-text-secondary">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success/10 rounded"></div>
          <span className="text-text-secondary">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-text-secondary">Unavailable</span>
        </div>
      </div>

      {selectedDate && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">
                Selected Date: {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-text-secondary">
                {getDateAvailability(selectedDate).slots} time slots available
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarInterface;