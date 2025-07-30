import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Button from '../../../components/ui/Button';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ExamCalendar = ({ examSlots, onSlotSelect, onSlotMove, selectedSlot, filters }) => {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const getEventColor = (event) => {
    const colors = {
      oral: '#3B82F6', // blue
      written: '#10B981', // emerald
      both: '#8B5CF6' // violet
    };
    return colors[event.examType] || '#6B7280';
  };

  const getEventStatus = (event) => {
    const percentage = (event.currentBookings / event.capacity) * 100;
    if (percentage >= 100) return 'full';
    if (percentage >= 80) return 'nearly-full';
    return 'available';
  };

  const filteredSlots = examSlots.filter(slot => {
    if (filters.examType && slot.examType !== filters.examType) return false;
    if (filters.examLevel && slot.examLevel !== filters.examLevel) return false;
    if (filters.status && getEventStatus(slot) !== filters.status) return false;
    if (filters.highCapacity && slot.capacity < 30) return false;
    if (!filters.weekends) {
      const dayOfWeek = moment(slot.start).day();
      if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    }
    return true;
  });

  const calendarEvents = filteredSlots.map(slot => ({
    ...slot,
    title: `${slot.examLevel} ${slot.examType.charAt(0).toUpperCase() + slot.examType.slice(1)} (${slot.currentBookings}/${slot.capacity})`,
    start: new Date(slot.start),
    end: new Date(slot.end),
    resource: slot
  }));

  const handleSelectEvent = useCallback((event) => {
    onSlotSelect(event.resource);
  }, [onSlotSelect]);

  const handleEventDrop = useCallback(({ event, start, end }) => {
    const updatedSlot = {
      ...event.resource,
      start: start.toISOString(),
      end: end.toISOString()
    };
    onSlotMove(updatedSlot);
  }, [onSlotMove]);

  const eventStyleGetter = (event) => {
    const status = getEventStatus(event.resource);
    const baseColor = getEventColor(event.resource);
    
    let backgroundColor = baseColor;
    let opacity = 0.8;
    
    if (status === 'full') {
      backgroundColor = '#EF4444';
      opacity = 0.9;
    } else if (status === 'nearly-full') {
      backgroundColor = '#F59E0B';
      opacity = 0.85;
    }

    return {
      style: {
        backgroundColor,
        opacity,
        border: selectedSlot?.id === event.resource.id ? '2px solid #1E293B' : 'none',
        borderRadius: '4px',
        color: 'white',
        fontSize: '12px',
        fontWeight: '500'
      }
    };
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <div className="flex items-center justify-between mb-4 p-4 bg-surface border border-border rounded-lg">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('PREV')}
          iconName="ChevronLeft"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('NEXT')}
          iconName="ChevronRight"
        />
      </div>

      <h2 className="text-lg font-semibold text-text-primary">{label}</h2>

      <div className="flex items-center space-x-1">
        {['month', 'week', 'day'].map((viewType) => (
          <Button
            key={viewType}
            variant={view === viewType ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setView(viewType);
              onView(viewType);
            }}
          >
            {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-surface">
      <CustomToolbar
        label={moment(date).format('MMMM YYYY')}
        onNavigate={(action) => {
          let newDate = moment(date);
          if (action === 'PREV') {
            newDate = view === 'month' ? newDate.subtract(1, 'month') : 
                     view === 'week' ? newDate.subtract(1, 'week') : 
                     newDate.subtract(1, 'day');
          } else if (action === 'NEXT') {
            newDate = view === 'month' ? newDate.add(1, 'month') : 
                     view === 'week' ? newDate.add(1, 'week') : 
                     newDate.add(1, 'day');
          } else if (action === 'TODAY') {
            newDate = moment();
          }
          setDate(newDate.toDate());
        }}
        onView={setView}
      />

      <div className="h-[calc(100%-80px)] p-4">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleEventDrop}
          eventPropGetter={eventStyleGetter}
          resizable
          selectable
          popup
          showMultiDayTimes
          step={30}
          timeslots={2}
          min={new Date(2025, 0, 1, 8, 0)}
          max={new Date(2025, 0, 1, 20, 0)}
          formats={{
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }) => 
              `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
          }}
          components={{
            toolbar: () => null // We use custom toolbar
          }}
          className="bg-surface border border-border rounded-lg"
        />
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-text-primary">Legend:</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-text-secondary">Oral</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span className="text-xs text-text-secondary">Written</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-violet-500 rounded"></div>
              <span className="text-xs text-text-secondary">Both</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-text-secondary">Full</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span className="text-xs text-text-secondary">Nearly Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;