import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeSlotSelector = ({ selectedDate, selectedTime, onTimeSelect, selectedOption }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  if (!selectedDate) {
    return null;
  }

  // Mock time slots data based on exam type
  const generateTimeSlots = () => {
    const baseSlots = [
      { time: '08:00', period: 'morning', available: true, capacity: 12, booked: 8 },
      { time: '08:30', period: 'morning', available: true, capacity: 12, booked: 5 },
      { time: '09:00', period: 'morning', available: true, capacity: 12, booked: 12 },
      { time: '09:30', period: 'morning', available: true, capacity: 12, booked: 3 },
      { time: '10:00', period: 'morning', available: true, capacity: 12, booked: 7 },
      { time: '10:30', period: 'morning', available: true, capacity: 12, booked: 9 },
      { time: '11:00', period: 'morning', available: true, capacity: 12, booked: 6 },
      { time: '11:30', period: 'morning', available: true, capacity: 12, booked: 11 },
      { time: '14:00', period: 'afternoon', available: true, capacity: 15, booked: 8 },
      { time: '14:30', period: 'afternoon', available: true, capacity: 15, booked: 12 },
      { time: '15:00', period: 'afternoon', available: true, capacity: 15, booked: 4 },
      { time: '15:30', period: 'afternoon', available: true, capacity: 15, booked: 15 },
      { time: '16:00', period: 'afternoon', available: true, capacity: 15, booked: 7 },
      { time: '16:30', period: 'afternoon', available: true, capacity: 15, booked: 10 },
      { time: '17:00', period: 'afternoon', available: true, capacity: 15, booked: 13 },
      { time: '17:30', period: 'afternoon', available: true, capacity: 15, booked: 6 }
    ];

    // Filter slots based on exam type
    if (selectedOption === 'oral') {
      // Oral exams have more frequent slots
      return baseSlots.map(slot => ({
        ...slot,
        duration: '20 min',
        type: 'oral'
      }));
    } else {
      // Written and both exams need longer slots
      return baseSlots.filter((_, index) => index % 2 === 0).map(slot => ({
        ...slot,
        duration: selectedOption === 'written' ? '2h 45min' : '3h',
        type: selectedOption
      }));
    }
  };

  const timeSlots = generateTimeSlots();
  
  const filteredSlots = selectedPeriod === 'all' 
    ? timeSlots 
    : timeSlots.filter(slot => slot.period === selectedPeriod);

  const getAvailabilityStatus = (slot) => {
    const remaining = slot.capacity - slot.booked;
    if (remaining === 0) return { status: 'full', color: 'text-error', bg: 'bg-error/10 border-error/20' };
    if (remaining <= 2) return { status: 'limited', color: 'text-warning', bg: 'bg-warning/10 border-warning/20' };
    return { status: 'available', color: 'text-success', bg: 'bg-success/10 border-success/20' };
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const periods = [
    { id: 'all', label: 'All Day', icon: 'Clock' },
    { id: 'morning', label: 'Morning', icon: 'Sunrise' },
    { id: 'afternoon', label: 'Afternoon', icon: 'Sun' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Select Time Slot</h3>
          <p className="text-text-secondary">
            Available times for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-text-secondary">Exam Duration</p>
          <p className="font-semibold text-text-primary">
            {selectedOption === 'oral' ? '20 minutes' : 
             selectedOption === 'written' ? '2h 45min' : '3 hours'}
          </p>
        </div>
      </div>

      {/* Period Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {periods.map((period) => (
          <Button
            key={period.id}
            variant={selectedPeriod === period.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod(period.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <Icon name={period.icon} size={14} />
            <span>{period.label}</span>
          </Button>
        ))}
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSlots.map((slot) => {
          const availability = getAvailabilityStatus(slot);
          const isSelected = selectedTime === slot.time;
          const isAvailable = slot.capacity > slot.booked;
          
          return (
            <div
              key={slot.time}
              onClick={() => isAvailable && onTimeSelect(slot.time)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-moderate'
                  : isAvailable
                  ? `${availability.bg} border-border hover:border-primary/50 cursor-pointer hover:shadow-subtle`
                  : 'border-border bg-gray-50 cursor-not-allowed opacity-60'
              }`}
            >
              {isSelected && (
                <div className="flex justify-end mb-2">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-lg font-bold ${
                      isSelected ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {formatTime(slot.time)}
                    </p>
                    <p className="text-sm text-text-secondary capitalize">
                      {slot.period}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">Duration</p>
                    <p className="text-sm font-medium text-text-primary">
                      {slot.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={availability.status === 'full' ? 'XCircle' : 
                            availability.status === 'limited' ? 'AlertCircle' : 'CheckCircle'} 
                      size={14} 
                      className={availability.color} 
                    />
                    <span className={`text-xs font-medium ${availability.color}`}>
                      {availability.status === 'full' ? 'Full' :
                       availability.status === 'limited' ? 'Limited' : 'Available'}
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    {slot.capacity - slot.booked} of {slot.capacity} left
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      availability.status === 'full' ? 'bg-error' :
                      availability.status === 'limited' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(slot.booked / slot.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSlots.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="Clock" size={24} className="text-text-secondary" />
          </div>
          <h4 className="text-lg font-medium text-text-primary mb-2">No slots available</h4>
          <p className="text-text-secondary">
            No time slots are available for the selected period. Try selecting a different time period or date.
          </p>
        </div>
      )}

      {selectedTime && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-text-primary">
                Selected Time: {formatTime(selectedTime)}
              </p>
              <p className="text-sm text-text-secondary">
                {selectedDate.toLocaleDateString()} • Duration: {
                  selectedOption === 'oral' ? '20 minutes' : 
                  selectedOption === 'written' ? '2h 45min' : '3 hours'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;