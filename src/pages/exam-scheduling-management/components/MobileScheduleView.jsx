import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileScheduleView = ({ examSlots, onSlotSelect, selectedSlot, filters }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day' or 'list'

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDateSlots = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return examSlots.filter(slot => {
      const slotDate = new Date(slot.start).toISOString().split('T')[0];
      return slotDate === dateStr;
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const getSlotStatusColor = (slot) => {
    const percentage = (slot.currentBookings / slot.capacity) * 100;
    if (percentage >= 100) return 'bg-error/10 border-error text-error';
    if (percentage >= 80) return 'bg-warning/10 border-warning text-warning';
    return 'bg-success/10 border-success text-success';
  };

  const getExamTypeColor = (type) => {
    switch (type) {
      case 'oral': return 'bg-blue-500';
      case 'written': return 'bg-emerald-500';
      case 'both': return 'bg-violet-500';
      default: return 'bg-gray-500';
    }
  };

  const todaySlots = getDateSlots(currentDate);
  const filteredTodaySlots = todaySlots.filter(slot => {
    if (filters.examType && slot.examType !== filters.examType) return false;
    if (filters.examLevel && slot.examLevel !== filters.examLevel) return false;
    return true;
  });

  const upcomingSlots = examSlots
    .filter(slot => new Date(slot.start) > new Date())
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 10);

  return (
    <div className="h-full bg-surface">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-text-primary">Schedule Management</h2>
          <div className="flex items-center space-x-1">
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>

        {viewMode === 'day' && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate(-1)}
              iconName="ChevronLeft"
            />
            <div className="text-center">
              <div className="text-sm font-medium text-text-primary">
                {formatDate(currentDate)}
              </div>
              <div className="text-xs text-text-secondary">
                {filteredTodaySlots.length} slots scheduled
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate(1)}
              iconName="ChevronRight"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
        {viewMode === 'day' ? (
          <div className="space-y-3">
            {filteredTodaySlots.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Slots Scheduled</h3>
                <p className="text-sm text-text-secondary mb-4">No exam slots found for this date</p>
                <Button variant="default" iconName="Plus">
                  Add New Slot
                </Button>
              </div>
            ) : (
              filteredTodaySlots
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => onSlotSelect(slot)}
                    className={`p-4 bg-card border rounded-lg transition-smooth cursor-pointer ${
                      selectedSlot?.id === slot.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getExamTypeColor(slot.examType)}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-semibold text-text-primary">
                              {slot.examLevel} {slot.examType.charAt(0).toUpperCase() + slot.examType.slice(1)}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getSlotStatusColor(slot)}`}>
                              {slot.currentBookings}/{slot.capacity}
                            </span>
                          </div>
                          <div className="text-xs text-text-secondary mb-2">
                            {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {slot.location || 'Room A'} • {slot.capacity - slot.currentBookings} spots available
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" iconName="MoreVertical" />
                    </div>
                  </div>
                ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Upcoming Slots</h3>
              <span className="text-sm text-text-secondary">{upcomingSlots.length} slots</span>
            </div>
            
            <div className="space-y-3">
              {upcomingSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => onSlotSelect(slot)}
                  className={`p-4 bg-card border rounded-lg transition-smooth cursor-pointer ${
                    selectedSlot?.id === slot.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${getExamTypeColor(slot.examType)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-semibold text-text-primary">
                            {slot.examLevel} {slot.examType.charAt(0).toUpperCase() + slot.examType.slice(1)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getSlotStatusColor(slot)}`}>
                            {slot.currentBookings}/{slot.capacity}
                          </span>
                        </div>
                        <div className="text-xs text-text-secondary mb-1">
                          {new Date(slot.start).toLocaleDateString()} • 
                          {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {slot.location || 'Room A'} • {slot.capacity - slot.currentBookings} spots available
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="MoreVertical" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full shadow-moderate"
          iconName="Plus"
        />
      </div>
    </div>
  );
};

export default MobileScheduleView;